import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { database } from './main';
interface IObject {
  [key: string]: string | number;
}
export const checkItem = (id: string, db, errorType = 404) => {
  if (!validate(id)) throw new BadRequestException();
  const item = db.filter(({ id: itemId }) => itemId === id)[0];
  if (!item) {
    switch (errorType) {
      case 404:
        throw new NotFoundException();
      case 422:
        throw new UnprocessableEntityException();
      default:
        throw new NotFoundException();
    }
  }
  return item;
};

export const setIdToNull = (id: string, db: IObject[], param: string) => {
  db.forEach((item) =>
    item[param] === id ? (item[param] = null) : item[param],
  );
};

export const removeFromFavs = (id, subdb) => {
  database.favorites[subdb] = database.favorites[subdb].filter(
    ({ id: itemId }) => itemId !== id,
  );
};
