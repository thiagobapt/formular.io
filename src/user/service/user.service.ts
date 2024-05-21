import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UUID } from 'crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
          const saltOrRounds = 10; // o custo do processamento, 10 é geralmente suficiente
          const hash = await bcrypt.hash(createUserDto.user_password, saltOrRounds);
          createUserDto.user_password = hash; // substitui a senha original pelo hash
    
          return await this.userRepository.save(
            this.userRepository.create(createUserDto),
          );
        } catch (error) {
          if (error.code === 'ER_DUP_ENTRY') {
            throw new HttpException('Email já registrado.', HttpStatus.BAD_REQUEST);
          } else {
            throw new HttpException(
              'Erro ao criar o registro. Tente novamente mais tarde.',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
        }
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