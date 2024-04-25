import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { Form } from './entities/form.entity';
import { UUID } from 'crypto';

@Controller('form')
export class FormController {
    constructor(private readonly formService: FormService) {}

    @Post()
    create(@Body() createFormDto: CreateFormDto): Promise<Form> {
      return this.formService.create(createFormDto);
    }

    @Get()
    findAll(): Promise<Form[]> {
      return this.formService.findAll();
    }

    @Get('id')
    findOne(@Body('formId') form_id: UUID): Promise<Form> {
      return this.formService.findOne(form_id);
    }
  
    @Delete('id')
    remove(@Body('formId') form_id: UUID): Promise<void> {
      return this.formService.remove(form_id);
    }
}
