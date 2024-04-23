import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.userService.create(createUserDto);
    }

    @Get()
    findAll(): Promise<User[]> {
      return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') user_id: UUID): Promise<User> {
      return this.userService.findOne(user_id);
    }
  
    @Delete(':id')
    remove(@Param('id') user_id: UUID): Promise<void> {
      return this.userService.remove(user_id);
    }
}

module.exports = UserController;