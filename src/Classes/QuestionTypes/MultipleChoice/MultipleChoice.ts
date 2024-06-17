import { QuestionType } from "src/Enums/QuestionTypes";
import QuestionBody from "../../QuestionBody";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export default class MultipleChoice extends QuestionBody {
    questionType: QuestionType;
    @ApiProperty()
    @IsArray()
    choices: string[];
}