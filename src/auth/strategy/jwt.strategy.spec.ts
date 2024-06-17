import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';

dotenv.config();

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), PassportModule],
      providers: [JwtStrategy],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should validate the payload and return user data', async () => {
      const payload = { sub: '1234567890', username: 'test@example.com' };
      const user = await strategy.validate(payload);
      expect(user).toEqual({ userId: '1234567890', email: 'test@example.com' });
    });
  });
});
