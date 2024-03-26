import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './entities/folder.entity';
import { CreateDocFileDto } from './dto/create-docFile.dto';
import { DocFile } from 'src/docFiles/entities/docFile.entity';
import { StorageService } from 'src/utils/storage/storage.service';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    private readonly storageService: StorageService,
  ) {}

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    const folderBody = new Folder();
    folderBody.name = createFolderDto.name;
    folderBody.createdAt = new Date(Date.now());
    const folder = this.folderRepository.create(folderBody);
    const savedFolder = await this.folderRepository.save(folder);
    this.storageService.createFolder(savedFolder.name);
    return savedFolder;
  }

  async findAll(): Promise<Folder[]> {
    return await this.folderRepository.find();
  }

  async findOne(id: string): Promise<Folder> {
    const folder = await this.folderRepository.findOne({
      where: { id },
      relations: ['files'],
    });
    if (!folder) {
      throw new NotFoundException(`Folder with ID ${id} not found`);
    }
    return folder;
  }

  async update(id: string, updateFolderDto: UpdateFolderDto): Promise<Folder> {
    const folder = await this.findOne(id);
    Object.assign(folder, updateFolderDto);
    return await this.folderRepository.save(folder);
  }

  async remove(id: string) {
    const folder = await this.folderRepository.findOne({ where: { id } });
    const result = await this.folderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`A folder "${id}" was not found`);
    }
    this.storageService.deleteFolder(folder.name);
    return { message: 'Folder successfully deleted' };
  }

  async createDocFile(
    id: string,
    createDocFileDto: CreateDocFileDto,
    file: Express.Multer.File,
  ): Promise<DocFile> {
    const folder = await this.folderRepository.findOne({ where: { id } });
    if (!folder) {
      throw new NotFoundException(`Folder with ID ${id} not found`);
    }
    const document = new DocFile();
    document.name = createDocFileDto.name;
    document.folder = folder;
    document.createdAt = new Date(Date.now());

    const fileUrl = this.storageService.createFile(folder.name, file);

    document.url = fileUrl;

    // await this.folderRepository
    //   .createQueryBuilder()
    //   .relation(Folder, 'files')
    //   .of(id)
    //   .add(document);

    return this.folderRepository.manager.save(DocFile, document);
  }

  async findAllDocFiles(id: string): Promise<DocFile[]> {
    return await this.folderRepository.manager.find(DocFile, {
      where: { folder: { id } },
    });
  }
}
