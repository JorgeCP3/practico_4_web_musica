import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Album } from 'src/album/album.model';

export class CancionUpdateDto {
  @IsOptional()
  @IsString()
  readonly nombre: string;

  @IsOptional()
  @IsNumber()
  readonly album: Album;
}
