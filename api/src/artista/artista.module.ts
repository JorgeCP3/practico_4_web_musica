import { Module } from '@nestjs/common';
import { ArtistaService } from './artista.service';
import { ArtistaController } from './artista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artista } from './artista.model';

@Module({
  imports: [TypeOrmModule.forFeature([Artista])],
  providers: [ArtistaService],
  controllers: [ArtistaController],
})
export class ArtistaModule {}
