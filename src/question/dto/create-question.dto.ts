import { Form } from "src/form/entities/form.entity";

export class CreateQuestionDto {
    form: Form;
    question_body: JSON;
}
