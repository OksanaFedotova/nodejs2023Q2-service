import { ApiProperty } from '@nestjs/swagger';

export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
export class UserRes {
  @ApiProperty({
    type: String,
  })
  id: string;
  @ApiProperty({
    type: String,
  })
  login: string;
  @ApiProperty({
    type: Number,
  })
  version: number;
  @ApiProperty({
    type: Number,
  })
  @ApiProperty({
    type: Number,
  })
  createdAt: number;
  @ApiProperty({
    type: Number,
  })
  updatedAt: number;
}
export class Artist {
  @ApiProperty({
    type: String,
  })
  id: string; // uuid v4
  @ApiProperty({
    type: String,
  })
  name: string;
  @ApiProperty({
    type: Boolean,
  })
  grammy: boolean;
}

export class Track {
  @ApiProperty({
    type: String,
  })
  id: string; // uuid v4
  @ApiProperty({
    type: String,
  })
  name: string;
  @ApiProperty({
    type: String,
  })
  artistId: string | null; // refers to Artist
  @ApiProperty({
    type: String,
  })
  albumId: string | null; // refers to Album
  @ApiProperty({
    type: Number,
    description: 'In seconds',
  })
  duration: number; // integer number
  [key: string]: string | number;
}
export class Album {
  @ApiProperty({
    type: String,
  })
  id: string; // uuid v4
  @ApiProperty({
    type: String,
  })
  name: string;
  @ApiProperty({
    type: Number,
  })
  year: number;
  @ApiProperty({
    type: String,
  })
  artistId: string | null; // refers to Artist
  [key: string]: string | number;
}
export interface IDatabase {
  users: User[];
  track: Track[];
}
export class FavoritesResponse {
  @ApiProperty({
    type: [Artist],
  })
  artists: Artist[];
  @ApiProperty({
    type: [Album],
  })
  albums: Album[];
  @ApiProperty({
    type: [Track],
  })
  tracks: Track[];
}
// export class Database {
//   users: User[];
//   tracks: Track[];
//   artists: Artist[];
//   albums: Album[];
//   favorites: FavoritesResponse;
//   constructor() {
//     this.users = [];
//     this.tracks = [];
//     this.artists = [];
//     this.albums = [];
//     this.favorites = {
//       artists: [],
//       albums: [],
//       tracks: [],
//     };
//   }
//}
