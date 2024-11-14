import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Patch,
  Delete,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CancionService } from './cancion.service';
import { Cancion } from './cancion.model';
import { CancionDto } from './dto/cancion.dto';
import { CancionUpdateDto } from './dto/cancion-update.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { unlink } from 'fs';
import { promisify } from 'util';

import { FileInterceptor } from '@nestjs/platform-express';

const unlinkAsync = promisify(unlink);

@Controller('canciones')
export class CancionController {
  constructor(private readonly cancionService: CancionService) {}

  @Get()
  list(): Promise<Cancion[]> {
    return this.cancionService.findAll();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Cancion | null> {
    const cancionDB = await this.cancionService.findById(id);
    if (!cancionDB) {
      throw new NotFoundException();
    }
    return cancionDB;
  }

  @Post()
  create(@Body() cancion: CancionDto): Promise<Cancion> {
    return this.cancionService.createCancion({
      id: 0,
      nombre: cancion.nombre,
      album: cancion.album,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() cancion: CancionDto,
  ): Promise<Cancion> {
    const cancionDB = await this.cancionService.findById(id);
    if (!cancionDB) {
      throw new NotFoundException();
    }
    return this.cancionService.updateCancion({
      id: id,
      nombre: cancion.nombre,
      album: cancion.album,
    });
  }

  @Patch(':id')
  async updatePartial(
    @Param('id') id: number,
    @Body() cancion: CancionUpdateDto,
  ): Promise<Cancion> {
    const cancionDB = await this.cancionService.findById(id);
    if (!cancionDB) {
      throw new NotFoundException();
    }
    return this.cancionService.updateCancion({
      id: id,
      nombre: cancion.nombre ?? cancionDB.nombre,
      album: cancion.album ?? cancionDB.album,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const cancionDB = await this.cancionService.findById(id);
    if (!cancionDB) {
      throw new NotFoundException();
    }
    return this.cancionService.deleteCancion(id);
  }

  @Post(':id/audio')
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: diskStorage({
        destination: './uploads/mp3',
        filename: (req, file, callback) => {
          const idSuffix = req.params.id;
          const extension = extname(file.originalname);

          if (extension !== '.mp3') {
            return callback(
              new HttpException(
                'Only mp3 files are allowed',
                HttpStatus.BAD_REQUEST,
              ),
              null,
            );
          }

          const filename = `${idSuffix}${extension}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @Param('id') id: number,
    @UploadedFile() audio: Express.Multer.File,
  ) {
    const cancionDB = await this.cancionService.findById(id);
    if (!cancionDB) {
      if (audio) await unlinkAsync(audio.path);
      throw new NotFoundException();
    }

    return {
      message: 'Archivo de audio subido correctamente',
      filename: audio.filename ?? 'Nombre no disponible',
      path: audio.path ?? 'Ruta no disponible',
      size: audio.size,
      mimetype: audio.mimetype,
    };
  }
}
