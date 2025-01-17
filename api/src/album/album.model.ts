import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artista } from '../artista/artista.model';
import { Cancion } from 'src/cancion/cancion.model';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Artista, (artista) => artista.albums)
  artista: Artista;

  @OneToMany(() => Cancion, (cancion) => cancion.album)
  canciones: Cancion[];
}
