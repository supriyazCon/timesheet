import GrainIcon from '@mui/icons-material/Grain';
import HomeIcon from '@mui/icons-material/Home';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CampaignIcon from '@mui/icons-material/Campaign';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import { ROUTES } from '../../Routes/Paths';

const { TIMESHEETS, DASHBOARD } = ROUTES;

const iconStyles = {
  color: '#ffebee',
  cursor: 'pointer'
};

export const SIDEBAR_MENU = [
  {
    title: 'Services',
    icon: <GrainIcon style={iconStyles} />,
    url: ''
  },
  {
    title: 'Home',
    icon: <HomeIcon style={iconStyles} />,
    url: DASHBOARD
  },
  {
    title: 'Self-service',
    icon: <PermIdentityIcon style={iconStyles} />,
    url: ''
  },
  {
    title: 'Attendance',
    icon: <EventAvailableIcon style={iconStyles} />,
    url: ''
  },
  {
    title: 'Time Tracker',
    icon: <AccessTimeIcon style={iconStyles} />,
    url: TIMESHEETS
  },
  {
    title: 'Announcements',
    icon: <CampaignIcon style={iconStyles} />,
    url: ''
  },
  {
    title: 'More',
    icon: <MoreHorizIcon style={iconStyles} />,
    url: ''
  },
  {
    title: 'Reports',
    icon: <PieChartOutlineIcon style={iconStyles} />,
    url: ''
  }
];
