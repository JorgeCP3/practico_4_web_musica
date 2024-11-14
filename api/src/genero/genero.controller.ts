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
import { FileInterceptor } from '@nestjs/platform-express';
import { GeneroService } from './genero.service';
import { Genero } from './genero.model';
import { GeneroDto } from './dto/genero.dto';
import { GeneroUpdateDto } from './dto/genero-update.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { unlink } from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(unlink);

@Controller('generos')
export class GeneroController {
  constructor(private readonly generoService: GeneroService) {}

  @Get()
  list(): Promise<Genero[]> {
    return this.generoService.findAll();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Genero | null> {
    const generoDB = await this.generoService.findById(id);
    if (!generoDB) {
      throw new NotFoundException();
    }
    return generoDB;
  }

  @Post()
  create(@Body() genero: GeneroDto): Promise<Genero> {
    return this.generoService.createGenero({
      id: 0,
      nombre: genero.nombre,
      artistas: genero.artistas,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() genero: GeneroDto,
  ): Promise<Genero> {
    const generoDB = await this.generoService.findById(id);
    if (!generoDB) {
      throw new NotFoundException();
    }
    return this.generoService.updateGenero({
      id: id,
      nombre: genero.nombre,
      artistas: genero.artistas,
    });
  }

  @Patch(':id')
  async updatePartial(
    @Param('id') id: number,
    @Body() genero: GeneroUpdateDto,
  ): Promise<Genero> {
    const generoDB = await this.generoService.findById(id);
    if (!generoDB) {
      throw new NotFoundException();
    }
    return this.generoService.updateGenero({
      id: id,
      nombre: genero.nombre ?? generoDB.nombre,
      artistas: genero.artistas ?? generoDB.artistas,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const generoDB = await this.generoService.findById(id);
    if (!generoDB) {
      throw new NotFoundException();
    }
    return this.generoService.deleteGenero(id);
  }

  @Post(':id/picture')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/generos',
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
    const generoDB = await this.generoService.findById(id);
    if (!generoDB) {
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
