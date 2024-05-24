import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class UsersService {
  private users = [];

  async register(createUserDto: CreateUserDto) {
    const user = { ...createUserDto, id: Date.now().toString() };
    this.users.push(user);
    return user;
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;
    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    );
    if (user) {
      return user;
    }
    return null;
  }
}
