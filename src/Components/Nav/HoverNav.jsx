import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { ROUTES } from '../../Routes/Paths';
import './HoverNav.scss';

function HoverNav({ hover, setHover }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [timeSheets, setTimeSheets] = useState(false);
  const [Jobs, setJobs] = useState(false);
  const handleClickOpen = () => {
    setOpen(!open);
  };
  const handleClickTimeSheets = () => {
    setHover(!hover);
    setTimeSheets(!timeSheets);
    navigate(ROUTES.TIMESHEETS);
  };
  const handleClickJobs = () => {
    setJobs(!Jobs);
  };
  const handleJobs = () => {
    setHover(!hover);
    navigate(ROUTES.JOBS);
  };
  const handleClients = () => {
    setHover(!hover);
    navigate(ROUTES.CLIENTS);
  };
  const handleProjects = () => {
    setHover(!hover);
    navigate(ROUTES.PROJECTS);
  };
  return (
    <Box className={hover ? 'sideBar' : 'closeSidebar'}>
      <List component="nav">
        <ListItemButton onClick={handleClickOpen}>
          <ListItemText primary="Time Logs" />
        </ListItemButton>
        <Collapse in={open}>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="List View" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Calendar View" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleClickTimeSheets}>
          <ListItemText primary="Timesheets" />
        </ListItemButton>
        <ListItemButton onClick={handleClickJobs}>
          <ListItemText primary="Projects/Jobs" />
        </ListItemButton>
        <Collapse in={Jobs}>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={handleJobs}>
              <ListItemText primary="Jobs" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={handleProjects}>
              <ListItemText primary="Projects" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={handleClients}>
              <ListItemText primary="Clients" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}

export default HoverNav;
