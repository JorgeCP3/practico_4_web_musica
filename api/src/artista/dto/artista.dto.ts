import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Genero } from 'src/genero/genero.model';

export class ArtistaDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsNumber()
  readonly genero: Genero;

  @IsOptional()
  readonly albums?: null;
}
