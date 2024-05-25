import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organizations } from './entities/organizations.entity';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organizations)
    private organizationsRepository: Repository<Organizations>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto): Promise<Organizations> {
    const organization = this.organizationsRepository.create(
      createOrganizationDto,
    );
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
}
