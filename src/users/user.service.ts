import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(user: User): Promise<User> {
        return this.userRepository.create(user)
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(user_id: UUID): Promise<User | null> {
        return this.userRepository.findOneBy({ user_id });
    }

    async remove(id: UUID): Promise<void> {
        await this.userRepository.delete(id);
    }
}