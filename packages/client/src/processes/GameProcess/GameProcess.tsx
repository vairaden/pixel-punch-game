import { StartPage } from '@/pages/StartPage';
import { ReactNode, useCallback, useState } from 'react';
import { GamePage } from '@/pages/GamePage';
import { GameStatus } from '@/shared/constants';

export function GameProcess() {
  const [gameStatus, setGameStatus] = useState(GameStatus.START);

  const countDownCallback = useCallback(() => {
    setGameStatus(GameStatus.PLAYING);
  }, []);


  const gameOverCallback = useCallback(() => {
    setGameStatus(GameStatus.END);
  }, []);

  const gamePage: Record<GameStatus, ReactNode> = {
    [GameStatus.START]: <StartPage countDownCallback={countDownCallback} countdown={5} />,
    [GameStatus.PLAYING]: <GamePage gameOverCallback={gameOverCallback} />,
    [GameStatus.END]: <div>EndPage</div>,
  };

  return gamePage[gameStatus];
}
