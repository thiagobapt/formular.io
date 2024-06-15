import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { QuestionService } from '../service/question.service';
import { CreateMultiLineDissertativeDto, CreateMultipleChoiceDto, CreateOneLineDissertativeDto, CreateQuestionDto, UpdateMultiLineDissertativeDto, UpdateMultipleChoiceDto, UpdateOneLineDissertativeDto, UpdateQuestionDto } from '../dto/create-question.dto';
import { UUID } from 'crypto';
import { ApiTags } from '@nestjs/swagger';
import OneLineDissertative from 'src/Classes/QuestionTypes/Dissertative/OneLineDissertative';
import { QuestionType } from 'src/Enums/QuestionTypes';

@ApiTags('Questions')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('one-line-dissertative')
  createOneLineDissertative(@Body() questionDto: CreateOneLineDissertativeDto) {
    const question = new CreateQuestionDto;
    question.formId = questionDto.formId;
    questionDto.question_body.characterLimit = 100;

    if(questionDto.question_body.correctAnswer.length > questionDto.question_body.characterLimit) throw new HttpException(
      `A resposta correta deve ter no máximo ${questionDto.question_body.characterLimit} caractéres.`,
      HttpStatus.BAD_REQUEST,
    );

    questionDto.question_body.questionType = QuestionType.OneLineDissertative;
    question.question_body = JSON.parse(JSON.stringify(questionDto.question_body));
    return this.questionService.create(question);
  }

  @Post('multi-line-dissertative')
  createMultiLineDissertative(@Body() questionDto: CreateMultiLineDissertativeDto) {
    const question = new CreateQuestionDto;
    question.formId = questionDto.formId;
    questionDto.question_body.characterLimit = 2000;
    questionDto.question_body.questionType = QuestionType.MultiLineDissertative;

    if(questionDto.question_body.correctAnswer.length > questionDto.question_body.characterLimit) throw new HttpException(
      `A resposta correta deve ter no máximo ${questionDto.question_body.characterLimit} caractéres.`,
      HttpStatus.BAD_REQUEST,
    );
    
    question.question_body = JSON.parse(JSON.stringify(questionDto.question_body));
    return this.questionService.create(question);
  }

  @Post('multiple-choice')
  createMultipleChoice(@Body() questionDto: CreateMultipleChoiceDto) {
    const question = new CreateQuestionDto;
    question.formId = questionDto.formId;
    questionDto.question_body.questionType = QuestionType.MultipleChoice;

    const checkPrevChoices: string[] = [];

    if(!questionDto.question_body.choices.some(value => value === questionDto.question_body.correctAnswer)) {
      throw new HttpException(
        `A escolha correta não está entre as escolhas definidas.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    for (const choice of questionDto.question_body.choices) {
      if(checkPrevChoices.some(value => value === choice)) {
        throw new HttpException(
          `As escolhas não podem ser repetidas.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      checkPrevChoices.push(choice);

      const choiceMaxLength = 150;
      if (choice.length > choiceMaxLength) {
        throw new HttpException(
          `As escolhas devem ter no máximo ${choiceMaxLength} caractéres.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    
    question.question_body = JSON.parse(JSON.stringify(questionDto.question_body));
    return this.questionService.create(question);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.questionService.findOne(id);
  }

  @Get('form/:id')
  findAllByFormId(@Param('id') id: UUID) {
    return this.questionService.findAllByFormId(id);
  }

  @Patch('one-line-dissertative/:id')
  updateOneLineDissertative(@Param('id') id: UUID, @Body() questionDto: UpdateOneLineDissertativeDto) {
    const question = new UpdateQuestionDto;
    question.formId = questionDto.formId;
    questionDto.question_body.characterLimit = 100;

    if(questionDto.question_body.correctAnswer.length > questionDto.question_body.characterLimit) throw new HttpException(
      `A resposta correta deve ter no máximo ${questionDto.question_body.characterLimit} caractéres.`,
      HttpStatus.BAD_REQUEST,
    );

    questionDto.question_body.questionType = QuestionType.OneLineDissertative;
    question.question_body = JSON.parse(JSON.stringify(questionDto.question_body));
    return this.questionService.update(id, question);
  }

  @Patch('multi-line-dissertative/:id')
  updateMultiLineDissertative(@Param('id') id: UUID, @Body() questionDto: UpdateMultiLineDissertativeDto) {
    const question = new UpdateQuestionDto;
    question.formId = questionDto.formId;
    questionDto.question_body.characterLimit = 2000;
    questionDto.question_body.questionType = QuestionType.MultiLineDissertative;

    if(questionDto.question_body.correctAnswer.length > questionDto.question_body.characterLimit) throw new HttpException(
      `A resposta correta deve ter no máximo ${questionDto.question_body.characterLimit} caractéres.`,
      HttpStatus.BAD_REQUEST,
    );
    
    question.question_body = JSON.parse(JSON.stringify(questionDto.question_body));
    return this.questionService.update(id, question);
  }

  @Patch('multiple-choice/:id')
  updateMultipleChoice(@Param('id') id: UUID, @Body() questionDto: UpdateMultipleChoiceDto) {
    const question = new UpdateQuestionDto;
    question.formId = questionDto.formId;
    questionDto.question_body.questionType = QuestionType.MultipleChoice;

    const checkPrevChoices: string[] = [];

    if(!questionDto.question_body.choices.some(value => value === questionDto.question_body.correctAnswer)) {
      throw new HttpException(
        `A escolha correta não está entre as escolhas definidas.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    for (const choice of questionDto.question_body.choices) {
      if(checkPrevChoices.some(value => value === choice)) {
        throw new HttpException(
          `As escolhas não podem ser repetidas.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      checkPrevChoices.push(choice);

      const choiceMaxLength = 150;
      if (choice.length > choiceMaxLength) {
        throw new HttpException(
          `As escolhas devem ter no máximo ${choiceMaxLength} caractéres.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    
    question.question_body = JSON.parse(JSON.stringify(questionDto.question_body));
    return this.questionService.update(id, question);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.questionService.remove(id);
  }
}
