import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Album } from 'src/album/album.model';

export class CancionDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsNumber()
  readonly album: Album;
}
