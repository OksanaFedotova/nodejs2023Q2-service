import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  name: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  year: number;
  @IsString()
  @ValidateIf((_object, value) => value !== null)
  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  artistId: string | null;
}
