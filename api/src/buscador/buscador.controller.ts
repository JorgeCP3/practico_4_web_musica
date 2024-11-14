import { Controller, Get, Query } from '@nestjs/common';
import { BuscadorService } from './buscador.service';

@Controller('buscar')
export class BuscadorController {
  constructor(private readonly buscadorService: BuscadorService) {}

  @Get()
  async buscar(@Query('query') query: string) {
    return this.buscadorService.buscar(query);
  }
}
