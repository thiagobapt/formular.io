import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UUID, randomUUID } from 'crypto';
import { CreateUserDto, UpdateUserDto } from '../dto/create-user.dto';
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
          createUserDto.user_id = randomUUID();
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

    async update(userId: UUID, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOne({where: {user_id: userId}});

        if(!user) throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NOT_FOUND,
        );

        return await this.userRepository.update(user, updateUserDto)
    }

    async resetPassword(userEmail: string, newPassword: string) {
        const user = await this.userRepository.findOne({where: {user_email: userEmail}});

        const saltOrRounds = 10; // o custo do processamento, 10 é geralmente suficiente
        const hash = await bcrypt.hash(newPassword, saltOrRounds);
        newPassword = hash; // substitui a senha original pelo hash

        if(!user) throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NOT_FOUND,
        );

        return await this.userRepository.update(user, {user_password: newPassword})
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(userId: UUID): Promise<User> {
        const user = await this.userRepository.findOneBy({ user_id: userId });

        if(!user) throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NOT_FOUND,
        );

        return user;
    }

    async findOneByEmail(userEmail) {
      const user = await this.userRepository.findOneBy({user_email: userEmail});

      if(!user) throw new HttpException(
        'Usuário não encontrado.',
        HttpStatus.NOT_FOUND,
      );

      return user;
    }

    async remove(userId: UUID): Promise<void> {
        const result = await this.userRepository.delete(userId);

        if(result.affected === 0) throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NOT_FOUND,
        );
    }
}