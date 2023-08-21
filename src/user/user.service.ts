import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { checkItem } from '../utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'types/types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({});
    const res = users.map((user) => {
      delete user.password;
      return user;
    });
    return res;
  }
  async addUser(dto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...dto,
          version: 1,
        },
      });
      const res = {
        ...user,
        createdAt: new Date(user.createdAt).getTime(),
        updatedAt: new Date(user.updatedAt).getTime(),
      };
      delete res.password;
      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(); //уточнить
      }
      throw error;
    }
  }

  async findOne(id) {
    return await checkItem(id, this.prisma.user);
  }
  async deleteUser(id) {
    await checkItem(id, this.prisma.user);
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
  async updatePassword(id, dto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = dto;
    const user: User = await checkItem(id, this.prisma.user);
    if (user.password !== oldPassword) {
      throw new ForbiddenException();
    } else {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { password: newPassword, version: { increment: 1 } },
      });
      const res = {
        ...updatedUser,
        createdAt: new Date(updatedUser.createdAt).getTime(),
        updatedAt: new Date(updatedUser.updatedAt).getTime(),
      };
      delete res.password;
      return res;
    }
  }
}
