import { useEffect, useRef } from 'react';
import { GameEngine } from './logic/GameEngine';

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameEngine = new GameEngine(canvas, ctx);
    const gameLoop = () => {
      gameEngine.update(); // Обновляем состояние игры
      gameEngine.draw(); // Отрисовываем игру
      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }, [canvasRef]);

  return (
    <div>
      <canvas width={480} height={320} ref={canvasRef} id="gameEngine">
        Извините, ваш браузер нет поддерживает &lt;canvas&gt; элемент.
      </canvas>
    </div>
  );
};
