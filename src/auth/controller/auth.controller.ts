
import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/logtin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.user_email, loginDto.user_password);
    if (!user) {
      throw new NotFoundException('Credenciais inválidas');
    }
    return this.authService.login(user);
  }

}