import { Question } from "src/question/entity/question.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { UUID } from "crypto";
import { Form } from "src/form/entity/form.entity";

@Entity()
export class Answer {
    @PrimaryColumn({
        length: 36,
        nullable: false
      })
    answer_id: UUID;
    
    @ManyToOne(type => User, user => user.user_id, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "user_id", referencedColumnName: "user_id"})
    user: User;
    
    @ManyToOne(type => Form, form => form.form_id)
    @JoinColumn({name: "form_id", referencedColumnName: "form_id"})
    form: Form;
    
    @ManyToOne(type => Question, question => question.question_id)
    @JoinColumn({name: "question_id", referencedColumnName: "question_id"})
    question: Question;

    @Column({ nullable: false,  type: 'json' })
    answer_body: JSON;
    
}