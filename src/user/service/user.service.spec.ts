import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  const mockUser: User = {
    user_id: uuidv4(),
    user_email: 'test@example.com',
    user_name: 'Test User',
    user_password: 'password',
    user_birthday: new Date(),
    form: null,
    answer: null,
  };

  const createUserDto: CreateUserDto = {
    user_id: uuidv4(),
    user_email: 'test@example.com',
    user_name: 'Test User',
    user_password: 'password',
    user_birthday: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      jest.spyOn(uuidv4, 'toString').mockReturnValue(mockUser.user_id);
      const mockHashedPassword = 'hashedpassword';
      (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
      mockUserRepository.create.mockReturnValue(mockUser);
      mockUserRepository.save.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(uuidv4.toString).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.user_password, 10);
      expect(mockUserRepository.create).toHaveBeenCalledWith({ ...createUserDto, user_password: 'hashedpassword' });
      expect(mockUserRepository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if email is already registered', async () => {
      mockUserRepository.save.mockRejectedValue({ code: 'ER_DUP_ENTRY' });

      await expect(service.create(createUserDto)).rejects.toThrow(new HttpException('Email já registrado.', HttpStatus.BAD_REQUEST));
    });

    it('should throw an internal server error on other errors', async () => {
      mockUserRepository.save.mockRejectedValue(new Error());

      await expect(service.create(createUserDto)).rejects.toThrow(new HttpException('Erro ao criar o registro. Tente novamente mais tarde.', HttpStatus.INTERNAL_SERVER_ERROR));
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      mockUserRepository.find.mockResolvedValue([mockUser]);

      const result = await service.findAll();

      expect(mockUserRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne(mockUser.user_id);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ user_id: mockUser.user_id });
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(mockUser.user_id)).rejects.toThrow(new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND));
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      mockUserRepository.delete.mockResolvedValue({ affected: 1 });

      await expect(service.remove(mockUser.user_id)).resolves.toBeUndefined();
      expect(mockUserRepository.delete).toHaveBeenCalledWith(mockUser.user_id);
    });

    it('should throw an error if user not found', async () => {
      mockUserRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(mockUser.user_id)).rejects.toThrow(new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND));
    });
  });

  describe('resetPassword', () => {
    it('should reset the password for a user', async () => {
      const newPassword = 'newpassword';
      jest.spyOn(uuidv4, 'toString').mockReturnValue(mockUser.user_id);
      const mockHashedPassword = 'hashedpassword';
      (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockUserRepository.update.mockResolvedValue(undefined);

      await expect(service.resetPassword(mockUser.user_email, newPassword)).resolves.toBeUndefined();
      expect(uuidv4.toString).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 10);
      expect(mockUserRepository.update).toHaveBeenCalledWith(mockUser, { user_password: 'hashedpassword' });
    });

    it('should throw an error if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.resetPassword('nonexistent@example.com', 'newpassword')).rejects.toThrow(new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND));
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user by email', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOneByEmail(mockUser.user_email);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ user_email: mockUser.user_email });
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user not found by email', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.findOneByEmail(mockUser.user_email)).rejects.toThrow(new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND));
    });
  });
});
