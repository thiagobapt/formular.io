import { Test, TestingModule } from '@nestjs/testing';
import { FormController } from './form.controller';
import { FormService } from '../service/form.service';
import { CreateFormDto } from '../dto/create-form.dto';
import { Form } from '../entity/form.entity';
import { v4 as uuidv4 } from 'uuid';

describe('FormController', () => {
  let controller: FormController;
  let service: FormService;

  const mockFormService = {
    create: jest.fn().mockImplementation((dto: CreateFormDto) => {
      return Promise.resolve({ form_id: uuidv4(), ...dto });
    }),
    findAll: jest.fn().mockImplementation(() => {
      return Promise.resolve([{ form_id: uuidv4(), form_name: 'Test Form', user: { user_id: uuidv4(), user_email: 'test@example.com' } }]);
    }),
    findOne: jest.fn().mockImplementation((form_id: string) => {
      return Promise.resolve({ form_id, form_name: 'Test Form', user: { user_id: uuidv4(), user_email: 'test@example.com' } });
    }),
    remove: jest.fn().mockImplementation((form_id: string) => {
      return Promise.resolve();
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormController],
      providers: [
        {
          provide: FormService,
          useValue: mockFormService,
        },
      ],
    }).compile();

    controller = module.get<FormController>(FormController);
    service = module.get<FormService>(FormService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a form', async () => {
      const createFormDto: CreateFormDto = {
        user_id: uuidv4(),
        form_name: 'Test Form',
      };

      expect(await controller.create(createFormDto)).toEqual({
        form_id: expect.any(String),
        ...createFormDto,
      });
      expect(service.create).toHaveBeenCalledWith(createFormDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of forms', async () => {
      expect(await controller.findAll()).toEqual([
        {
          form_id: expect.any(String),
          form_name: 'Test Form',
          user: { user_id: expect.any(String), user_email: 'test@example.com' },
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a form by ID', async () => {
      const form_id = uuidv4();
      const expectedForm = {
        form_id,
        form_name: 'Test Form',
        user: { user_id: uuidv4(), user_email: 'test@example.com' },
      };

      mockFormService.findOne.mockReturnValueOnce(Promise.resolve(expectedForm));
      expect(await controller.findOne(form_id)).toEqual(expectedForm);
      expect(service.findOne).toHaveBeenCalledWith(form_id);
    });
  });

  describe('remove', () => {
    it('should remove a form by ID', async () => {
      const form_id = uuidv4();
      await controller.remove(form_id);
      expect(service.remove).toHaveBeenCalledWith(form_id);
    });
  });
});
