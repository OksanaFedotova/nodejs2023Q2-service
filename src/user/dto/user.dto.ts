import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  login: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  password: string;
  static login: string;
  static password: string;
}
export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  oldPassword: string; // previous password
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  newPassword: string; // new password
}
