import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import { ROUTES } from '../../Routes/Paths'
import { COMPONENTS } from '../../Utils/Constants';
import RenderComponents from '../RenderComponents/RenderComponents';
import { addJob, editJob } from '../../Redux/jobs';
import { getProject } from '../../Redux/project';
import ReusableSnackbar from '../../common/ReusableSnackbar';

// const projects = [
//   { id: 1, name: 'Project 1' },
//   { id: 2, name: 'Project 2' },
//   { id: 3, name: 'Project 3' },
//   // Add more project objects as needed
// ];

function AddJob() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { JOBS } = ROUTES;
  const { TEXT_FIELD, SELECT_BOX, BUTTON, TYPOGRAPHY, ICON, DATEPICKER } = COMPONENTS;
  const [isUpdate, setIsUpdate] = useState(false);
  const [emptyPayload, setEmptyPayload] = useState({
    jobName: '',
    project: '',
    startDate: '',
    endDate: '',
    estimatedHours: 0,
    loggedHours: 0,
    status: '',
    users: [],
  });
  const [payload, setPayload] = useState({ ...emptyPayload });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const updatePayload = (pairs) => setPayload((prevPayload) => ({ ...prevPayload, ...pairs }));

  // Assuming that projectData and projects state are coming from the Redux store
  const projectData = useSelector(state => state.getProject.data)
  const addJobData = useSelector(state => state.addJob.data)
  const editJobData = useSelector(state => state.editJob?.data)
  const projects = projectData.map((el, ind) => ({ 'id': ind + 1, 'name': el.projectName }));



  const jobLabels = [
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'end'
      },
      isRequired: true,
      key: 'jobNameLabel',
      label: 'Job Name',
      columnWidth: 3
    },
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'end',
        marginTop: '0.8rem',
      },
      isRequired: true,
      key: 'projectLabel',
      label: 'Project',
      columnWidth: 3,
    },
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'end',
        marginTop: '0.8rem'
      },
      isRequired: true,
      key: 'startDateLabel',
      label: 'Start Date',
      columnWidth: 3
    },
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'end',
        marginTop: '0.8rem'
      },
      key: 'endDateLabel',
      label: 'End Date',
      columnWidth: 3
    },
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'end',
        marginTop: '0.8rem'
      },
      isRequired: true,
      key: 'estimatedHoursLabel',
      label: 'Estimated Hours',
      columnWidth: 3
    },
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'end',
        marginTop: '0.8rem'
      },
      key: 'loggedHoursLabel',
      label: 'Logged Hours',
      columnWidth: 3
    },
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'end',
        marginTop: '0.8rem'
      },
      isRequired: true,
      key: 'statusLabel',
      label: 'Status',
      columnWidth: 3
    },
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'end',
        marginTop: '0.8rem'
      },
      key: 'usersLabel',
      label: 'User(s)',
      columnWidth: 3
    }
  ];

  const jobInputs = [
    {
      control: TEXT_FIELD,
      key: 'jobName',
      variant: 'standard',
      label: 'Job Name',
      columnWidth: 6
    },
    {
      control: SELECT_BOX,
      select: true,
      groupStyle: { marginTop: '1rem' },
      key: 'project',
      variant: 'standard',
      label: 'Select Project',
      options: projects,
      isSelecteAllAllow: false,
      columnWidth: 6
    },
    {
      groupStyle: { marginTop: '1rem' },
      control: TEXT_FIELD,
      key: 'startDate',
      variant: 'standard',
      label: 'Start Date',
      columnWidth: 6
    },
    {
      groupStyle: { marginTop: '1rem' },
      control: TEXT_FIELD,
      key: 'endDate',
      variant: 'standard',
      label: 'End Date',
      columnWidth: 6
    },
    {
      groupStyle: { marginTop: '1rem' },
      control: TEXT_FIELD,
      key: 'estimatedHours',
      variant: 'standard',
      label: 'Estimated Hours',
      columnWidth: 6
    },
    {
      groupStyle: { marginTop: '1rem' },
      control: TEXT_FIELD,
      key: 'loggedHours',
      variant: 'standard',
      label: 'Logged Hours',
      columnWidth: 6
    },
    {
      groupStyle: { marginTop: '1rem' },
      control: TEXT_FIELD,
      key: 'status',
      variant: 'standard',
      label: 'Status',
      columnWidth: 6
    },
    {
      groupStyle: { marginTop: '1rem' },
      control: TEXT_FIELD,
      key: 'users',
      variant: 'standard',
      label: 'User(s)',
      columnWidth: 6
    }
  ];

  const actionButtons = [
    {
      control: BUTTON,
      groupStyle: { marginRight: '1rem' },
      btnTitle: 'Submit',
      handleClickButton: () => handleAddJob(),
      columnWidth: 0.8,
    },
    {
      control: BUTTON,
      btnTitle: 'Cancel',
      handleClickButton: () => null,
      columnWidth: 0.8,
    },
  ];

  const topComponents = [
    {
      control: ICON,
      iconName: <ArrowBackIosIcon />,
      color: 'primary',
      handleClickIcon: () => navigate('/jobs'),
      columnWidth: 0.5
    },
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start'
      },
      key: 'addJobLabel',
      label: 'Add Job',
      columnWidth: 1
    },
    {
      control: ICON,
      iconName: <CloseIcon />,
      groupStyle: { position: 'absolute', right: '1rem' },
      color: 'error',
      handleClickIcon: () => navigate('/jobs'),
      columnWidth: 0.5
    }
  ];

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleAddJob = () => {
    const data = payload;
    if (isUpdate) {
      dispatch(editJob(data));
    } else {
      dispatch(addJob(data));
    }
    setSnackbarOpen(true);
    updatePayload(emptyPayload)
    setTimeout(() => {
      navigate(JOBS);
    }, 2000);

  };

  const handleChangeData = (key, val, ind) => {
    if (key) {
      const updateFields = { [key]: val };
      if (key === 'estimatedHours' || key === 'loggedHours') {
        updateFields[key] = parseInt(val, 10);
      } else {
        updateFields[key] = val;
      }
      updatePayload({ ...updateFields });
    }
  };

  useEffect(() => {
    dispatch(getProject())
    if (location?.state) {
      updatePayload(location?.state);
      setIsUpdate(true);
    }
  }, [location?.state])

  let snackbarMessage;
  if (addJobData === null && editJobData === null) {
    snackbarMessage = 'Something went wrong. Please try again.';
  } else if (isUpdate && editJobData !== null) {
    snackbarMessage = 'Job updated successfully.';
  } else if (!isUpdate && addJobData !== null) {
    snackbarMessage = 'Job added successfully.';
  } else {
    snackbarMessage = 'Something went wrong. Please try again.';
  }


  return (
    <Grid container spacing={2}>
      <ReusableSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={addJobData == null && editJobData === null ? 'error' : 'success'}
        handleClose={handleSnackbarClose}
      />

      <Grid
        item
        xs={12}
        style={{
          backgroundColor: '#f9fafc',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderBottom: '1px solid #e9e9e9'
        }}
      >
        {topComponents?.map((comp, ind) => (
          <RenderComponents key={ind} metaData={comp} ind={ind} />
        ))}
      </Grid>
      <Grid item xs={12} style={{ height: '32rem', overflowY: 'scroll' }}>
        <Box style={{ padding: '1.5rem', backgroundColor: 'white' }}>
          <Grid container spacing={1}>
            <Grid item xs={12} style={{ paddingLeft: '0.8rem' }}>
              <RenderComponents
                metaData={{
                  control: TYPOGRAPHY,
                  label: 'Job',
                  labelStyle: { fontWeight: 'bold' }
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', whiteSpace: 'nowrap', }}>
              <Grid item xs={4} style={{ paddingLeft: '1.5rem' }}>
                {jobLabels?.map((comp, ind) => (
                  <RenderComponents key={ind} metaData={comp} ind={ind} />
                ))}
              </Grid>
              <Grid item xs={8}>
                {jobInputs?.map((comp, ind) => (
                  <RenderComponents
                    key={ind}
                    metaData={comp}
                    ind={ind}
                    payload={payload}
                    handleChange={handleChangeData}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: '#f9fafc',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9'
        }}
      >
        {actionButtons?.map((comp, ind) => (
          <RenderComponents key={ind} metaData={comp} ind={ind} />
        ))}
      </Grid>
    </Grid>
  );
}

export default AddJob;