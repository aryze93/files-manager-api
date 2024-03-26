import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDocFileDto } from './dto/update-docFile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocFile } from './entities/docFile.entity';
import { StorageService } from 'src/utils/storage/storage.service';

@Injectable()
export class DocFilesService {
  constructor(
    @InjectRepository(DocFile)
    private readonly docFileRepository: Repository<DocFile>,
    private readonly storageService: StorageService,
  ) {}

  async findOne(id: string): Promise<DocFile> {
    const folder = await this.docFileRepository.findOne({
      where: { id },
      relations: ['folder'],
    });
    if (!folder) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return folder;
  }

  async findAll(): Promise<DocFile[]> {
    return await this.docFileRepository.find();
  }

  async update(
    id: string,
    updateDocFileDto: UpdateDocFileDto,
  ): Promise<DocFile> {
    const folder = await this.findOne(id);
    Object.assign(folder, updateDocFileDto);
    return await this.docFileRepository.save(folder);
  }

  async remove(id: string) {
    const file = await this.docFileRepository.findOne({where: {id}, relations: ['folder']});
    const result = await this.docFileRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`A file "${id}" was not found`);
    }
    this.storageService.deleteFile(`${file.folder.name}/${file.name}`)
    return { message: 'Document successfully deleted' };
  }
}
