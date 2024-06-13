import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsObject, IsOptional, IsUUID } from "class-validator";
import { UUID } from "crypto";
import MultiLineDissertative from "src/Classes/QuestionTypes/Dissertative/MultiLineDissertative";
import OneLineDissertative from "src/Classes/QuestionTypes/Dissertative/OneLineDissertative";
import MultipleChoice from "src/Classes/QuestionTypes/MultipleChoice/MultipleChoice";

export class CreateQuestionDto {
    @ApiProperty()
    @IsOptional()
    @IsUUID()
    questionId: UUID;
    @ApiProperty()
    @IsUUID()
    formId: UUID;
    @IsOptional()
    @IsObject()
    question_body: JSON;
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}

export class CreateOneLineDissertativeDto {
    @ApiProperty()
    @IsUUID()
    formId: UUID;
    @ApiProperty()
    @IsObject()
    question_body: OneLineDissertative;
}

export class UpdateOneLineDissertativeDto extends PartialType(CreateOneLineDissertativeDto) {}

export class CreateMultiLineDissertativeDto {
    @ApiProperty()
    @IsUUID()
    formId: UUID;
    @ApiProperty()
    @IsObject()
    question_body: MultiLineDissertative;
}

export class UpdateMultiLineDissertativeDto extends PartialType(CreateMultiLineDissertativeDto) {}

export class CreateMultipleChoiceDto {
    @ApiProperty()
    @IsUUID()
    formId: UUID;
    @ApiProperty()
    @IsObject()
    question_body: MultipleChoice;
}

export class UpdateMultipleChoiceDto extends PartialType(CreateMultipleChoiceDto) {}