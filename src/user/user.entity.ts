import { UUID, randomUUID } from "crypto";
import { Form } from "src/form/entities/form.entity";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"

@Entity()
export class User {
  @PrimaryColumn({
    length: 36,
    nullable: false,
    default: randomUUID()
  })
  user_id: UUID;

  @Column({ nullable: false })
  user_email: string;

  @Column({ nullable: false })
  user_name: string;

  @Column({ nullable: false })
  user_password: string;

  @OneToMany(type => Form, form => form.user)
  form: Form

}