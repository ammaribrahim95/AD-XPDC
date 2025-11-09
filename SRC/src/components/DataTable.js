import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({ rows, columns }) => {
  return <DataGrid rows={rows} columns={columns} autoHeight pageSize={5} />;
};

export default DataTable;
