import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { SIDEBAR_MENU } from './SidebarMenu';
import { isArray } from '../../Utils/Utils';
import './SidebarNav.scss';

function SidebarNav({ handleHover }) {
  // const { pathname } = useLocation();
  // const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);
  // const activeRootStyle = {
  //   backgroundColor: '#303056'
  // };
  // let isActiveRoot = false;
  // if (isArray(SIDEBAR_MENU)) {
  //   SIDEBAR_MENU?.map((childrenItem) => {
  //     console.log('matchRoot', match(childrenItem.url));
  //     if (match(childrenItem.url)) {
  //       isActiveRoot = true;
  //     }
  //     return null;
  //   });
  return (
    <Box className="wrapperBox">
      {isArray(SIDEBAR_MENU) &&
        SIDEBAR_MENU.map((itm) => (
          <List key={itm.title} component="nav">
            <ListItem
              className="reduceHeight"
              component={Link}
              to={itm.url}
              onClick={handleHover}
              // sx={{ ...(isActiveRoot && activeRootStyle) }}
            >
              <ListItemButton className="listItmBtn">
                <ListItemIcon sx={{ ml: 3 }}>{itm.icon}</ListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: '0.68rem', color: '#ffebee' }} primary={itm.title} />
              </ListItemButton>
            </ListItem>
          </List>
        ))}
    </Box>
  );
  // }
}

export default SidebarNav;
