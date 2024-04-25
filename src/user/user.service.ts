import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.create(createUserDto);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(user_id: UUID): Promise<User | null> {
        return this.userRepository.findOneBy({ user_id });
    }

    async remove(user_id: UUID): Promise<void> {
        await this.userRepository.delete(user_id);
    }
}