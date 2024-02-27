export interface IGameResults {
  score: number;
}

export type GameOverCallback = (res: IGameResults) => void;
