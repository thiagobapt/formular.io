import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { QuestionType } from "src/Enums/QuestionTypes";

export default class QuestionBody {
    @ApiProperty()
    title: string;
    @IsOptional()
    questionType: QuestionType;
}