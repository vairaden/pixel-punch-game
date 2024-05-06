import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ColumnHeader } from '@/features/ColumnHeader';
import { Container } from '@mui/material';

import { withAuthGuard } from '@/app/providers/router/withAuthGuard';
import { useGetLeaderboardInfoQuery } from '@/shared/api/leaderboardApi';
import type { IGameResult } from '@/shared/types';
import { useMemo } from 'react';

const columns: GridColDef<IGameResult>[] = [
  {
    field: 'pixelPunchScore',
    headerName: 'Счет',
    width: 300,
    renderHeader: header => (
      <ColumnHeader title={header.colDef.headerName || ''} />
    ),
  },
  {
    field: 'enemiesKilled',
    headerName: ' Уничтожено врагов',
    width: 300,
    renderHeader: header => (
      <ColumnHeader title={header.colDef.headerName || ''} />
    ),
  },
  {
    field: 'coinsCollected',
    headerName: 'Собрано монет',
    width: 300,
    renderHeader: header => (
      <ColumnHeader title={header.colDef.headerName || ''} />
    ),
  },
];

export const LeaderBoardPage = withAuthGuard(() => {
  const { data } = useGetLeaderboardInfoQuery({
    ratingFieldName: 'pixelPunchScore',
    cursor: 0,
    limit: 10,
  });

  const rows = !data
    ? []
    : data.map((item, index) => ({
        ...item.data.data,
        id: index.toString(),
      }));

  return (
    <Container maxWidth="xl">
      <DataGrid rows={rows} columns={columns} />
    </Container>
  );
});
