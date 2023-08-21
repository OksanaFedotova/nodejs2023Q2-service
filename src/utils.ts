import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { readFile, stat, unlink } from 'fs/promises';
import * as yaml from 'js-yaml';
import { validate } from 'uuid';
import fs from 'fs';

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
  db.forEach((item) => (item[param] === id ? (item[param] = null) : item[param]));
};

export function exclude(res, keys) {
  return Object.fromEntries(Object.entries(res).filter(([key]) => !keys.includes(key)));
}

export const getDocs = async (fileName: string) => yaml.load(await readFile(fileName, 'utf8'));

export const rotate = async (fileName: string, max: number) => {
  const size = (await stat(fileName)).size;
  if (size > max) {
    try {
      fs.access(fileName, fs.constants.F_OK, async (err) => {
        if (err) {
          console.error(err);
          return;
        }
        await unlink(fileName);
      });
    } catch (e) {
      console.error(e);
    }
  }
};
