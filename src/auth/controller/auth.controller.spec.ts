import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/logtin.dto'
import { NotFoundException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    validateUser: jest.fn().mockImplementation((email: string, password: string) => {
      if (email === 'test@example.com' && password === 'password') {
        return Promise.resolve({ user_id: '1', user_email: 'test@example.com' });
      }
      return Promise.resolve(null);
    }),
    login: jest.fn().mockImplementation((user) => {
      return { access_token: 'test-jwt-token' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token if credentials are valid', async () => {
      const loginDto: LoginDto = { user_email: 'test@example.com', user_password: 'password' };

      expect(await controller.login(loginDto)).toEqual({ access_token: 'test-jwt-token' });
      expect(service.validateUser).toHaveBeenCalledWith('test@example.com', 'password');
      expect(service.login).toHaveBeenCalledWith({ user_id: '1', user_email: 'test@example.com' });
    });

    it('should throw NotFoundException if credentials are invalid', async () => {
      const loginDto: LoginDto = { user_email: 'wrong@example.com', user_password: 'wrongpassword' };

      await expect(controller.login(loginDto)).rejects.toThrow(NotFoundException);
      expect(service.validateUser).toHaveBeenCalledWith('wrong@example.com', 'wrongpassword');
    });
  });
});
