import { UUID } from "crypto";
import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class User {
  @PrimaryColumn({
    length: 36,
    nullable: false
  })
  user_id: UUID;

  @Column({ nullable: false })
  user_email: string;

  @Column({ nullable: false })
  user_name: string;

  @Column({ nullable: false })
  user_password: string;
}