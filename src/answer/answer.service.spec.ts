import { Test, TestingModule } from '@nestjs/testing';
import { AnswerService } from './answer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/create-answer.dto';
import { v4 as uuidv4 } from 'uuid';

describe('AnswerService', () => {
  let service: AnswerService;
  let repository: Repository<Answer>;

  const mockAnswerRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(answer => Promise.resolve({ answer_id: uuidv4(), ...answer })),
    find: jest.fn().mockImplementation(() => Promise.resolve([/* array of answers */])),
    findOne: jest.fn(),
    findOneBy: jest.fn().mockImplementation(({ answer_id }) => Promise.resolve({ answer_id, /* answer data */ })),
    update: jest.fn().mockImplementation((answer, dto) => Promise.resolve({ ...answer, ...dto })),
    delete: jest.fn().mockImplementation(({ answer_id }) => Promise.resolve({ answer_id }))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerService,
        {
          provide: getRepositoryToken(Answer),
          useValue: mockAnswerRepository,
        },
      ],
    }).compile();

    service = module.get<AnswerService>(AnswerService);
    repository = module.get<Repository<Answer>>(getRepositoryToken(Answer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an answer', async () => {
    const createAnswerDto: CreateAnswerDto = {
      answer_id: uuidv4(),
      user_id: uuidv4(),
      form_id: uuidv4(),
      question_id: uuidv4(),
      answer: 'This is an answer'
    };
    const expectedAnswer = {
      answer_id: expect.any(String),
      form: { form_id: createAnswerDto.form_id },
      question: { question_id: createAnswerDto.question_id },
      user: { user_id: createAnswerDto.user_id },
      answer: createAnswerDto.answer
    };
    expect(await service.create(createAnswerDto)).toEqual(expectedAnswer);
  });

  it('should return all answers', async () => {
    expect(await service.findAll()).toEqual(expect.any(Array));
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return one answer by id', async () => {
    const id = uuidv4();
    const expectedAnswer = {
      answer_id: id,
      user_id: uuidv4(),
      form_id: uuidv4(),
      question_id: uuidv4(),
      answer: 'This is an answer'
    };
    mockAnswerRepository.findOne.mockReturnValueOnce(Promise.resolve(expectedAnswer));
    expect(await service.findOne(id)).toEqual(expectedAnswer);
  });

  it('should update an answer', async () => {
    const id = uuidv4();
    const updateAnswerDto: UpdateAnswerDto = {
      answer: 'Updated answer'
    };
    const existingAnswer = {
      answer_id: id,
      user_id: uuidv4(),
      form_id: uuidv4(),
      question_id: uuidv4(),
      answer: 'This is an answer'
    };
    mockAnswerRepository.findOne.mockReturnValueOnce(Promise.resolve(existingAnswer));
    expect(await service.update(id, updateAnswerDto)).toEqual({
      ...existingAnswer,
      ...updateAnswerDto,
    });
    expect(repository.update).toHaveBeenCalledWith(existingAnswer, updateAnswerDto);
  });

  it('should remove an answer', async () => {
    const id = uuidv4();
    mockAnswerRepository.delete.mockReturnValueOnce(Promise.resolve({ answer_id: id }));
    expect(await service.remove(id)).toEqual(undefined);
    expect(repository.delete).toHaveBeenCalledWith({ answer_id: id });
  });
});
