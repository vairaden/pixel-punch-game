import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { bindActionCreators } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { profileActions } from '../store';

const rootActions = {
  ...profileActions,
};

const useAppDispatch: () => AppDispatch = useDispatch;

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
