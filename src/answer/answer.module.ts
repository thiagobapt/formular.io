import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { QuestionModule } from 'src/question/question.module';
import { FormModule } from 'src/form/form.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  controllers: [AnswerController],
  providers: [AnswerService]
})
export class AnswerModule {}
