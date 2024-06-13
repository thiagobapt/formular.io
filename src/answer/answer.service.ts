import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/create-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  create(createAnswerDto: CreateAnswerDto) {
    const answer = this.answerRepository.create(createAnswerDto);
    return this.answerRepository.save(answer);
  }

  findAll() {
    return this.answerRepository.find();
  }

  findOne(id: UUID) {
    return this.answerRepository.findOneBy({answer_id: id});
  }

  async update(id: UUID, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.answerRepository.findOne({ where: {
        answer_id: id
      }
    })
    return await this.answerRepository.update(answer, updateAnswerDto);
  }

  async remove(id: UUID) {
    return await this.answerRepository.delete({answer_id: id})
  }
}
