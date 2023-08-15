import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { FavoritesResponse } from 'types/types';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Gets all favorites albums, tracks and artists' })
  @ApiOkResponse({
    type: FavoritesResponse,
    description: 'Successful operation',
  })
  @ApiBadRequestResponse()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post(':type/:id')
  @ApiOperation({
    summary: 'Add item (according to the type) to the favorites',
  })
  @ApiParam({
    name: 'type',
    required: true,
    description: 'string with the value "album", "artist" or "track"',
  })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({ description: 'Item id is invalid' })
  @ApiUnprocessableEntityResponse({ description: "Item with id doesn't exist" })
  addFavorite(@Param('type') type: string, @Param('id') id: string) {
    return this.favoritesService.addFavorite(id, type);
  }

  @Delete(':type/:id')
  @ApiOperation({ summary: 'Delete item by id from favorites' })
  @ApiNoContentResponse({ description: 'success' })
  @ApiBadRequestResponse({ description: 'uuid is invalid' })
  @ApiNotFoundResponse({ description: 'Item was not found' })
  @ApiParam({ name: 'id', required: true, description: 'uuid v4' })
  @ApiParam({
    name: 'type',
    required: true,
    description: 'string with the value "album", "artist" or "track"',
  })
  @HttpCode(204)
  deleteFavorite(@Param('type') type: string, @Param('id') id: string) {
    return this.favoritesService.deleteFavorite(id, type);
  }
}
