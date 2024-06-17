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
    expect(await service.create(createAnswerDto)).toEqual({
      answer_id: expect.any(String),
      ...createAnswerDto,
    });
    expect(repository.create).toHaveBeenCalledWith(createAnswerDto);
    expect(repository.save).toHaveBeenCalledWith(createAnswerDto);
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
    mockAnswerRepository.findOneBy.mockReturnValueOnce(Promise.resolve(expectedAnswer));
    expect(await service.findOne(id)).toEqual(expectedAnswer);
    expect(repository.findOneBy).toHaveBeenCalledWith({ answer_id: id });
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
    mockAnswerRepository.findOneBy.mockReturnValueOnce(Promise.resolve(existingAnswer));
    expect(await service.update(id, updateAnswerDto)).toEqual({
      ...existingAnswer,
      ...updateAnswerDto,
    });
    expect(repository.findOneBy).toHaveBeenCalledWith({ answer_id: id });
    expect(repository.update).toHaveBeenCalledWith(existingAnswer, updateAnswerDto);
  });

  it('should remove an answer', async () => {
    const id = uuidv4();
    expect(await service.remove(id)).toEqual({ answer_id: id });
    expect(repository.delete).toHaveBeenCalledWith({ answer_id: id });
  });
});
