import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  name: string;
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
  })
  grammy: boolean;
}
