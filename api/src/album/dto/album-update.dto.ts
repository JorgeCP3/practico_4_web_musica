import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Artista } from 'src/artista/artista.model';

export class AlbumUpdateDto {
  @IsOptional()
  @IsString()
  readonly nombre: string;

  @IsOptional()
  @IsNumber()
  readonly artista: Artista;

  @IsOptional()
  readonly canciones?: null;
}
