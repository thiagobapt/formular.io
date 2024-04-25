import { UUID, randomUUID } from "crypto";
import { Question } from "src/question/entities/question.entity";
import { User } from "src/user/user.entity";
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"

@Entity()
export class Form {
  @PrimaryColumn({
    length: 36,
    nullable: false,
    default: randomUUID()
  })
  form_id: UUID;

  @ManyToOne(type => User, user => user.user_id)
  @JoinColumn({name: "user_id", referencedColumnName: "user_id"})
  user: User;

  @Column({ nullable: false })
  form_name: string;

  @OneToMany(type => Question, question => question.form)
  question: Question;

}