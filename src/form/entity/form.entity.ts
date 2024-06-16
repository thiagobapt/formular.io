import { UUID, randomUUID } from "crypto";
import { Answer } from "src/answer/entities/answer.entity";
import { Question } from "src/question/entity/question.entity";
import { User } from "src/user/entity/user.entity";
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany, BeforeInsert } from "typeorm"

@Entity()
export class Form {
  @PrimaryColumn({
    length: 36,
    nullable: false
  })
  form_id: UUID;
  @BeforeInsert()
  setId() {
    this.form_id = randomUUID();
  }

  @ManyToOne(type => User, user => user.user_id, {onDelete: "CASCADE", onUpdate: "CASCADE"})
  @JoinColumn({name: "user_id", referencedColumnName: "user_id"})
  user: User;

  @Column({ nullable: false })
  form_name: string;

  @OneToMany(type => Question, question => question.form, {onDelete: "CASCADE", onUpdate: "CASCADE"})
  question: Question;

  @OneToMany(type => Answer, answer => answer.form, {onDelete: "CASCADE", onUpdate: "CASCADE"})
  answer: Answer

}