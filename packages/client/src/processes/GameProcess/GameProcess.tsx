import { StartPage } from '@/pages/StartPage';
import { useCallback, useState } from 'react';
import { GamePage } from '@/pages/GamePage';
import { GameStatus } from '@/shared/constants';
import { EndPage } from '@/pages/EndPage';
import { assertUnreachable } from '@/shared/utils';
import { withAuthGuard } from '@/app/providers/router/withAuthGuard';

export const GameProcess = withAuthGuard(() => {
  const [gameStatus, setGameStatus] = useState(GameStatus.START);

  const countDownCallback = useCallback(() => {
    setGameStatus(GameStatus.PLAYING);
  }, []);

  const gameOverCallback = useCallback(() => {
    setGameStatus(GameStatus.END);
  }, []);

  const resetCallback = useCallback(() => {
    setGameStatus(GameStatus.START);
  }, []);

  switch (gameStatus) {
    case GameStatus.START:
      return <StartPage countDownCallback={countDownCallback} countdown={5} />;
    case GameStatus.PLAYING:
      return <GamePage gameOverCallback={gameOverCallback} />;
    case GameStatus.END:
      return <EndPage resetCallback={resetCallback} />;
    default:
      assertUnreachable(gameStatus);
  }
});
