import React, { ChangeEvent, useEffect, useState } from 'react';

import { Avatar, Box, IconButton } from '@mui/material';

import { useSetProfileAvatarMutation } from '@/shared/api/profileApi';
import { BASE_URL } from '@/shared/api/baseApi';
import { useActions, useAppSelector } from '@/shared/hooks';
import { Message } from '@/shared/ui';

export const ProfileAvatar: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const [profileAvatar, { isSuccess, isError }] = useSetProfileAvatarMutation();

  const avatar = useAppSelector(state => state.profile.avatar);
  const { setProfile } = useActions();

  const AVATAR_URL = `${BASE_URL}/resources/${avatar}`;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files) {
      setFile(event.target?.files[0]);
    }
  };

  const handleProfileAvatarChange = async () => {
    try {
      const formData = new FormData();
      formData.append('avatar', file as File);

      const response = await profileAvatar(formData).unwrap();
      setProfile(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!file?.size) return;
    handleProfileAvatarChange();
  }, [file]);

  return (
    <>
      <Box sx={{ marginTop: 2 }}>
        <input
          hidden
          type="file"
          accept="image/*"
          id="profile-avatar"
          onChange={handleFileChange}
        />
        <label htmlFor="profile-avatar">
          <IconButton component="span">
            <Avatar
              sx={{ width: 120, height: 120 }}
              alt="Avatar"
              src={AVATAR_URL}
            />
          </IconButton>
        </label>
      </Box>
      {isSuccess && <Message title="Успех!" />}
      {isError && <Message title="Что то пошло не так!" />}
    </>
  );
};
