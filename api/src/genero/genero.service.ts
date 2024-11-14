import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genero } from './genero.model';

@Injectable()
export class GeneroService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  ) {}

  findAll(): Promise<Genero[]> {
    return this.generoRepository.find({ relations: ['artistas'] });
  }

  findById(id: number): Promise<Genero | null> {
    return this.generoRepository.findOne({
      where: { id },
      relations: ['artistas'],
    });
  }

  createGenero(genero: Genero): Promise<Genero> {
    return this.generoRepository.save(genero);
  }

  async updateGenero(genero: Genero): Promise<Genero> {
    await this.generoRepository.update(genero.id.toString(), genero);
    return genero;
  }

  async deleteGenero(id: number): Promise<void> {
    await this.generoRepository.delete(id);
  }
}
