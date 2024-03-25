export interface IGameResult {
  id?: string;
  pixelPunchScore: number;
  enemiesKilled: number;
  coinsCollected: number;
  timeSurvived: number;
}

export type GameOverCallback = (res: IGameResult) => void;
