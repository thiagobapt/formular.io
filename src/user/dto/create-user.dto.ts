import { IsDate, IsDateString, IsEmail, IsString, IsUUID } from "class-validator";
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UUID, randomUUID } from "crypto";

export class CreateUserDto {
    @ApiProperty()
    @IsUUID()
    user_id: UUID;
    @ApiProperty()
    @IsEmail()
    user_email: string;
    @ApiProperty()
    @IsString()
    user_name: string;
    @ApiProperty()
    @IsString()
    user_password: string;
    @ApiProperty()
    @IsDateString()
    user_birthday: Date;
    
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}