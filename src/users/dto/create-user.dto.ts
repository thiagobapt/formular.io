import { UUID } from "crypto";

export class CreateUserDto {

    user_id: UUID;
    user_email: string;
    user_name: string;
    user_password: string;
    
}