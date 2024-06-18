import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  const date = new Date();

  const mockUserService = {
    create: jest.fn().mockImplementation((dto: CreateUserDto) => {
      return Promise.resolve({
        ...dto,
        user_id: uuidv4(),
      });
    }),
    findAll: jest.fn().mockResolvedValue([
      {
        user_id: uuidv4(),
        user_email: 'test1@example.com',
        user_name: 'Test User 1',
        user_password: 'password1',
        user_birthday: date,
      },
      {
        user_id: uuidv4(),
        user_email: 'test2@example.com',
        user_name: 'Test User 2',
        user_password: 'password2',
        user_birthday: date,
      },
    ]),
    findOne: jest.fn().mockImplementation((id: string) => {
      return Promise.resolve({
        user_id: id,
        user_email: 'test@example.com',
        user_name: 'Test User',
        user_password: 'password',
        user_birthday: date,
      });
    }),
    remove: jest.fn().mockResolvedValue(undefined),
    resetPassword: jest.fn().mockImplementation((email: string, password: string) => {
      if (email === 'nonexistent@example.com') {
        throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
      }
      return Promise.resolve();
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        user_id: uuidv4(),
        user_email: 'test@example.com',
        user_name: 'Test User',
        user_password: 'password',
        user_birthday: date,
      };

      expect(await controller.create(createUserDto)).toEqual({
        ...createUserDto,
        user_id: expect.any(String),
      });
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(await controller.findAll()).toEqual([
        {
          user_id: expect.any(String),
          user_email: 'test1@example.com',
          user_name: 'Test User 1',
          user_password: 'password1',
          user_birthday: date,
        },
        {
          user_id: expect.any(String),
          user_email: 'test2@example.com',
          user_name: 'Test User 2',
          user_password: 'password2',
          user_birthday: date,
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId = uuidv4();
      expect(await controller.findOne(userId)).toEqual({
        user_id: userId,
        user_email: 'test@example.com',
        user_name: 'Test User',
        user_password: 'password',
        user_birthday: date,
      });
      expect(service.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      const userId = uuidv4();
      await expect(controller.remove(userId)).resolves.toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(userId);
    });
  });

  describe('resetPassword', () => {
    it('should reset the password for a user', async () => {
      const userEmail = 'test@example.com';
      const newPassword = 'newpassword';
      await expect(controller.resetPassword(userEmail, newPassword)).resolves.toBeUndefined();
      expect(service.resetPassword).toHaveBeenCalledWith(userEmail, newPassword);
    });

    it('should throw an error if user not found', async () => {
      const userEmail = 'nonexistent@example.com';
      const newPassword = 'newpassword';
      await expect(controller.resetPassword(userEmail, newPassword)).rejects.toThrow(HttpException);
      expect(service.resetPassword).toHaveBeenCalledWith(userEmail, newPassword);
    });
  });
});
