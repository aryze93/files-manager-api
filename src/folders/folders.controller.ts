import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder } from './entities/folder.entity';
import { CreateDocFileDto } from './dto/create-docFile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { EXCEPTIONS } from 'src/utils/exceptions/error-code-list';
import { CustomHttpException } from 'src/utils/exceptions/custom.exception';

@Controller('v1/folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  create(@Body() createFolderDto: CreateFolderDto): Promise<Folder> {
    return this.foldersService.create(createFolderDto);
  }

  @Get()
  findAll() {
    return this.foldersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Folder> {
    return this.foldersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFolderDto: UpdateFolderDto,
  ): Promise<Folder> {
    return this.foldersService.update(id, updateFolderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foldersService.remove(id);
  }

  @Post(':id/documents')
  @UseInterceptors(FileInterceptor('file'))
  createDocFile(
    @Param('id') id: string,
    @Body() createDocFileDto: CreateDocFileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        // .addFileTypeValidator({
        //   fileType: /(jpg|JPG|jpeg|JPEG|png|PNG|webp|pdf|PDF)$/,
        // }) // Only allow image and PDF files
        .build({
          fileIsRequired: true,
          exceptionFactory(message) {
            const error = { error: { message }, ...EXCEPTIONS.BAD_REQUEST };
            throw new CustomHttpException(error);
          },
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.foldersService.createDocFile(id, createDocFileDto, file);
  }

  @Get(':id/documents')
  findAllDocFiles(@Param('id') id: string) {
    return this.foldersService.findAllDocFiles(id);
  }
}
