import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FormService } from '../service/form.service';
import { CreateFormDto, UpdateFormDto } from '../dto/create-form.dto';
import { Form } from '../entity/form.entity';
import { UUID } from 'crypto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard.strategy';

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
    findOne(@Param('id') form_id: UUID): Promise<Form> {
      return this.formService.findOne(form_id);
    }

    @Get('user/:id')
    findAllByUserId(@Param('id') user_id: UUID): Promise<Form[]> {
      return this.formService.findAllByUserId(user_id);
    }
    
    @Delete(':id')
    remove(@Param('id') form_id: UUID): Promise<void> {
      return this.formService.remove(form_id);
    }

    @Patch(':id')
    update(@Param('id') form_id: UUID, @Body() updateFormDto: UpdateFormDto): Promise<void> {
      return this.formService.update(form_id, updateFormDto);
    }
}
