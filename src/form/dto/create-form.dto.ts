import { User } from "src/user/user.entity";

export class CreateFormDto {
    user: User;
    form_name: string;
}