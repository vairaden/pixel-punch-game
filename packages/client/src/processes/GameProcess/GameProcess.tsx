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

  const resetCallback = useCallback(() => {
    setGameStatus(GameStatus.Start);
  }, []);

  switch (gameStatus) {
    case GameStatus.START:
      return <StartPage countDownCallback={countDownCallback} countdown={5} />;
    case GameStatus.PLAYING:
      return <GamePage gameOverCallback={gameOverCallback} />;
    case GameStatus.END:
      return <EndPage resetCallback={resetCallback}/>;
  }
}
