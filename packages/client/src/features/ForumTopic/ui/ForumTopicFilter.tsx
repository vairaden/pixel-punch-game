import { Box, Button, TextField } from '@mui/material';
import Search from '@mui/icons-material/Search';
import { useState, type ChangeEventHandler } from 'react';

export const ForumTopicFilter = (): JSX.Element => {
  const [text, setText] = useState<string>('');

  const handleChangeFilterText: ChangeEventHandler<HTMLInputElement> = e => {
    setText(e.target.value);
    // TODO: Запрос на бэкенд
  };

  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <TextField
        placeholder="Поиск по темам"
        value={text}
        onChange={handleChangeFilterText}
        size="small"
      />
      <Button variant="contained" startIcon={<Search />}>
        Поиск
      </Button>
    </Box>
  );
};
