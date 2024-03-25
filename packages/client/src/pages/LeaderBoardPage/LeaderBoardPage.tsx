import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ColumnHeader } from '@/features/ColumnHeader';

import { withAuthGuard } from '@/app/providers/router/withAuthGuard';
import { useGetLeaderboardInfoMutation } from '@/shared/api/leaderboardApi';
import { useEffect, useState } from 'react';
import type { IGameResult } from '@/shared/types';

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
  const [rows, setRows] = useState<IGameResult[]>([]);
  const [getLeaderboardInfo] = useGetLeaderboardInfoMutation();

  useEffect(() => {
    getLeaderboardInfo({
      ratingFieldName: 'pixelPunchScore',
      cursor: 0,
      limit: 10,
    })
      .unwrap()
      .then(data => {
        const row = { ...data[0].data, id: '1' } as unknown as IGameResult;
        setRows([row]);
      })
      .catch(console.error);
  }, [getLeaderboardInfo]);

  return <DataGrid rows={rows} columns={columns} />;
});
