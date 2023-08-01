import { Injectable } from '@nestjs/common';
import { database } from 'src/main';
import { checkItem } from 'src/utils';

@Injectable()
export class FavoritesService {
  findAll() {
    return database.favorites;
  }
  addFavorite(id: string, type: string) {
    const item = checkItem(id, database[`${type}s`], 422);
    database.favorites[`${type}s`].push(item);
  }

  deleteFavorite(id: string, type: string) {
    checkItem(id, database[`${type}s`], 422);
    database.favorites[`${type}s`] = database.favorites[`${type}s`].filter(
      ({ id: itemId }) => {
        return itemId !== id;
      },
    );
  }
}
