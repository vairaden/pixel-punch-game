import { IGameResult } from './game.interface';

export type ILeader = {
  id: string;
  firstName: string;
  lastName: string;
  score: number;
};

type KeyGameResult = keyof IGameResult;

export interface ILeaderboardSetReqBody {
  data: IGameResult;
  ratingFieldName: KeyGameResult;
  teamName: string;
}

export interface ILeaderboardGetReqBody {
  ratingFieldName: KeyGameResult;
  cursor: number;
  limit: number;
}

export interface ILeaderboardRes {
  data: IGameResult;
}
