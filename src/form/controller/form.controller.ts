import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FormService } from '../service/form.service';
import { CreateFormDto } from '../dto/create-form.dto';
import { Form } from '../entity/form.entity';
import { UUID } from 'crypto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard.strategy';

@ApiTags('Forms')
@Controller('form')
export class FormController {
    constructor(private readonly formService: FormService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createFormDto: CreateFormDto): Promise<Form> {
      return this.formService.create(createFormDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Form[]> {
      return this.formService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') form_id: UUID): Promise<Form> {
      return this.formService.findOne(form_id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') form_id: UUID): Promise<void> {
      return this.formService.remove(form_id);
    }
}
