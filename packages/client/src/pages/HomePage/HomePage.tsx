import { paths } from '@/app/constants/paths';
import { withAuthGuard } from '@/app/providers/router/withAuthGuard';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const HomePage = withAuthGuard(() => {
  const navigate = useNavigate();
  const handleStartGame = () => navigate(paths.game);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body1">
        Добро пожаловать в мир захватывающих приключений и невероятных сражений!
        <br />
        Готов ли ты стать героем, способным защитить свою базу от вражеских
        атак? Вступай в игру "Pixel Punch" и окунись в мир стратегии, тактики и
        бесконечных битв! Тебе предстоит улучшить оборону базы и разработать
        идеальный план, чтобы отразить атаки врага.
        <br />С каждым уровнем враги становятся сильнее, а задачи сложнее.
        Только ты можешь предотвратить гибель своей базы и спасти мир от
        порабощения! Готов ли ты к вызову? Присоединяйся к игре "Pixel Punch"
        прямо сейчас и докажи, что именно ты достоин звания лучшего защитника!
      </Typography>

      <Box sx={{ display: 'flex', mt: 2, justifyContent: 'center' }}>
        <Button variant="contained" onClick={handleStartGame}>
          Начать
        </Button>
      </Box>
    </Box>
  );
});
