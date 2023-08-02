import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { COMPONENTS } from '../../Utils/Constants';
import { JOBS_DATA } from '../../Utils/DataConstants';
import { ROUTES } from '../../Routes/Paths';
import { getApiData } from '../../Services/TestService';
// import { getJobData, deleteJobData } from '../../Services/jobServices';
import MuiTable from '../MuiTable/MuiTable';
import NoDataFound from '../NoDataFound/NoDataFound';
import { deleteJob, getJob } from '../../Redux/jobs';
import RenderComponents from '../RenderComponents/RenderComponents';
import ReusableSnackbar from '../../common/ReusableSnackbar';
import ReusableDialog from '../../common/ReusableDialog';

function JobGrid() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const jobData = useSelector((state) => state.getJob.data);
  const dispatch = useDispatch();
  const { SELECT_BOX, BUTTON, ICON } = COMPONENTS;
  const { ADD_JOB } = ROUTES;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const deleteJobError = useSelector(state => state.deleteJob.error);
  const [deleteId, setDeleteId] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };


  const topComponents = [
    {
      control: SELECT_BOX,
      select: true,
      variant: 'standard',
      groupStyle: { paddingBottom: '0.5rem', marginBottom: '1rem' },
      key: 'jobs',
      label: 'Jobs',
      options: JOBS_DATA,
      isSelecteAllAllow: false,
      columnWidth: 2
    },
    {
      control: BUTTON,
      groupStyle: { position: 'absolute', right: '6rem', marginBottom: '1rem' },
      btnTitle: 'Add Job',
      handleClickButton: () => navigate(ADD_JOB),
      startIcon: <AddIcon />,
      columnWidth: 1.5
    }
  ];

  const columnData = [
    // { field: 'jobId', headerName: 'Id', width: 70 },
    { field: 'jobName', headerName: 'Job name', width: 130 },
    { field: 'startDate', headerName: 'Start Date', width: 130 },
    { field: 'endDate', headerName: 'End Date', width: 130 },
    { field: 'estimatedHours', headerName: 'Estimated Hours', width: 130 },
    { field: 'loggedHours', headerName: 'Logged Hours', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: () => (
        <div style={{ cursor: 'pointer' }}>
          <RenderComponents
            metaData={{
              control: ICON,
              iconName: <AddTaskIcon />,
              tooltipTitle: 'status'
              // groupStyle: { paddingTop: '0rem', marginLeft: '0.6rem' },
              // handleClickIcon: () => handleEdit(params.id)
            }}
          />
        </div>
      )
    },
    { field: 'users', headerName: 'User(s)', width: 130 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 50,
      renderCell: (params) => (
        <div style={{ cursor: 'pointer' }}>
          <RenderComponents
            metaData={{
              control: ICON,
              iconName: <EditIcon />,
              tooltipTitle: 'Update',
              handleClickIcon: () => handleEdit(params.row.id)
            }}
          />
        </div>
      )
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <div style={{ cursor: 'pointer' }}>
          <RenderComponents
            metaData={{
              control: ICON,
              iconName: <DeleteIcon />,
              tooltipTitle: 'Delete',
              handleClickIcon: () => handleDeleteClick(params.row.id)
            }}
          />
        </div>
      )
    }
  ];

  const handleEdit = (id) => {
    const tableData = jobData.find((item) => item.id === id);
    navigate(ADD_JOB, { state: tableData });
  };

  const handleDeleteClick = (id) => {
    setDialogOpen(true);
    setDeleteId(id);
  };

  const handleConfirm = () => {
    dispatch(deleteJob(deleteId));
    setSnackbarOpen(true);
    dispatch(getJob());
    setDialogOpen(false); // Close the dialog after confirming delete
    setDeleteId(null);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const getRowId = (data) => data?.id;

  useEffect(() => {
    dispatch(getJob());
  }, [deleteId]);

  let snackbarMessage;
  if (deleteJobError !== null) {
    snackbarMessage = 'Something went wrong. Please try again.';
  } else {
    snackbarMessage = 'Job deleted successfully.';
  }

  return (
    <Grid container spacing={2}>
      <ReusableSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={deleteJobError !== null ? 'error' : 'success'}
        handleClose={handleSnackbarClose}
      />
      <ReusableDialog
        open={dialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message='Are you sure you want to delete this job?'
      />
      <Grid
        item
        xs={12}
        style={{
          backgroundColor: '#f9fafc',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderBottom: '1px solid #e9e9e9',
          position: 'fixed',
          top: 0,
          height: '4rem',
          width: '100%',
          marginTop: '4rem'
        }}
      >
        {topComponents?.map((comp, ind) => (
          <RenderComponents key={ind} metaData={comp} ind={ind} />
        ))}
      </Grid>
      <Grid item xs={12} style={{ height: '100vh', marginTop: '5rem', backgroundColor: '#ffffff' }}>
        {jobData?.length > 0 ? (
          <MuiTable columnsData={columnData} rowsData={jobData} getRowId={getRowId} />
        ) : (
          <NoDataFound message='No Jobs found' />
        )}
      </Grid>
    </Grid>
  );
}

export default JobGrid;
