import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RefreshTokenDto } from './dto';
import { Public } from './public';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRes } from 'types/types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Singup' })
  @ApiBody({
    required: true,
    description: 'Signup a user',
    type: AuthDto,
  })
  @ApiCreatedResponse({ type: UserRes, description: 'Created Succesfully' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  @Public()
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.singup(dto);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    required: true,
    description: 'Logins a user and returns a JWT-token',
    type: AuthDto,
  })
  @ApiOkResponse({ type: UserRes, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  @Public()
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiBody({
    required: true,
    type: RefreshTokenDto,
  })
  @ApiOkResponse({ type: UserRes, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  @Public()
  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }
}
