import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class CreateQuestionDto {
    @ApiProperty()
    @IsUUID()
    formId: UUID;
    @ApiProperty()
    @IsJSON()
    question_body: JSON;
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}