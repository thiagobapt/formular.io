import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FormModule } from './form/form.module';
import { QuestionModule } from './question/question.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UserModule,
    FormModule,
    QuestionModule,
    AuthModule,
    DatabaseModule
  ],
})
export class AppModule {}