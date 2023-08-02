import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import RenderComponents from '../RenderComponents/RenderComponents';
import { CLIENTS_DATA, PROJECT_HEAD_DATA, PROJECT_MANAGER_DATA, USERS_DATA } from '../../Utils/DataConstants';
import { COMPONENTS } from '../../Utils/Constants';
import { ROUTES } from '../../Routes/Paths';
import { addProjectData, updateProjectData } from '../../Services/projectServices';
import { addProject, editProject } from '../../Redux/project';
import ReusableSnackbar from '../../common/ReusableSnackbar';

function AddProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { TEXT_FIELD, SELECT_BOX, BUTTON, TYPOGRAPHY, ICON } = COMPONENTS;
  const { PROJECTS } = ROUTES;
  const [isUpdate, setIsUpdate] = useState(false);
  const [emptyPayload, setEmptyPayload] = useState({
    projectName: '',
    clientName: '',
    projectCost: '',
    projectHead: '',
    rate: '',
    projectManager: '',
    projectUsers: '',
    description: '',
    isActive: false,
    isDeleted: false,
    createdDate: new Date(),
    updatedDate: new Date(),
    createdBy: 1,
    updatedBy: 1
  });
  const [payload, setPayload] = useState({ ...emptyPayload });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const updatePayload = (pairs) => setPayload((prevPayload) => ({ ...prevPayload, ...pairs }));
  const addProjectData = useSelector((state) => state.addProject.data);
  const editProjectData = useSelector((state) => state.editProject.data);

  const topComponents = [
    {
      control: ICON,
      iconName: <ArrowBackIosIcon />,
      color: 'primary',
      handleClickIcon: () => navigate(PROJECTS),
      columnWidth: 0.5
    },
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start'
      },
      key: 'addClientLabel',
      label: 'Add Project',
      columnWidth: 1
    },
    {
      control: ICON,
      iconName: <CloseIcon />,
      groupStyle: { position: 'absolute', right: '1rem' },
      color: 'error',
      handleClickIcon: () => navigate(PROJECTS),
      columnWidth: 0.5
    }
  ];

  const projectLabels = [
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'end'
      },
      isRequired: true,
      key: 'projectLabel',
      label: 'Project Name',
      columnWidth: 5
    },
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'end',
        marginTop: '0.5rem'
      },
      key: 'clientName',
      label: 'Client Name',
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
      key: 'projectCost',
      label: 'Project Cost',
      columnWidth: 3.5
    },
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'end',
        marginTop: '1rem'
      },
      key: 'projectHead',
      label: 'Project Head',
      columnWidth: 3.5
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
      key: 'rate',
      label: 'Rate',
      columnWidth: 5
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
      key: 'projectManager',
      label: 'Project Manager',
      columnWidth: 5
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
      key: 'projectUsers',
      label: 'Project Users',
      columnWidth: 3.5
    },
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'end',
        marginTop: '2rem'
      },
      key: 'description',
      label: 'Description',
      columnWidth: 3.5
    }
  ];

  const projectInputs = [
    {
      control: TEXT_FIELD,
      key: 'projectName',
      variant: 'standard',
      label: 'Project Name',
      columnWidth: 6
    },
    {
      control: SELECT_BOX,
      select: true,
      variant: 'standard',
      groupStyle: { marginTop: '1rem' },
      key: 'clientName',
      label: 'Client Name',
      options: CLIENTS_DATA,
      isSelecteAllAllow: false,
      columnWidth: 6
    },
    {
      control: TEXT_FIELD,
      groupStyle: { marginTop: '1rem' },
      key: 'projectCost',
      variant: 'standard',
      label: 'Project Cost',
      columnWidth: 6
    },
    {
      control: SELECT_BOX,
      select: true,
      variant: 'standard',
      groupStyle: { marginTop: '1rem' },
      key: 'projectHead',
      label: 'Project Head',
      options: PROJECT_HEAD_DATA,
      isSelecteAllAllow: false,
      columnWidth: 6
    },
    {
      control: TEXT_FIELD,
      groupStyle: { marginTop: '1rem' },
      key: 'rate',
      variant: 'standard',
      label: 'Rate',
      columnWidth: 6
    },
    {
      control: SELECT_BOX,
      select: true,
      variant: 'standard',
      groupStyle: { marginTop: '1rem' },
      key: 'projectManager',
      label: 'Project Manager',
      options: PROJECT_MANAGER_DATA,
      isSelecteAllAllow: false,
      columnWidth: 6
    },
    {
      control: SELECT_BOX,
      select: true,
      variant: 'standard',
      groupStyle: { marginTop: '1rem' },
      key: 'projectUsers',
      label: 'Project Users',
      options: USERS_DATA,
      isSelecteAllAllow: false,
      columnWidth: 6
    },
    {
      control: TEXT_FIELD,
      groupStyle: { marginTop: '1rem' },
      key: 'description',
      label: 'Description',
      variant: 'standard',
      isMultiline: true,
      textRows: 4,
      columnWidth: 6
    }
  ];

  const actionButtons = [
    {
      control: BUTTON,
      groupStyle: { marginRight: '1rem' },
      btnTitle: 'Submit',
      handleClickButton: () => handleAddProject(),
      columnWidth: 0.8
    },
    {
      control: BUTTON,
      // groupStyle: { marginRight: '1rem' },
      btnTitle: 'Cancel',
      handleClickButton: () => null,
      columnWidth: 0.8
    }
  ];

  const handleChangeData = (key, val, ind) => {
    if (key) {
      const updateFields = { [key]: val };
      updatePayload({ ...updateFields });
    }
  };


  const handleAddProject = async () => {
    const data = payload;
    if (isUpdate) {
      dispatch(editProject(data));
    } else {
      dispatch(addProject(data));
    }
    setSnackbarOpen(true);
    updatePayload(emptyPayload);
    setTimeout(() => {
      navigate(PROJECTS);
    }, 2000);
  };

  useEffect(() => {
    if (location?.state) {
      updatePayload(location?.state);
      setIsUpdate(true);
    }
  }, [location?.state]);

  let snackbarMessage;
  if (addProjectData === null && editProjectData === null) {
    snackbarMessage = 'Something went wrong. Please try again.';
  } else if (isUpdate && editProjectData !== null) {
    snackbarMessage = 'Project updated successfully.';
  } else if (!isUpdate && addProjectData !== null) {
    snackbarMessage = 'Project added successfully.';
  } else {
    snackbarMessage = 'Something went wrong. Please try again.';
  }

  // Function to handle Snackbar close event
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <ReusableSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={addProjectData === null && editProjectData === null ? 'error' : 'success'}
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
                  label: 'Project Configuration Details',
                  labelStyle: { fontWeight: 'bold' },
                  columnWidth: 6
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', whiteSpace: 'nowrap', }}>
              <Grid item xs={4} style={{ paddingLeft: '1.5rem' }}>
                {projectLabels?.map((comp, ind) => (
                  <RenderComponents key={ind} metaData={comp} ind={ind} />
                ))}
              </Grid>
              <Grid item xs={8}>
                {projectInputs?.map((comp, ind) => (
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

export default AddProject;
