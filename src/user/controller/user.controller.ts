import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';
import { UUID } from 'crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return await this.userService.create(createUserDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
      return await this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') userId: UUID): Promise<User> {
      return await this.userService.findOne(userId);
    }
  
    @Delete(':id')
    async remove(@Param('id') userId: UUID): Promise<void> {
      return await this.userService.remove(userId);
    }

    @Patch(':email/resetPassword/:password')
    async resetPassword(@Param('email') userEmail: string, @Param('password') newPassword: string) {
      return await this.userService.resetPassword(userEmail, newPassword);
    }
}