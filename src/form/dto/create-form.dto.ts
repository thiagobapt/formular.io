import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateFormDto {
    @ApiProperty()
    @IsUUID()
    userId: string;
    @ApiProperty()
    @IsString()
    form_name: string;
}

export class UpdateFormDto extends PartialType(CreateFormDto) {}