import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CreateArtistDto } from 'src/artist/dto/artist.dto';
import { ArtistService } from 'src/artist/artist.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
  ApiBody,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Artist } from 'types/types';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiOkResponse({ type: [Artist], description: 'Successful operation' })
  @ApiBadRequestResponse()
  findAll() {
    return this.artistService.findAll();
  }
  @Post()
  @ApiOperation({ summary: 'Add new artist' })
  @ApiBody({
    required: true,
    description: 'Name and grammy are required',
    type: CreateArtistDto,
  })
  @ApiCreatedResponse({ type: Artist, description: 'Successful operation' })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  addArtist(@Body() dto: CreateArtistDto) {
    return this.artistService.addArtist(dto);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get single artis by id' })
  @ApiOkResponse({ type: Artist, description: 'Created Succesfully' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  findOne(@Param('id') id: string) {
    const artist = this.artistService.findOne(id);
    return artist;
  }
  @ApiOperation({ summary: 'Delete artist from library' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. Artist id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Update library artist information by UUID' })
  @ApiBody({
    required: true,
    description: 'Name and grammy are required',
    type: CreateArtistDto,
  })
  @ApiOkResponse({ type: Artist, description: 'The artist has been updated' })
  @ApiBadRequestResponse({
    description: 'Bad request. Artist id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  updateArtist(@Param('id') id: string, @Body() dto: CreateArtistDto) {
    return this.artistService.updateArtist(id, dto);
  }
}
