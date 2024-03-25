import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { IGameResult } from '@/shared/types';
import { getPrettyTime } from '@/shared/utils';

interface IProps {
  resetCallback: () => void;
  gameResults: IGameResult;
}

export const EndPage: FC<IProps> = ({ resetCallback, gameResults }) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 8 }}>
          <Typography sx={{ textAlign: 'center', mb: 4 }} variant="h3">
            Игра окончена
          </Typography>
          <Typography variant="h5">Результаты:</Typography>
          <Typography variant="body1">
            Счет: {gameResults.pixelPunchScore}
          </Typography>
          <Typography variant="body1">
            Прожито времени: {getPrettyTime(gameResults.timeSurvived)}
          </Typography>
          <Typography variant="body1">
            Уничтожено врагов: {gameResults.enemiesKilled}
          </Typography>
          <Typography sx={{ mb: 4 }} variant="body1">
            Собрано монет: {gameResults.coinsCollected}
          </Typography>
          <Button variant="contained" onClick={resetCallback}>
            Назад
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};
