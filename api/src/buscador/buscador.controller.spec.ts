import { Test, TestingModule } from '@nestjs/testing';
import { BuscadorController } from './buscador.controller';

describe('BuscadorController', () => {
  let controller: BuscadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuscadorController],
    }).compile();

    controller = module.get<BuscadorController>(BuscadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
