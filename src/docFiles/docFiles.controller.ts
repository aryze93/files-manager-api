import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocFilesService } from './docFiles.service';
import { UpdateDocFileDto } from './dto/update-docFile.dto';
import { DocFile } from './entities/docFile.entity';

@Controller('v1/documents')
export class DocFilesController {
  constructor(private readonly docFilesService: DocFilesService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DocFile> {
    return this.docFilesService.findOne(id);
  }

  @Get()
  findAll(): Promise<DocFile[]> {
    return this.docFilesService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocFileDto: UpdateDocFileDto,
  ): Promise<DocFile> {
    return this.docFilesService.update(id, updateDocFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docFilesService.remove(id);
  }
}
