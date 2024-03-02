import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { bindActionCreators } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { userActions } from '../store';

const rootActions = { ...userActions };

const useAppDispatch: () => AppDispatch = useDispatch;

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
