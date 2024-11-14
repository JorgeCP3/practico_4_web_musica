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
import { ArtistaService } from './artista.service';
import { Artista } from './artista.model';
import { ArtistaDto } from './dto/artista.dto';
import { ArtistaUpdateDto } from './dto/artista-update.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { unlink } from 'fs';
import { promisify } from 'util';

import { FileInterceptor } from '@nestjs/platform-express';

const unlinkAsync = promisify(unlink);

@Controller('artistas')
export class ArtistaController {
  constructor(private readonly artistaService: ArtistaService) {}

  @Get()
  list(): Promise<Artista[]> {
    return this.artistaService.findAll();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Artista | null> {
    const artistaDB = await this.artistaService.findById(id);
    if (!artistaDB) {
      throw new NotFoundException();
    }
    return artistaDB;
  }

  @Post()
  create(@Body() artista: ArtistaDto): Promise<Artista> {
    return this.artistaService.createArtista({
      id: 0,
      nombre: artista.nombre,
      genero: artista.genero,
      albums: artista.albums,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() artista: ArtistaDto,
  ): Promise<Artista> {
    const artistaDB = await this.artistaService.findById(id);
    if (!artistaDB) {
      throw new NotFoundException();
    }
    return this.artistaService.updateArtista({
      id: id,
      nombre: artista.nombre,
      genero: artista.genero,
      albums: artista.albums,
    });
  }

  @Patch(':id')
  async updatePartial(
    @Param('id') id: number,
    @Body() artista: ArtistaUpdateDto,
  ): Promise<Artista> {
    const artistaDB = await this.artistaService.findById(id);
    if (!artistaDB) {
      throw new NotFoundException();
    }
    return this.artistaService.updateArtista({
      id: id,
      nombre: artista.nombre ?? artistaDB.nombre,
      genero: artista.genero ?? artistaDB.genero,
      albums: artista.albums ?? artistaDB.albums,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const artistaDB = await this.artistaService.findById(id);
    if (!artistaDB) {
      throw new NotFoundException();
    }
    return this.artistaService.deleteArtista(id);
  }

  @Post(':id/picture')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/artistas',
        filename: (req, file, callback) => {
          const idSuffix = req.params.id;
          const extension = extname(file.originalname);
          if (extension !== '.png') {
            return callback(
              new HttpException(
                'Only png files are allowed',
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
    @UploadedFile() image: Express.Multer.File,
  ) {
    const artistaDB = await this.artistaService.findById(id);
    if (!artistaDB) {
      if (image) await unlinkAsync(image.path);
      throw new NotFoundException();
    }

    return {
      message: 'Imagen subida correctamente',
      filename: image.filename ?? 'Nombre no disponible',
      path: image.path ?? 'Ruta no disponible',
      size: image.size,
      mimetype: image.mimetype,
    };
  }
}
