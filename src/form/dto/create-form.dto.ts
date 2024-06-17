import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class CreateFormDto {
    @ApiProperty()
    @IsUUID()
    user_id: UUID;
    @ApiProperty()
    @IsString()
    form_name: string;
}

export class UpdateFormDto extends PartialType(CreateFormDto) {}