import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Artista } from 'src/artista/artista.model';

export class AlbumDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsNumber()
  readonly artista: Artista;

  @IsOptional()
  readonly canciones?: null;
}
