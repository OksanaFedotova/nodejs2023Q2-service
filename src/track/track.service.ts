import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/track.dto';
import { checkItem, exclude } from 'src/utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const res = await this.prisma.track.findMany({});
    return res.map((el) => exclude(el, ['isFavorite']));
  }
  async addTrack(dto: CreateTrackDto) {
    const track = await this.prisma.track.create({
      data: {
        ...dto,
      },
    });
    return track;
  }
  async findOne(id) {
    return await checkItem(id, this.prisma.track);
  }

  async deleteTrack(id) {
    await checkItem(id, this.prisma.track);
    await this.prisma.track.delete({
      where: {
        id,
      },
    });
  }
  async updateTrack(id, dto) {
    await checkItem(id, this.prisma.track);
    return this.prisma.track.update({ where: { id }, data: dto });
  }
}
