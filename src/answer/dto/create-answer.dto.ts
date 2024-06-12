import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsObject, IsOptional, IsUUID } from "class-validator";
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
    @IsObject()
    answer_body: JSON;
}
