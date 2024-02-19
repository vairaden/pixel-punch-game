import React, { useEffect, useState } from 'react';

import { Alert, AlertProps, Snackbar } from '@mui/material';

export const Message: React.FC<AlertProps> = props => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleMessageClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => handleMessageClose, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleMessageClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert variant="filled" onClose={handleMessageClose} {...props}>
        {props.title}
      </Alert>
    </Snackbar>
  );
};
