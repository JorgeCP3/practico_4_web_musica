import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Album } from '../album/album.model';
import { Genero } from '../genero/genero.model';

@Entity()
export class Artista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Genero, (genero) => genero.artistas)
  genero: Genero;

  @OneToMany(() => Album, (album) => album.artista)
  albums: Album[];
}
