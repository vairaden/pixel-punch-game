import { StartPage } from '@/pages/StartPage';
import { useCallback, useState } from 'react';
import { GamePage } from '@/pages/GamePage';
import { EndPage } from '@/pages/EndPage';

const enum GameStatus {
  Start = 'start',
  Playing = 'playing',
  End = 'end',
}

export function GameProcess() {
  const [gameStatus, setGameStatus] = useState(GameStatus.Start);

  const countDownCallback = useCallback(() => {
    setGameStatus(GameStatus.Playing);
  }, []);


  const gameOverCallback = useCallback(() => {
    setGameStatus(GameStatus.End);
  }, []);

  const resetCallback = useCallback(() => {
    setGameStatus(GameStatus.Start);
  }, []);

  switch (gameStatus) {
    case GameStatus.Start:
      return <StartPage countDownCallback={countDownCallback} countdown={5} />;
    case GameStatus.Playing:
      return <GamePage gameOverCallback={gameOverCallback} />;
    case GameStatus.End:
      return <EndPage resetCallback={resetCallback}/>;
  }
}
