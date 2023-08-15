import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate } from 'uuid';

interface IObject {
  [key: string]: string | number;
}
export const checkItem = async (id: string, db, errorType = 404) => {
  if (!validate(id)) throw new BadRequestException();
  const item = await db.findUnique({
    where: {
      id,
    },
  });
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

export function exclude(res, keys) {
  return Object.fromEntries(
    Object.entries(res).filter(([key]) => !keys.includes(key)),
  );
}
