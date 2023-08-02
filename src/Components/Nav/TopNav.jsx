import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ROUTES } from '../../Routes/Paths';
import { COMPONENTS } from '../../Utils/Constants';
import zoho from '../../Assets/zoho.png';
import RenderComponents from '../RenderComponents/RenderComponents';

function TopNav() {
  const { TEXT_FIELD, ICON } = COMPONENTS;
  const iconColor = grey[800];
  const icons = [
    {
      control: ICON,
      iconName: <AddCircleOutlineIcon />,
      tooltipTitle: 'Quick Add',
      // groupStyle: { paddingTop: '0rem', marginLeft: '0.6rem' },
      color: iconColor,
      handleClickIcon: () => alert('ADD')
    },
    {
      control: ICON,
      iconName: <NotificationsNoneIcon />,
      tooltipTitle: 'Notifications',
      // groupStyle: { paddingTop: '0rem', marginLeft: '0.6rem' },
      color: iconColor,
      handleClickIcon: () => alert('ADD')
    },
    {
      control: ICON,
      iconName: <AccountCircleIcon />,
      tooltipTitle: 'Profile',
      // groupStyle: { paddingTop: '0rem', marginLeft: '0.6rem' },
      color: iconColor,
      handleClickIcon: () => alert('ADD')
    }
  ];
  return (
    <AppBar
      elevation={0}
      position="static"
      style={{ borderBottom: '1px solid #e9e9e9', backgroundColor: 'white', height: '4rem' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ marginBottom: '1rem' }}>
          <img src={zoho} alt="zohoLogo" style={{ height: '3rem' }} />
          <Typography
            component={Link}
            to={ROUTES.DASHBOARD}
            variant="h5"
            style={{ color: 'black', textDecoration: 'none' }}
          >
            People
          </Typography>
          <RenderComponents
            metaData={{
              control: TEXT_FIELD,
              groupStyle: { display: 'block', marginLeft: 'auto', marginRight: 'auto' },
              key: 'searchBox',
              variant: 'outlined',
              label: 'Search Employee',
              endAdornmentIcon: <SearchIcon />,
              columnWidth: 3
            }}
          />
          {icons?.map((comp, ind) => (
            <RenderComponents key={ind} metaData={comp} ind={ind} />
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopNav;
