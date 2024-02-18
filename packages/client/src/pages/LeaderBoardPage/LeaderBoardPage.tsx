import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ColumnHeader } from '@/features/ColumnHeader';
import type { ILeader } from '@/shared/types/leaderboard.interface';

const mockRows: GridRowsProp<ILeader> = [
  { id: '1', firstName: 'Luke', lastName: 'Skywalker', score: 1350 },
  { id: '2', firstName: 'Anakin', lastName: 'Skywalker', score: 1230 },
  { id: '3', firstName: 'Han', lastName: 'Solo', score: 1100 },
];

const columns: GridColDef<ILeader>[] = [
  {
    field: 'userName',
    headerName: 'Имя пользователя',
    flex: 1,
    renderHeader: header => (
      <ColumnHeader title={header.colDef.headerName || ''} />
    ),
    renderCell: params => `${params.row.firstName} ${params.row.lastName}`,
  },
  {
    field: 'score',
    headerName: 'Баллы',
    renderHeader: header => (
      <ColumnHeader title={header.colDef.headerName || ''} />
    ),
  },
];

export const LeaderBoardPage = () => {
  return <DataGrid rows={mockRows} columns={columns} />;
};
