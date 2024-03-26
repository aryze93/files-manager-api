import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDocFileDto {
  @IsNotEmpty({ message: 'Field name must be added' })
  @IsString()
  name: string;
}
