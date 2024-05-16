import { UUID, randomUUID } from "crypto";
import { Question } from "src/question/entities/question.entity";
import { User } from "src/user/entities/user.entity";
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

  @OneToMany(type => Question, question => question.form)
  question: Question;

}