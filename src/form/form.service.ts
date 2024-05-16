import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './entities/form.entity';
import { CreateFormDto } from './dto/create-form.dto';
import { UUID } from 'crypto';

@Injectable()
export class FormService {
    constructor(
        @InjectRepository(Form)
        private formRepository: Repository<Form>,
    ) {}

    async create(createFormDto: CreateFormDto): Promise<Form> {
        const form = this.formRepository.create(createFormDto);
        return this.formRepository.save(form);
    }

    findAll(): Promise<Form[]> {
        return this.formRepository.find();
    }

    findOne(form_id: UUID): Promise<Form | null> {
        return this.formRepository.findOneBy({ form_id });
    }

    async remove(form_id: UUID): Promise<void> {
        await this.formRepository.delete(form_id);
    }
}
