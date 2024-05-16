import { FindeUserDto } from "src/user/dto/find-user.dto";

export class CreateFormDto {
    user: FindeUserDto;
    form_name: string;
}