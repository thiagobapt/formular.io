import { UUID, randomUUID } from "crypto";
import { Form } from "src/form/entities/form.entity";
import { Entity, Column, PrimaryColumn, OneToMany, BeforeInsert } from "typeorm"

@Entity()
export class User {
  @PrimaryColumn({
    length: 36,
    nullable: false
  })
  user_id: UUID;
  @BeforeInsert()
  setId() {
    this.user_id = randomUUID();
  }

  @Column({ nullable: false, unique: true })
  user_email: string;

  @Column({ nullable: false })
  user_name: string;

  @Column({ nullable: false })
  user_password: string;

  @OneToMany(type => Form, form => form.user)
  form: Form

}