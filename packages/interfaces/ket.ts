export interface Ket {
  id: string;
  name: string;
  description: string;
  totalQuestion: number;
  totalPlay: number;
  thumbnail: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  author: KetAuthor;
}

export interface KetAuthor {
  id: string;
  displayName: string;
  avatar: string;
}

export interface JoinKetRoomRequest {
  roomId: string;
  displayName: string;
  avatar: string;
}

export interface JoinKetRoomResponse {
  id: string;
  displayName: string;
  roomId: string;
  score: number;
  avatar: string;
  timeAverage: number;
}

export interface HostCreateRoomRequest  {
    ketId: string;
  };

  export interface HostCreateRoomResponse  {
    id: string;
    ketId: string;
    userId: string;
    roomStatus: string;
    totalQuestion: number;
  };

export interface Player {
  avatar: string;
  displayName: string;
  id: string;
  roomId: string;
  score: number;
  timeAverage: number;
}
