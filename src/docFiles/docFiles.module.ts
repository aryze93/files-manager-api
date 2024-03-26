import { Module } from '@nestjs/common';
import { DocFilesService } from './docFiles.service';
import { DocFilesController } from './docFiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocFile } from './entities/docFile.entity';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [TypeOrmModule.forFeature([DocFile]), UtilsModule],
  controllers: [DocFilesController],
  providers: [DocFilesService],
  exports: [TypeOrmModule],
})
export class DocFilesModule {}
