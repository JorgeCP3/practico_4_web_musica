import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancion } from './cancion.model';

@Injectable()
export class CancionService {
  constructor(
    @InjectRepository(Cancion)
    private readonly cancionRepository: Repository<Cancion>,
  ) {}

  findAll(): Promise<Cancion[]> {
    return this.cancionRepository.find();
  }

  findById(id: number): Promise<Cancion | null> {
    return this.cancionRepository.findOneBy({ id });
  }

  createCancion(cancion: Cancion): Promise<Cancion> {
    return this.cancionRepository.save(cancion);
  }

  async updateCancion(cancion: Cancion): Promise<Cancion> {
    await this.cancionRepository.update(cancion.id.toString(), cancion);
    return cancion;
  }

  async deleteCancion(id: number): Promise<void> {
    await this.cancionRepository.delete(id);
  }
}
