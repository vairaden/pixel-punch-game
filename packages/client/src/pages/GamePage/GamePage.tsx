import { Game } from '@/widgets/Game';
import { GameOverCallback } from '@/shared/types';
import { FC } from 'react';

interface Props {
  gameOverCallback: GameOverCallback;
}

export const GamePage: FC<Props> = ({gameOverCallback}) => {
  return <Game gameOverCallback={gameOverCallback} />;
}
