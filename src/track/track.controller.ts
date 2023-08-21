import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/track.dto';
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
import { Track } from 'types/types';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  @ApiOperation({ summary: 'Gets all library tracks list' })
  @ApiOkResponse({ type: [Track], description: 'success' })
  @ApiBadRequestResponse({ description: '' })
  findAll() {
    return this.trackService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Add new track information' })
  @ApiBody({
    required: true,
    description: "The track's name and duration are required, album id and artist id are optional",
    type: CreateTrackDto,
  })
  @ApiCreatedResponse({ type: Track, description: 'Created Succesfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  addTrack(@Body() dto: CreateTrackDto) {
    return this.trackService.addTrack(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single track by id' })
  @ApiOkResponse({ type: Track, description: 'Successful operation' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  findOne(@Param('id') id: string) {
    const Track = this.trackService.findOne(id);
    return Track;
  }

  @ApiOperation({ summary: 'Delete track from library' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track information' })
  @ApiOkResponse({ type: Track, description: 'The track has been updated' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiBody({
    required: true,
    description: "The track's name and duration are required, album id and artist id are optional",
    type: CreateTrackDto,
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  updateTrack(@Param('id') id: string, @Body() dto: CreateTrackDto) {
    return this.trackService.updateTrack(id, dto);
  }
}
