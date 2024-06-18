import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entity/form.entity';
import { FormService } from './service/form.service';
import { FormController } from './controller/form.controller';
import { QuestionModule } from 'src/question/question.module';
import { UserModule } from 'src/user/user.module';
import { AnswerModule } from 'src/answer/answer.module';

@Module({
    imports: [TypeOrmModule.forFeature([Form])],
    providers: [FormService],
    controllers: [FormController]
  })
export class FormModule {}
