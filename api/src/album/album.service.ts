import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.model';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  findAll(): Promise<Album[]> {
    return this.albumRepository.find({ relations: ['canciones', 'artista'] });
  }

  findById(id: number): Promise<Album | null> {
    return this.albumRepository.findOne({
      where: { id },
      relations: ['canciones', 'artista'],
    });
  }

  createAlbum(album: Album): Promise<Album> {
    return this.albumRepository.save(album);
  }

  async updateAlbum(album: Album): Promise<Album> {
    await this.albumRepository.update(album.id.toString(), album);
    return album;
  }

  async deleteAlbum(id: number): Promise<void> {
    await this.albumRepository.delete(id);
  }
}
