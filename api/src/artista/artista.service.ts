import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artista } from './artista.model';

@Injectable()
export class ArtistaService {
  constructor(
    @InjectRepository(Artista)
    private readonly artistaRepository: Repository<Artista>,
  ) {}
  findAll(): Promise<Artista[]> {
    return this.artistaRepository.find();
  }
  findById(id: number): Promise<Artista | null> {
    return this.artistaRepository.findOneBy({ id });
  }
  createArtista(artista: Artista): Promise<Artista> {
    return this.artistaRepository.save(artista);
  }
  async updateArtista(artista: Artista): Promise<Artista> {
    await this.artistaRepository.update(artista.id.toString(), artista);
    return artista;
  }
  async deleteArtista(id: number): Promise<void> {
    await this.artistaRepository.delete(id);
  }
}
