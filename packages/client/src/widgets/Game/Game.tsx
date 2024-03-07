import { useEffect, useRef, FC, useState } from 'react';
import { GameEngine } from './logic/GameEngine';
import { GameOverCallback } from '@/shared/types';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';
import { Box } from '@mui/material';

interface IProps {
  gameOverCallback: GameOverCallback;
}

export const Game: FC<IProps> = ({ gameOverCallback }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    canvas.width = wrapper.offsetWidth;
    // TODO: задать высоту без хардкода
    canvas.height = window.innerHeight - 64 - 8 - 16;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isGameEnd = false;

    const gameEngine = new GameEngine(canvas, ctx, res => {
      isGameEnd = true;
      gameOverCallback(res);
    });

    const gameLoop = () => {
      if (isGameEnd) {
        gameEngine.cleanUp();
        return;
      }
      gameEngine.update(); // Обновляем состояние игры
      gameEngine.draw(); // Отрисовываем игру
      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      isGameEnd = true;
    };
  }, []);

  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      wrapperRef.current?.requestFullscreen();
    }
    setIsFullScreen(v => !v);
  };

  useEffect(() => {
    const changeFullScreenState = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', changeFullScreenState);

    return () =>
      document.removeEventListener('fullscreenchange', changeFullScreenState);
  }, []);

  return (
    <Box
      ref={wrapperRef}
      sx={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
      <canvas width={480} height={320} ref={canvasRef} id="gameEngine">
        Извините, ваш браузер нет поддерживает &lt;canvas&gt; элемент.
      </canvas>

      <Box
        sx={{
          display: 'grid',
          color: 'white',
          top: 0,
          right: 0,
          position: 'absolute',
          cursor: 'pointer',
        }}
        onClick={toggleFullScreen}>
        {isFullScreen ? (
          <FullscreenExit fontSize="large" />
        ) : (
          <Fullscreen fontSize="large" />
        )}
      </Box>
    </Box>
  );
};
