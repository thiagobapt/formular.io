import { UUID, randomUUID } from "crypto";
import { Answer } from "src/answer/entities/answer.entity";
import { Form } from "src/form/entity/form.entity";
import { Entity, Column, PrimaryColumn, OneToMany, BeforeInsert } from "typeorm"

@Entity()
export class User {
  @PrimaryColumn({
    length: 36,
    nullable: false
  })
  user_id: UUID;

  @Column({ nullable: false, unique: true })
  user_email: string;

  @Column({ nullable: false })
  user_name: string;

  @Column({ nullable: false })
  user_password: string;

  @OneToMany(type => Form, form => form.user)
  form: Form;

  @OneToMany(type => Answer, answer => answer.user)
  answer: Answer;

}