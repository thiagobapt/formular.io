import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { FormModule } from './form/form.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'anima123',
      database: 'formular',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    FormModule,
    QuestionModule
  ],
})
export class AppModule {}