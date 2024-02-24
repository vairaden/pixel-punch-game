import { useEffect, useRef } from 'react';
import { GameEngine } from './logic/GameEngine';

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    console.log(wrapperRef.current?.offsetWidth);
    canvas.width = wrapper.offsetWidth;
    canvas.height = window.innerHeight - 64 - 8 - 16;

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
    <div ref={wrapperRef}>
      <canvas width={480} height={320} ref={canvasRef} id="gameEngine">
        Извините, ваш браузер нет поддерживает &lt;canvas&gt; элемент.
      </canvas>
    </div>
  );
};
