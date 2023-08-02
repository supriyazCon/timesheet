import React, { useState } from 'react';
import { Grid } from '@mui/material';
import SidebarNav from '../Nav/SidebarNav';
import TopNav from '../Nav/TopNav';
import RoutePaths from '../../Routes/RoutePaths';
import HoverNav from '../Nav/HoverNav';

function T1index() {
  const [hover, setHover] = useState(false);
  const handleHover = () => {
    setHover(!hover);
  };
  return (
    <>
      <TopNav />
      <HoverNav hover={hover} setHover={setHover} />
      <Grid container style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={0.8}>
              <SidebarNav handleHover={handleHover} />
            </Grid>
            <Grid item xs={11.2} sx={{ padding: '0.5rem', width: '100%' }}>
              <RoutePaths />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default T1index;
