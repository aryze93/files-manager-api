// import { Folder } from 'src/folders/entities/folder.entity';
import { Folder } from 'src/folders/entities/folder.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('docFile')
export class DocFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 70, nullable: false, unique: true })
  name: string;

  @Column({ name: 'url', nullable: false, unique: true })
  url: string;

  @ManyToOne((_type) => Folder, (folder) => folder.files, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  folder: Folder;

  @Column({ name: 'createdAt', nullable: false })
  createdAt: Date;
}
