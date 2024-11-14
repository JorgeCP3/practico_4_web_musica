import { Module } from '@nestjs/common';
import { CancionService } from './cancion.service';
import { CancionController } from './cancion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancion } from './cancion.model';

@Module({
  imports: [TypeOrmModule.forFeature([Cancion])],
  providers: [CancionService],
  controllers: [CancionController],
})
export class CancionModule {}
