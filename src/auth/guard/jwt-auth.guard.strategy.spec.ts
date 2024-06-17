import { JwtAuthGuard } from './jwt-auth.guard.strategy';

describe('JwtAuthGuardStrategy', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
