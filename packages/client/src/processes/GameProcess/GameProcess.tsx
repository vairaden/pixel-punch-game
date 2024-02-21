import { StartPage } from '@/pages/StartPage';
import { FC, useCallback, useState } from 'react';
import { GamePage } from '@/pages/GamePage';
import { GameStatus } from '@/shared/constants';

export const GameProcess: FC = () => {
  const [gameStatus, setGameStatus] = useState(GameStatus.START);

  const countDownCallback = useCallback(() => {
    setGameStatus(GameStatus.PLAYING);
  }, []);


  const gameOverCallback = useCallback(() => {
    setGameStatus(GameStatus.END);
  }, []);

  const gamePage: Record<GameStatus, JSX.Element> = {
    [GameStatus.START]: <StartPage countDownCallback={countDownCallback} countdown={5} />,
    [GameStatus.PLAYING]: <GamePage gameOverCallback={gameOverCallback} />,
    [GameStatus.END]: <div>EndPage</div>,
  };

  return gamePage[gameStatus];
}
