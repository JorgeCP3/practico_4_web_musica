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
import { AlbumService } from './album.service';
import { Album } from './album.model';
import { AlbumDto } from './dto/album.dto';
import { AlbumUpdateDto } from './dto/album-update.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { unlink } from 'fs';
import { promisify } from 'util';

import { FileInterceptor } from '@nestjs/platform-express';

const unlinkAsync = promisify(unlink);

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  list(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Album | null> {
    const albumDB = await this.albumService.findById(id);
    if (!albumDB) {
      throw new NotFoundException();
    }
    return albumDB;
  }

  @Post()
  create(@Body() album: AlbumDto): Promise<Album> {
    return this.albumService.createAlbum({
      id: 0,
      nombre: album.nombre,
      artista: album.artista,
      canciones: album.canciones,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() album: AlbumDto,
  ): Promise<Album> {
    const albumDB = await this.albumService.findById(id);
    if (!albumDB) {
      throw new NotFoundException();
    }
    return this.albumService.updateAlbum({
      id: id,
      nombre: album.nombre,
      artista: album.artista,
      canciones: album.canciones,
    });
  }

  @Patch(':id')
  async updatePartial(
    @Param('id') id: number,
    @Body() album: AlbumUpdateDto,
  ): Promise<Album> {
    const albumDB = await this.albumService.findById(id);
    if (!albumDB) {
      throw new NotFoundException();
    }
    return this.albumService.updateAlbum({
      id: id,
      nombre: album.nombre ?? albumDB.nombre,
      artista: album.artista ?? albumDB.artista,
      canciones: album.canciones ?? albumDB.canciones,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const albumDB = await this.albumService.findById(id);
    if (!albumDB) {
      throw new NotFoundException();
    }
    return this.albumService.deleteAlbum(id);
  }

  @Post(':id/picture')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/albums',
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
    const albumDB = await this.albumService.findById(id);
    if (!albumDB) {
      if (image) await unlinkAsync(image.path);
      throw new NotFoundException();
    }

    return {
      message: 'Imagen de portada subida correctamente',
      filename: image.filename ?? 'Nombre no disponible',
      path: image.path ?? 'Ruta no disponible',
      size: image.size,
      mimetype: image.mimetype,
    };
  }
}
