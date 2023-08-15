import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/album.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
  ApiBody,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { Album } from 'types/types';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Get()
  @ApiOperation({ summary: 'Gets all library albums list' })
  @ApiOkResponse({ type: [Album], description: 'Successful operation' })
  @ApiBadRequestResponse()
  findAll() {
    return this.albumService.findAll();
  }
  @Post()
  @ApiOperation({ summary: 'Add new album information' })
  @ApiBody({
    required: true,
    description: 'Name, year are required, artist id and album id are optional',
    type: CreateAlbumDto,
  })
  @ApiCreatedResponse({ type: Album, description: 'Album is create' })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  addAlbum(@Body() dto: CreateAlbumDto) {
    return this.albumService.addAlbum(dto);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiOkResponse({ type: Album, description: 'Successful operation' })
  @ApiBadRequestResponse({
    description: 'Bad request. Album id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  findOne(@Param('id') id: string) {
    const album = this.albumService.findOne(id);
    return album;
  }

  @ApiOperation({ summary: 'Delete album from library' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. Album id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Update library album information by UUID' })
  @ApiBody({
    required: true,
    description: 'Name, year are required, artist id and album id are optional',
    type: CreateAlbumDto,
  })
  @ApiOkResponse({ type: Album, description: 'The album has been updated' })
  @ApiBadRequestResponse({
    description: 'Bad request. Album Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  updateAlbum(@Param('id') id: string, @Body() dto: CreateAlbumDto) {
    return this.albumService.updateAlbum(id, dto);
  }
}
