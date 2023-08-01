import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { database } from 'src/main';
import { CreateAlbumDto } from 'src/album/dto/album.dto';
import { checkItem, removeFromFavs, setIdToNull } from 'src/utils';

@Injectable()
export class AlbumService {
  findAll() {
    return database.albums;
  }
  addalbum(dto: CreateAlbumDto) {
    const uuid = randomUUID();
    const album = {
      ...dto,
      id: uuid,
    };
    database.albums.push(album);
    return album;
  }
  findOne(id) {
    return checkItem(id, database.albums);
  }
  deleteAlbum(id) {
    checkItem(id, database.albums);
    database.albums = database.albums.filter(
      ({ id: albumId }) => albumId !== id,
    );
    setIdToNull(id, database.tracks, 'albumId');
    removeFromFavs(id, 'albums');
  }
  updateAlbum(id: string, dto: CreateAlbumDto) {
    const album = checkItem(id, database.albums);
    album.name = dto.name;
    album.artistId = dto.artistId;
    album.year = dto.year;
    return album;
  }
}
