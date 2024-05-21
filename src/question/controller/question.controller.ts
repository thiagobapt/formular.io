import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionService } from '../service/question.service';
import { CreateQuestionDto, UpdateQuestionDto } from '../dto/create-question.dto';
import { UUID } from 'crypto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.questionService.remove(id);
  }
}
