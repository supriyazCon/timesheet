import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import './MuiTable.scss';

function MuiTable({ columnsData, rowsData, getRowId }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12} style={{ height: 560, width: '100%' }}>
        <DataGrid
          rows={rowsData}
          getRowId={getRowId}
          columns={columnsData}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          checkboxSelection={false}
        />
      </Grid>
    </Grid>
  );
}

export default MuiTable;
