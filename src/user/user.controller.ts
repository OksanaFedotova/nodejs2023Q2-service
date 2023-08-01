import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UserRes } from 'database/database';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    type: [UserRes],
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiBody({
    description: "The user's login and the user's password",
    type: CreateUserDto,
  })
  @ApiCreatedResponse({ type: UserRes, description: 'Created Succesfully' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  addUser(@Body() dto: CreateUserDto) {
    return this.userService.addUser(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single user by id' })
  @ApiOkResponse({ type: UserRes, description: 'Created Succesfully' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  findOne(@Param('id') id: string) {
    const user = this.userService.findOne(id);
    return user;
  }

  @ApiOperation({ summary: 'Deletes user by ID' })
  @ApiNoContentResponse({ description: 'User was deleted successfully' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @ApiOperation({ summary: "Updates a user's password by ID" })
  @ApiBody({
    required: true,
    description: "The user's old password and the user's new password",
    type: UpdatePasswordDto,
  })
  @ApiOkResponse({ type: UserRes, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiForbiddenResponse({ description: 'oldPassword is wrong' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  @Put(':id')
  updateUserPassword(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
    return this.userService.updatePassword(id, dto);
  }
}
