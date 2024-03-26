import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFolderDto {
  @IsNotEmpty({ message: 'Field name must be added' })
  @IsString()
  name: string;
}
