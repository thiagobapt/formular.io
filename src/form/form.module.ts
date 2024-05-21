import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entity/form.entity';
import { FormService } from './service/form.service';
import { FormController } from './controller/form.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Form])],
    providers: [FormService],
    controllers: [FormController],
  })
export class FormModule {}
