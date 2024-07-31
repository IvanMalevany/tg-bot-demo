import { Test, TestingModule } from '@nestjs/testing';
import { FrontController } from './front.controller';
import { FrontService } from './front.service';

describe('AppController', () => {
  let appController: FrontController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FrontController],
      providers: [FrontService],
    }).compile();

    appController = app.get<FrontController>(FrontController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
