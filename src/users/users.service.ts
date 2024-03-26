import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersService: Repository<User>,
  ) {}

  async findOneWithUserName(username: string) {
    return await this.usersService.findOne({ where: { username } });
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findOneWithUserName(createUserDto.username);
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = { ...createUserDto, password: hashedPassword };
    const user = await this.usersService.create(newUser);
    const savedUser = await this.usersService.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = savedUser;
    return result;
  }
}
