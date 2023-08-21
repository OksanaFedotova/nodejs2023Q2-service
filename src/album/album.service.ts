import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/album/dto/album.dto';
import { checkItem, exclude } from 'src/utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const res = await this.prisma.album.findMany({});
    return res.map((el) => exclude(el, ['isFavorite']));
  }
  async addAlbum(dto: CreateAlbumDto) {
    const album = await this.prisma.album.create({
      data: {
        ...dto,
      },
    });
    return album;
  }
  findOne(id) {
    return checkItem(id, this.prisma.album);
  }
  async deleteAlbum(id) {
    await checkItem(id, this.prisma.album);
    await this.prisma.album.delete({
      where: {
        id,
      },
    });
  }
  async updateAlbum(id: string, dto: CreateAlbumDto) {
    await checkItem(id, this.prisma.album);
    return await this.prisma.album.update({ where: { id }, data: dto });
  }
}
