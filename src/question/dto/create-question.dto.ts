import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsObject, IsOptional, IsUUID } from "class-validator";
import { UUID, randomUUID } from "crypto";

export class CreateQuestionDto {
    @ApiProperty()
    @IsOptional()
    @IsUUID()
    questionId: UUID;
    @ApiProperty()
    @IsUUID()
    formId: UUID;
    @ApiProperty()
    @IsObject()
    question_body: JSON;
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}