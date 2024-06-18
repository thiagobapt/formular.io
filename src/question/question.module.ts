import { Module } from '@nestjs/common';
import { QuestionService } from './service/question.service';
import { QuestionController } from './controller/question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entity/question.entity';
import { FormModule } from 'src/form/form.module';
import { UserModule } from 'src/user/user.module';
import { AnswerModule } from 'src/answer/answer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule {}
