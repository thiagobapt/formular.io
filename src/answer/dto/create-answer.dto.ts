import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class CreateAnswerDto {
    @ApiProperty()
    @IsOptional()
    @IsUUID()
    answer_id: UUID;
    @ApiProperty()
    @IsUUID()
    user_id: UUID;
    @ApiProperty()
    @IsUUID()
    form_id: UUID;
    @ApiProperty()
    @IsUUID()
    question_id: UUID;
    @ApiProperty()
    @IsString()
    answer: string;
}

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {}
