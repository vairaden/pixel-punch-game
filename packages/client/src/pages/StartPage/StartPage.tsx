import { Box, Button, Container, Typography } from '@mui/material';
import { FC, useCallback, useRef, useState } from 'react';

interface Props {
  countDownCallback: () => void;
  countdown: number;
}

export const StartPage: FC<Props> = ({countDownCallback, countdown}) => {
 const [remainingTime, setRemainingTime] = useState(countdown);
 const timeRef = useRef(countdown);

 const startTimer = useCallback(() => {
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
        {remainingTime}
        <Button onClick={startTimer}>Начать</Button>
      </Box>
    </Container>
  );
}
