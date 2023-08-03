import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { COMPONENTS } from '../../Utils/Constants';
import { ROUTES } from '../../Routes/Paths';
import MuiTable from '../MuiTable/MuiTable';
import RenderComponents from '../RenderComponents/RenderComponents';
import { getProjectData, deleteProjectData } from '../../Services/projectServices';
import './ProjectGrid.scss';
import { deleteProject, getProject } from '../../Redux/project';
import NoDataFound from '../NoDataFound/NoDataFound';
import ReusableSnackbar from '../../common/ReusableSnackbar';
import ReusableDialog from '../../common/ReusableDialog';

function ProjectGrid() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const projectData = useSelector((state) => state.getProject.data);
  const dispatch = useDispatch();
  const { ADD_PROJECT } = ROUTES;
  const { SELECT_BOX, BUTTON, ICON } = COMPONENTS;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const deleteProjectError = useSelector((state) => state?.deleteProject?.error);
  const [deleteId, setDeleteId] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDeleteClick = (id) => {
    setDialogOpen(true);
    setDeleteId(id);
  };

  const handleConfirm = () => {
    dispatch(deleteProject(deleteId));
    setSnackbarOpen(true);
    dispatch(getProject());
    setDialogOpen(false);
    setDeleteId(null);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

const topComponents = [
    {
      control: SELECT_BOX,
      select: true,
      variant: 'standard',
      groupStyle: { paddingBottom: '0.5rem', marginBottom: '1rem' },
      key: 'projects',
      label: 'Projects',
      options: [],
      isSelecteAllAllow: false,
      columnWidth: 2
    },
    {
      control: ICON,
      key: 'user',
      iconTitle: 'User',
      groupStyle: { position: 'absolute', right: '21rem', marginBottom: '1rem' },
      columnWidth: 1
    },
    {
      control: ICON,
      key: 'department',
      iconTitle: 'Department',
      groupStyle: { position: 'absolute', right: '15rem', marginBottom: '1rem' },
      columnWidth: 1
    },
    {
      control: BUTTON,
      groupStyle: { position: 'absolute', right: '6rem', marginBottom: '1rem' },
      btnTitle: 'Add Project',
      handleClickButton: () => navigate(ADD_PROJECT),
      startIcon: <AddIcon />,
      columnWidth: 1.5
    }
  ];
  
  const columnData = [
    // { field: 'id', headerName: 'Id', width: 70 },
    { field: 'projectName', headerName: 'Project Name', width: 300 },
    { field: 'estimatedHours', headerName: 'Estimated Hours', width: 180 },
    { field: 'loggedHours', headerName: 'Logged Hours', width: 180 },
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
    { field: 'jobs', headerName: 'Jobs', width: 80 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 5,
      renderCell: (params) => (
        <div style={{ cursor: 'pointer' }}>
          <RenderComponents
            metaData={{
              control: ICON,
              iconName: <EditIcon />,
              tooltipTitle: 'Update',
              // groupStyle: { paddingTop: '0rem', marginLeft: '0.6rem' },
              handleClickIcon: () => handleEdit(params.row.projectId)
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
              // groupStyle: { paddingTop: '0rem', marginLeft: '0.6rem' },
              handleClickIcon: () => handleDeleteClick(params.row.projectId)
            }}
            />
        </div>
      )
    }
  ];

  const handleEdit = (id) => {
    const tableData = projectData.find((itm) => itm.projectId === id);
    navigate(ADD_PROJECT, { state: tableData });
  };

  const getRowId = (data) => data?.projectId;

  useEffect(() => {
    dispatch(getProject());
  }, [deleteId]);
  
  let snackbarMessage;
  if (deleteProjectError !== null) {
    snackbarMessage = 'Something went wrong. Please try again.';
  } else {
    snackbarMessage = 'Project deleted successfully.';
  }
  return (
    <Grid container spacing={2}>
      <ReusableSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={deleteProjectError !== null ? 'error' : 'success'}
        handleClose={handleSnackbarClose}
        />
      <ReusableDialog
        open={dialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message='Are you sure you want to delete this project?'
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
      <Grid item xs={12} style={{ height: '100vh ', marginTop: '5rem', backgroundColor: '#ffffff' }}>
        {projectData?.length > 0 ? (
          <MuiTable columnsData={columnData} rowsData={projectData} getRowId={getRowId} />
        ) : (
          <NoDataFound message='No Projects found' />
        )}
      </Grid>
    </Grid>
  );
}

export default ProjectGrid;
