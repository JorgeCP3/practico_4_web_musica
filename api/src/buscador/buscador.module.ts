import { Module } from '@nestjs/common';
import { BuscadorService } from './buscador.service';
import { BuscadorController } from './buscador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genero } from 'src/genero/genero.model';
import { Artista } from 'src/artista/artista.model';
import { Album } from 'src/album/album.model';
import { Cancion } from 'src/cancion/cancion.model';

@Module({
  imports: [TypeOrmModule.forFeature([Genero, Artista, Album, Cancion])],
  providers: [BuscadorService],
  controllers: [BuscadorController],
})
export class BuscadorModule {}
