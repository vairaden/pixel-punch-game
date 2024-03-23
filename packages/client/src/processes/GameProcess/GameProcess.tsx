import { StartPage } from '@/pages/StartPage';
import { useCallback, useState } from 'react';
import { GamePage } from '@/pages/GamePage';
import { GameStatus } from '@/shared/constants';
import { EndPage } from '@/pages/EndPage';
import { assertUnreachable } from '@/shared/utils';
import { withAuthGuard } from '@/app/providers/router/withAuthGuard';
import { IGameResult } from '@/shared/types';
import { useSetLeaderboardInfoMutation } from '@/shared/api/leaderboardApi';

export const GameProcess = withAuthGuard(() => {
  const [gameStatus, setGameStatus] = useState(GameStatus.START);
  const [gameResults, setGameResults] = useState<IGameResult | null>(null);

  const [setLeaderboardInfo] = useSetLeaderboardInfoMutation();

  const countDownCallback = useCallback(() => {
    setGameStatus(GameStatus.PLAYING);
  }, []);

  const gameOverCallback = useCallback((results: IGameResult) => {
    setGameResults(results);
    setGameStatus(GameStatus.END);

    setLeaderboardInfo({
      data: results,
      ratingFieldName: 'pixelPunchScore',
      teamName: 'PixelPunch',
    })
      .unwrap()
      .catch(console.error);
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
      if (!gameResults) {
        throw new Error('gameResults is falsy');
      }
      return (
        <EndPage resetCallback={resetCallback} gameResults={gameResults} />
      );
    default:
      assertUnreachable(gameStatus);
  }
});
