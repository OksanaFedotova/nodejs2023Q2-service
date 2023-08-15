import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTrackDto {
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
  duration: number;
  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  @IsString()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;
  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  @IsString()
  @ValidateIf((_object, value) => value !== null)
  albumId: string | null;
}
