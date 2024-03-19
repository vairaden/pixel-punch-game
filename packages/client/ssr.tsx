import React from 'react';
import { renderToString } from 'react-dom/server';
import { MockPage } from '@/app/MockPage';

export function render() {
  return renderToString(<MockPage />);
}
