import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDocFileDto {
  @IsNotEmpty({ message: 'Field name must be added' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Field url must be added' })
  @IsString()
  url: string;
}
