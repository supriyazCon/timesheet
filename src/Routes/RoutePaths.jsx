import { Routes, Route } from 'react-router-dom';
import AddClient from '../Components/Client/AddClient';
import ClientGrid from '../Components/Client/ClientGrid';
import Dashboard from '../Components/Dashboard/Dashboard';
import AddProject from '../Components/Project/AddProject';
import ProjectGrid from '../Components/Project/ProjectGrid';
import AddJob from '../Components/Jobs/AddJob';
import JobGrid from '../Components/Jobs/JobGrid';
import TimeSheets from '../Components/TimeSheets/TimeSheets';
import { ROUTES } from './Paths';

function RoutePaths() {
  const { DASHBOARD, CLIENTS, ADD_CLIENT, PROJECTS, ADD_PROJECT, TIMESHEETS, ADD_JOB, JOBS } = ROUTES;
  return (
    <Routes>
      <Route path={DASHBOARD} element={<Dashboard />} />
      <Route path={CLIENTS} element={<ClientGrid />} />
      <Route path={ADD_CLIENT} element={<AddClient />} />
      <Route path={PROJECTS} element={<ProjectGrid />} />
      <Route path={ADD_PROJECT} element={<AddProject />} />
      <Route path={TIMESHEETS} element={<TimeSheets />} />
      <Route path={ADD_JOB} element={<AddJob />} />
      <Route path={JOBS} element={<JobGrid />} />
    </Routes>
  );
}

export default RoutePaths;
