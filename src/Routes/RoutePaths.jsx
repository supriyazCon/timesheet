import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import AddClient from "../Components/Client/AddClient";
import ClientGrid from "../Components/Client/ClientGrid";
import Dashboard from "../Components/Dashboard/Dashboard";
import AddProject from "../Components/Project/AddProject";
import ProjectGrid from "../Components/Project/ProjectGrid";
import AddJob from "../Components/Jobs/AddJob";
import JobGrid from "../Components/Jobs/JobGrid";
import { ROUTES } from "./Paths";
import TimesheetGrid from "../Components/TimeSheets/TimesheetGrid";
import TimeLogGrid from "../Components/TimeLogs/TimeLogGrid";
import AddTimeLog from "../Components/TimeLogs/AddTimeLog";

function RoutePaths() {
  const {
    LOGIN,
    DASHBOARD,
    CLIENTS,
    ADD_CLIENT,
    PROJECTS,
    ADD_PROJECT,
    TIMELOGS,
    ADD_TIMELOG,
    TIMESHEETS,
    ADD_JOB,
    JOBS,
  } = ROUTES;
  const role = useSelector((state) => state.loginSuccess.role);

  return (
    <Routes>
      <>
        <Route path={DASHBOARD} element={<Dashboard />} />
        {role !== "GenericUser" && (
          <Route path={CLIENTS} element={<ClientGrid />} />
        )}
        {role !== "GenericUser" || role !== "ProjectManager" && (
          <Route path={ADD_CLIENT} element={<AddClient />} />
        )}
        {role !== "GenericUser" && (
          <Route path={PROJECTS} element={<ProjectGrid />} />
        )}
        {role !== "GenericUser" && ( 
          <Route path={ADD_PROJECT} element={<AddProject />} />
        )}
        {role !== "GenericUser" && (
          <Route path={ADD_JOB} element={<AddJob />} />
        )}
        {role !== "GenericUser" && <Route path={JOBS} element={<JobGrid />} />}
        <Route path={TIMELOGS} element={<TimeLogGrid />} />
        <Route path={ADD_TIMELOG} element={<AddTimeLog />} />
        <Route path={TIMESHEETS} element={<TimesheetGrid />} />
      </>
    </Routes>
  );
}

export default RoutePaths;
