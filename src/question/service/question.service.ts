import { Injectable } from '@nestjs/common';
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
    const question = this.questionRepository.create(createQuestionDto);

    return await this.questionRepository.save(question);
  }

  async findAll() {
    return await this.questionRepository.find();
  }

  async findOne(id: UUID): Promise<Question> {
    return await this.questionRepository.findOne({ where: {
      question_id: id
    } })
  }

  async update(id: UUID, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.findOne({ where: {
      question_id: id
    } })
    return await this.questionRepository.update(question, updateQuestionDto);
  }

  remove(id: UUID) {
    return `This action removes a #${id} question`;
  }
}
