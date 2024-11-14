import { Test, TestingModule } from '@nestjs/testing';
import { BuscadorService } from './buscador.service';

describe('BuscadorService', () => {
  let service: BuscadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuscadorService],
    }).compile();

    service = module.get<BuscadorService>(BuscadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
