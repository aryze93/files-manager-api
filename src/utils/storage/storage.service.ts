import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync, rmSync, unlinkSync, writeFileSync } from 'fs';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  constructor(private configService: ConfigService) { }

  createFolder(folderName: string): void {
    const storagePath =
      this.configService.get('STORAGE_PATH') || './public/storage';
    const folderPath = `${storagePath}/${folderName}`;
    try {
      mkdirSync(folderPath);
      this.logger.log(`Folder ${folderName} created successfully.`);
    } catch (error) {
      this.logger.error(
        `Failed to create folder ${folderName}. Error: ${error}`,
      );
    }
  }

  createFile(folderName: string, file: Express.Multer.File): string {
    const storagePath =
      this.configService.get('STORAGE_PATH') || './public/storage';
    const PORT = this.configService.get('PORT') || 3000;
    const folderPath = `${storagePath}/${folderName}`;
    const filePath = `${folderPath}/${file.originalname}`;
    try {
      if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
        this.logger.log(`Folder ${folderName} created successfully.`);
      }
      // Create the file inside the folder
      writeFileSync(filePath, file.buffer);
      this.logger.log(`File ${file.originalname} created successfully.`);
      // Return the stored file URL
      return `http://localhost:${PORT}/public/storage/${folderName}/${file.originalname}`;
    } catch (error) {
      this.logger.error(
        `Failed to create file ${file.originalname}. Error: ${error}`,
      );
      return null;
    }
  }

  deleteFolder(folderName: string): void {
    const storagePath =
      this.configService.get('STORAGE_PATH') || './public/storage';
    const folderPath = `${storagePath}/${folderName}`;
    try {
      if (existsSync(folderPath)) {
        rmSync(folderPath, { recursive: true });
        this.logger.log(`Folder ${folderName} deleted successfully.`);
      } else {
        this.logger.warn(`Folder ${folderName} does not exist.`);
      }
    } catch (error) {
      this.logger.error(
        `Failed to delete folder ${folderName}. Error: ${error}`,
      );
    }
  }

  deleteFile(filePath: string): void {
    const storagePath =
      this.configService.get('STORAGE_PATH') || './public/storage';
    const fileFullPath = `${storagePath}/${filePath}`;
    try {
      if (existsSync(fileFullPath)) {
        unlinkSync(fileFullPath);
        this.logger.log(`File ${fileFullPath} deleted successfully.`);
      } else {
        this.logger.warn(`File ${fileFullPath} does not exist.`);
      }
    } catch (error) {
      this.logger.error(`Failed to delete file ${fileFullPath}. Error: ${error}`);
    }
  }
}
