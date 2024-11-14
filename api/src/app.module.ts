import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneroModule } from './genero/genero.module';
import { ArtistaModule } from './artista/artista.module';
import { AlbumModule } from './album/album.module';
import { CancionModule } from './cancion/cancion.module';
import { Genero } from './genero/genero.model';
import { Artista } from './artista/artista.model';
import { Album } from './album/album.model';
import { Cancion } from './cancion/cancion.model';
import { BuscadorModule } from './buscador/buscador.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'musica',
      entities: [Genero, Artista, Album, Cancion],
      synchronize: true,
    }),
    GeneroModule,
    ArtistaModule,
    AlbumModule,
    CancionModule,
    BuscadorModule,
  ],
})
export class AppModule {}
