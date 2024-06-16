import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto, UpdateQuestionDto } from '../dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entity/question.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepository.create({form: {form_id: createQuestionDto.formId}, question_body: createQuestionDto.question_body});

    return await this.questionRepository.save(question);
  }

  async findAll() {
    return await this.questionRepository.find();
  }

  async findAllByFormId(formId: UUID) {
    const questions = await this.questionRepository.find({where: {form: {form_id: formId}}, relations: {form: true}});

    if(questions.length === 0) throw new HttpException(
      'Nenhuma pergunta encontrada com este ID de formulário.',
      HttpStatus.NOT_FOUND,
    );

    return questions;
  }

  async findOne(id: UUID): Promise<Question> {
    return await this.questionRepository.findOne({ where: {
      question_id: id
    }, relations: {form: true} })
  }

  async update(id: UUID, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.findOne({ where: {
      question_id: id
    } })
    return await this.questionRepository.update(question, updateQuestionDto);
  }

  async remove(id: UUID) {
    return await this.questionRepository.delete({question_id: id})
  }
}
