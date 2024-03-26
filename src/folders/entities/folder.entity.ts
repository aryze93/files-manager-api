import { DocFile } from 'src/docFiles/entities/docFile.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('folder')
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 70, nullable: false, unique: true })
  name: string;

  @OneToMany((_type) => DocFile, (docFile) => docFile.folder, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  files: File[];

  @Column({ name: 'createdAt', nullable: false })
  createdAt: Date;
}
