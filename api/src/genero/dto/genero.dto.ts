import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GeneroDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsOptional()
  readonly artistas?: null;
}
