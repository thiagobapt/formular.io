import { IsEmail, IsString, IsUUID } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    user_email: string;
    @ApiProperty()
    @IsString()
    user_password: string;
}