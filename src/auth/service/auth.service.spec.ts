import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entity/user.entity'; // Relative path
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let repository: Repository<User>;
  let jwtService: JwtService;

  const mockUserRepository = {
    findOne: jest.fn().mockImplementation(({ where: { user_email } }) => {
      if (user_email === 'test@example.com') {
        return Promise.resolve({
          user_id: '1',
          user_email,
          user_password: bcrypt.hashSync('password', 10),
        });
      }
      return Promise.resolve(null);
    }),
  };

  const mockJwtService = {
    sign: jest.fn().mockImplementation(payload => 'test-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data excluding password if credentials are valid', async () => {
      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toEqual({
        user_id: '1',
        user_email: 'test@example.com',
      });
    });

    it('should return null if credentials are invalid', async () => {
      const result = await service.validateUser('test@example.com', 'wrongpassword');
      expect(result).toBeNull();
    });

    it('should return null if user is not found', async () => {
      const result = await service.validateUser('nonexistent@example.com', 'password');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const user = {
        user_id: '1',
        user_email: 'test@example.com',
      };
      const result = await service.login(user as User);
      expect(result).toEqual({
        access_token: 'test-jwt-token',
      });
    });
  });
});
