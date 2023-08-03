import React from 'react';
import { Grid } from '@mui/material';
import dashboard from '../../Assets/dashboard.jpg';

function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} mt={1}>
        <img src={dashboard} alt="dashboard" width="100%" height="100%" />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
