export interface IGameResults {
  score: number;
}

export type GameOverCallback = (res: IGameResults) => void;

export interface IGameItem {
  pickUp: () => void;
  draw: () => void;
}
