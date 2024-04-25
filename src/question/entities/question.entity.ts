import { UUID, randomUUID } from "crypto";
import { Form } from "src/form/entities/form.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Question {
    @PrimaryColumn({
        length: 36,
        nullable: false,
        default: randomUUID()
      })
      question_id: UUID;
    
      @ManyToOne(type => Form, form => form.form_id)
      @JoinColumn({name: "form_id", referencedColumnName: "form_id"})
      form: Form;
    
      @Column({ nullable: false,  type: 'json' })
      question_body: JSON;
    
}
