import { ForbiddenException, Injectable } from '@nestjs/common';
import { database } from 'src/main';
import { randomUUID } from 'node:crypto';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { checkItem } from '../utils';

@Injectable()
export class UserService {
  findAll() {
    return database.users;
  }
  addUser(dto: CreateUserDto) {
    const uuid = randomUUID();
    const user = {
      ...dto,
      id: uuid,
      version: database.users.length + 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    database.users.push(user);
    const res = { ...user };
    delete res.password;
    return res;
  }
  findOne(id) {
    return checkItem(id, database.users);
  }
  deleteUser(id) {
    checkItem(id, database.users);
    database.users = database.users.filter(({ id: userId }) => userId !== id);
  }
  updatePassword(id, dto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = dto;
    const user = checkItem(id, database.users);
    if (user.password !== oldPassword) {
      throw new ForbiddenException();
    } else {
      user.password = newPassword;
      user.version += 1;
      user.updatedAt = new Date().getTime();
      const res = { ...user };
      delete res.password;
      return res;
    }
  }
}
