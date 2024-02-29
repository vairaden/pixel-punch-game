import { Game } from '@/widgets/Game';
import { GameOverCallback } from '@/shared/types';
import { FC } from 'react';

interface IProps {
  gameOverCallback: GameOverCallback;
}

export const GamePage: FC<IProps> = ({ gameOverCallback }) => {
  return <Game gameOverCallback={gameOverCallback} />;
};
