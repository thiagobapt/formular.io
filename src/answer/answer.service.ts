import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const answer = this.answerRepository.create({
      form: {form_id: createAnswerDto.form_id},
      question: {question_id: createAnswerDto.question_id},
      answer: createAnswerDto.answer,
      user: {user_id: createAnswerDto.user_id}});
    return this.answerRepository.save(answer);
  }

  findAll() {
    return this.answerRepository.find();
  }

  async findAllByFormId(id: UUID) {
    const answers = await this.answerRepository.find({where: {form: {form_id: id}}, relations: {user: true, form: true, question: true}});

    if(answers.length === 0) throw new HttpException(
      'Resposta não encontrada.',
      HttpStatus.NOT_FOUND,
    );

    return answers;
  }

  async findAllByQuestionId(id: UUID) {
    const answers = await this.answerRepository.find({where: {question: {question_id: id}}, relations: {user: true, form: true, question: true}});

    if(answers.length === 0) throw new HttpException(
      'Resposta não encontrada.',
      HttpStatus.NOT_FOUND,
    );

    return answers;
  }

  async findAnsweredFormsByUserId(id: UUID) {
    const answers = await this.answerRepository.find({where: {user: {user_id: id} }, relations: {form: true}});
    
    if(answers.length === 0) throw new HttpException(
      'Nenhum formulário respondido.',
      HttpStatus.NOT_FOUND,
    );

    const forms = [];

    for(const answer of answers) {
      if(!forms.includes(answer.form)) {
        forms.push(answer.form);
      }
    }

    return forms;
  }

  async findOne(id: UUID) {
    const answer = await this.answerRepository.findOne({where: {answer_id: id}, relations: {user: true, form: true, question: true}});

    if(!answer) throw new HttpException(
      'Resposta não encontrada.',
      HttpStatus.NOT_FOUND,
    );

    return answer;
  }

  async update(id: UUID, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.answerRepository.findOne({ where: {
        answer_id: id
      }, relations: {user: true, form: true, question: true}
    })

    if(!answer) throw new HttpException(
      'Resposta não encontrada.',
      HttpStatus.NOT_FOUND,
    );

    return await this.answerRepository.update(answer, updateAnswerDto);
  }

  async remove(id: UUID) {
    const result = await this.answerRepository.delete({answer_id: id})

    if(result.affected === 0) throw new HttpException(
      'Resposta não encontrada.',
      HttpStatus.NOT_FOUND,
    );

    return
  }
}
