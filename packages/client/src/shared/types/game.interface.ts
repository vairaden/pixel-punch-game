export interface IGameResults {
  score: number;
  enemiesKilled: number;
  coinsCollected: number;
  timeSurvived: number;
}

export type GameOverCallback = (res: IGameResults) => void;
