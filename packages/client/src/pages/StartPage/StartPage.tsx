import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { FC, useCallback, useRef, useState } from 'react';

interface Props {
  countDownCallback: () => void;
  countdown: number;
}

export const StartPage: FC<Props> = ({ countDownCallback, countdown }) => {
  const [remainingTime, setRemainingTime] = useState(countdown);
  const [isCountdown, setIsCountdown] = useState(false);
  const timeRef = useRef(countdown);

  const startTimer = useCallback(() => {
    setIsCountdown(true);

    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
      timeRef.current -= 1;

      if (timeRef.current === 0) {
        clearInterval(interval);
        countDownCallback();
      }
    }, 1000);
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 8 }}>
          <Typography sx={{textAlign: 'center', mb: 4}} variant="h3">
            {isCountdown ? remainingTime : 'Нажмите на конпку'}
          </Typography>
          <Button disabled={isCountdown} variant="contained" onClick={startTimer}>Начать</Button>
        </Paper>
      </Box>
    </Container>
  );
};
