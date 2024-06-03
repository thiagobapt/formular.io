import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FormModule } from './form/form.module';
import { QuestionModule } from './question/question.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    UserModule,
    FormModule,
    QuestionModule,
    AuthModule,
    DatabaseModule,
    AnswerModule
  ],
})
export class AppModule {}