import { useEffect, useRef, FC } from 'react';
import { GameEngine } from './logic/GameEngine';
import { GameOverCallback } from '@/shared/types';

interface Props {
  gameOverCallback: GameOverCallback;
}

export const Game: FC<Props> = ({gameOverCallback}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameEndRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameEngine = new GameEngine(canvas, ctx, () => {
      gameEndRef.current = true;
      gameOverCallback()
    });

    const gameLoop = () => {
      if (!gameEndRef.current) {
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
