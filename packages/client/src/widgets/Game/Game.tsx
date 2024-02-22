import { useEffect, useRef, FC } from 'react';
import { GameEngine } from './logic/GameEngine';
import { GameOverCallback } from '@/shared/types';

interface IProps {
  gameOverCallback: GameOverCallback;
}

export const Game: FC<IProps> = ({gameOverCallback}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isGameEnd = false;

    const gameEngine = new GameEngine(canvas, ctx, () => {
      isGameEnd = true;
      gameOverCallback()
    });

    const gameLoop = () => {
      if (!isGameEnd) {
        gameEngine.update(); // Обновляем состояние игры
        gameEngine.draw(); // Отрисовываем игру
        requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();
  }, []);

  return (
    <div>
      <canvas width={480} height={320} ref={canvasRef} id="gameEngine">
        Извините, ваш браузер нет поддерживает &lt;canvas&gt; элемент.
      </canvas>
    </div>
  );
};
