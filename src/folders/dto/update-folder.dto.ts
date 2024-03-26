import { PartialType } from '@nestjs/mapped-types';
import { CreateFolderDto } from './create-folder.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateFolderDto extends PartialType(CreateFolderDto) {
  @IsNotEmpty({ message: 'Field name must be added' })
  @IsString()
  name: string;
}
