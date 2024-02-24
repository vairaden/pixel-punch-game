import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { FC, useState } from 'react';

interface IProps {
  countDownCallback: () => void;
  countdown: number;
}

export const StartPage: FC<IProps> = ({ countDownCallback, countdown }) => {
  const [remainingTime, setRemainingTime] = useState(countdown);
  const [isCountdown, setIsCountdown] = useState(false);

  function startTimer() {
    setIsCountdown(true);
    let timeLeft = countdown;

    const interval = setInterval(() => {
      setRemainingTime(prev => prev - 1);
      timeLeft -= 1;

      if (timeLeft === 0) {
        clearInterval(interval);
        countDownCallback();
      }
    }, 1000);
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 8 }}>
          <Typography sx={{ textAlign: 'center', mb: 4 }} variant="h3">
            {isCountdown ? remainingTime : 'Нажмите на конпку'}
          </Typography>
          <Button
            disabled={isCountdown}
            variant="contained"
            onClick={startTimer}>
            Начать
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};
