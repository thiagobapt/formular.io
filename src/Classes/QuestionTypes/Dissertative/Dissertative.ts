import { ApiProperty } from "@nestjs/swagger";
import QuestionBody from "../../QuestionBody"
import { IsOptional, IsString } from "class-validator";

export default class Dissertative extends QuestionBody {
    @IsOptional()
    characterLimit: number;
}