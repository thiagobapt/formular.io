import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class CreateAnswerDto {
    @ApiProperty()
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
    @IsJSON()
    answer_body: JSON;
}
