import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Artista } from '../artista/artista.model';
import { Album } from '../album/album.model';
import { Cancion } from '../cancion/cancion.model';
import { Genero } from 'src/genero/genero.model';

@Injectable()
export class BuscadorService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
    @InjectRepository(Artista)
    private readonly artistaRepository: Repository<Artista>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Cancion)
    private readonly cancionRepository: Repository<Cancion>,
  ) {}

  async buscar(query: string) {
    const generos = await this.generoRepository.find({
      where: { nombre: Like(`%${query}%`) },
    });

    const artistas = await this.artistaRepository.find({
      where: { nombre: Like(`%${query}%`) },
    });

    const albums = await this.albumRepository.find({
      where: { nombre: Like(`%${query}%`) },
      relations: ['artista'],
    });

    const canciones = await this.cancionRepository.find({
      where: { nombre: Like(`%${query}%`) },
      relations: ['album'],
    });

    return { generos, artistas, albums, canciones };
  }
}
