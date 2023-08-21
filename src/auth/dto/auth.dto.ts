import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class TokensResponse {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
