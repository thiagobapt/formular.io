import { Test, TestingModule } from '@nestjs/testing';
import { FormService } from './form.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Form } from '../entity/form.entity';
import { Repository } from 'typeorm';
import { CreateFormDto } from '../dto/create-form.dto';
import { v4 as uuidv4 } from 'uuid';

describe('FormService', () => {
  let service: FormService;
  let repository: Repository<Form>;

  const mockFormRepository = {
    create: jest.fn().mockImplementation(dto => ({
      form_id: uuidv4(),
      ...dto,
    })),
    save: jest.fn().mockImplementation(form => Promise.resolve(form)),
    find: jest.fn().mockImplementation(() => Promise.resolve([/* array of forms */])),
    findOneBy: jest.fn().mockImplementation(({ form_id }) => 
      Promise.resolve({
        form_id,
        form_name: 'Test Form',
        user: { user_id: uuidv4(), user_email: 'test@example.com' }
      })
    ),
    delete: jest.fn().mockImplementation(form_id => Promise.resolve({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormService,
        {
          provide: getRepositoryToken(Form),
          useValue: mockFormRepository,
        },
      ],
    }).compile();

    service = module.get<FormService>(FormService);
    repository = module.get<Repository<Form>>(getRepositoryToken(Form));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a form', async () => {
      const createFormDto: CreateFormDto = {
        userId: uuidv4(),
        form_name: 'Test Form'
      };
      expect(await service.create(createFormDto)).toEqual({
        form_id: expect.any(String),
        ...createFormDto,
      });
      expect(repository.create).toHaveBeenCalledWith(createFormDto);
      expect(repository.save).toHaveBeenCalledWith(expect.objectContaining(createFormDto));
    });
  });

  describe('findAll', () => {
    it('should return an array of forms', async () => {
      expect(await service.findAll()).toEqual(expect.any(Array));
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a form by ID', async () => {
      const form_id = uuidv4();
      const expectedForm = {
        form_id,
        form_name: 'Test Form',
        user: { user_id: uuidv4(), user_email: 'test@example.com' }
      };
      mockFormRepository.findOneBy.mockReturnValueOnce(Promise.resolve(expectedForm));
      expect(await service.findOne(form_id)).toEqual(expectedForm);
      expect(repository.findOneBy).toHaveBeenCalledWith({ form_id });
    });

    it('should return null if form not found', async () => {
      const form_id = uuidv4();
      mockFormRepository.findOneBy.mockReturnValueOnce(Promise.resolve(null));
      expect(await service.findOne(form_id)).toBeNull();
      expect(repository.findOneBy).toHaveBeenCalledWith({ form_id });
    });
  });

  describe('remove', () => {
    it('should remove a form by ID', async () => {
      const form_id = uuidv4();
      await service.remove(form_id);
      expect(repository.delete).toHaveBeenCalledWith(form_id);
    });
  });
});
