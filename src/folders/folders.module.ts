import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [TypeOrmModule.forFeature([Folder]), UtilsModule],
  controllers: [FoldersController],
  providers: [FoldersService],
  exports: [TypeOrmModule],
})
export class FoldersModule {}
