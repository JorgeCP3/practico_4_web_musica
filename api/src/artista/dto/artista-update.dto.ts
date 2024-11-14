import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Genero } from 'src/genero/genero.model';

export class ArtistaUpdateDto {
  @IsOptional()
  @IsString()
  readonly nombre: string;

  @IsOptional()
  @IsNumber()
  readonly genero: Genero;

  @IsOptional()
  readonly albums?: null;
}
