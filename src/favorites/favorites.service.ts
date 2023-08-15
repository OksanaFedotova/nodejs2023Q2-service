import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkItem } from 'src/utils';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    // const favs = await Promise.all(
    //   ['track', 'album', 'artist'].map(async (type) => {
    //     const dataRaw = await this.prisma[type].findMany({
    //       where: { isFavorite: true },
    //     });
    //     const data = dataRaw.forEach((el) => {
    //       delete el.isFavorite;
    //     });
    //     const res = {
    //       [type]: data,
    //     };
    //     return res;
    //   }),
    // );
    // return favs;
    const artists = await this.prisma.artist.findMany({
      where: { isFavorite: true },
    });
    const albums = await this.prisma.album.findMany({
      where: { isFavorite: true },
    });
    const tracks = await this.prisma.track.findMany({
      where: { isFavorite: true },
    });
    [artists, albums, tracks].forEach((arr) => {
      arr.forEach((el) => delete el.isFavorite);
    });
    return {
      artists: artists,
      albums: albums,
      tracks: tracks,
    };
  }
  async addFavorite(id: string, type: string) {
    await checkItem(id, this.prisma[`${type}`], 422);
    await this.prisma[type].update({
      where: { id },
      data: {
        isFavorite: {
          set: true,
        },
      },
    });
  }

  async deleteFavorite(id: string, type: string) {
    await checkItem(id, this.prisma[`${type}`], 422);
    return this.prisma[type].update({
      where: { id },
      data: { isFavorite: false },
    });
  }
}
