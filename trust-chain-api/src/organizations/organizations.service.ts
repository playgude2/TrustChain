import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Organizations } from './entities/organizations.entity';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';
import { LoginOrganizationDto } from './dtos/login-organization.dto';
import { WalletsService } from 'src/wallets/wallets.service';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organizations)
    private organizationsRepository: Repository<Organizations>,
    private jwtService: JwtService,
    private readonly walletService: WalletsService,
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organizations> {
    const organization = this.organizationsRepository.create(
      createOrganizationDto,
    );
    organization.password = await bcrypt.hash(organization.password, 10);
    return this.organizationsRepository.save(organization);
  }

  findAll(): Promise<Organizations[]> {
    return this.organizationsRepository.find();
  }

  async findOne(id: number): Promise<Organizations> {
    const organization = await this.organizationsRepository.findOne({
      where: { id },
    });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }
    return organization;
  }

  async update(
    id: number,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organizations> {
    const organization = await this.organizationsRepository.preload({
      id: +id,
      ...updateOrganizationDto,
    });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }
    return this.organizationsRepository.save(organization);
  }

  async remove(id: number): Promise<void> {
    const result = await this.organizationsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Organization not found');
    }
  }

  async login(
    loginOrganizationDto: LoginOrganizationDto,
  ): Promise<{ accessToken: string; organization: any }> {
    const { email, password } = loginOrganizationDto;
    const organization = await this.organizationsRepository.findOne({
      where: { email },
    });
    console.log('organization:::', organization);
    if (
      !organization ||
      !(await bcrypt.compare(password, organization.password))
    ) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: organization.id, email: organization.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, organization };
  }

  async createWallet(organizationId: number): Promise<Organizations> {
    const organization = await this.organizationsRepository.findOne({
      where: { id: organizationId },
    });

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const { publicKey, privateKey, address } =
      this.walletService.createWallet();
    organization.walletPublicKey = publicKey;
    organization.walletPrivateKey = privateKey;
    organization.walletAdress = address;
    return this.organizationsRepository.save(organization);
  }
}
