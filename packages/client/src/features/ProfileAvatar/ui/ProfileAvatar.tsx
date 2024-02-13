import React, { ChangeEvent, useEffect, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';

export const ProfileAvatar: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files) {
      setFile(event.target?.files[0]);
    }
  };

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <>
      <input
        hidden
        type="file"
        id="profile-avatar"
        accept="image/*"
        onChange={handleFileChange}
      />
      <label htmlFor="profile-avatar">
        <IconButton component="span">
          <Avatar sx={{ width: 100, height: 100 }} alt="Avatar" />
        </IconButton>
      </label>
    </>
  );
};
