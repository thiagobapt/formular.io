import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FormService } from '../service/form.service';
import { CreateFormDto } from '../dto/create-form.dto';
import { Form } from '../entity/form.entity';
import { UUID } from 'crypto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Forms')
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

    @Get(':id')
    findOne(@Param('formId') form_id: UUID): Promise<Form> {
      return this.formService.findOne(form_id);
    }
  
    @Delete(':id')
    remove(@Param('formId') form_id: UUID): Promise<void> {
      return this.formService.remove(form_id);
    }
}
