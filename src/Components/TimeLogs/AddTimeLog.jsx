import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
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
import { addProject, editProject, getDeliveryManager, getProject, getProjectManager } from '../../Redux/project';
import ReusableSnackbar from '../../common/ReusableSnackbar';
import { getClient } from '../../Redux/clients';
import { getJob } from '../../Redux/jobs';

function AddTimeLog() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { TEXT_FIELD, SELECT_BOX, BUTTON, TYPOGRAPHY, ICON } = COMPONENTS;
  const { TIMELOGS } = ROUTES;
  const [isUpdate, setIsUpdate] = useState(false);
  const [emptyPayload, setEmptyPayload] = useState({
    projectName: '',
    taskName: '',
    description: '',
    totalHours: '',
    isActive: false,
    isDeleted: false,
    createdDate: new Date(),
    updatedDate: new Date(),
    createdBy: 1,
    updatedBy: 1
  });
  const [payload, setPayload] = useState({ ...emptyPayload });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const updatePayload = (pairs) => setPayload((prevPayload) => ({ ...prevPayload, ...pairs }));
  const addProjectData = useSelector((state) => state.addProject.data);
  const editProjectData = useSelector((state) => state.editProject.data);
  const projectData = useSelector(state => state.getProject.data);
  const jobData = useSelector(state => state.getJob.data);
  const deliveryManagerData = useSelector(state => state.getDeliveryManager.data);
  const projects = projectData.map((el, ind) => ({ 'id': el.projectName, 'name': el.projectName }));
  const jobs = jobData.map((el, ind) => ({ 'id': el.taskName, 'name': el.taskName }));
  const deliveryManagers = deliveryManagerData.map((el, ind) => ({ 'id': el.deliveryManagerId, 'name': el.name }));

  // console.log(projectManagerData, 'projectManagerdata')
  // console.log(clienttData, 'client Data')
  // console.log(deliveryManagerData, 'delivery manager Data')
  // console.log(addProjectData, 'Add Project Data')




  const validationSchema = yup.object().shape({
    projectName: yup.string().required("Project Name is required"),
    taskName: yup.string().required("clientId is required"),
    projectManagerId: yup.string().required("project manager is required"),
    deliveryManagerId: yup.string().required("delivery manager is required"),
    projectCost: yup.number().typeError("Project Cost must be a number").nullable(),
    rate: yup.number().typeError("rate must be a number").nullable(),
    description: yup.string().required("description Name is required"),
  });

  const contactSectionStyle = {
    // height: '25rem',
    overflowY: 'scroll',
    whiteSpace: 'nowrap'
  };


  const contactInputsStyle = {
    height: 'auto',
    overflowY: 'scroll',
    whiteSpace: 'nowrap'
  };


  const topComponents = [
    {
      control: ICON,
      iconName: <ArrowBackIosIcon />,
      color: 'primary',
      handleClickIcon: () => navigate(TIMELOGS),
      columnWidth: 0.5
    },
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start'
      },
      key: 'addTimeLogLabel',
      label: 'Add TimeLog',
      columnWidth: 1
    },
    {
      control: ICON,
      iconName: <CloseIcon />,
      groupStyle: { position: 'absolute', right: '1rem' },
      color: 'error',
      handleClickIcon: () => navigate(TIMELOGS),
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
        marginTop: '1rem'
      },
      key: 'TaskNameLabel',
      label: 'Task Name',
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
      key: 'totalHours',
      label: 'Total Hours',
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
      control: SELECT_BOX,
      select: true,
      variant: 'standard',
      groupStyle: { marginTop: '1rem' },
      key: 'projectName',
      label: 'Select Project',
      options: projects,
      isSelecteAllAllow: false,
      columnWidth: 6
    },
    {
      control: SELECT_BOX,
      select: true,
      variant: 'standard',
      groupStyle: { marginTop: '1rem' },
      key: 'taskName',
      label: 'Select Job',
      options: jobs,
      isSelecteAllAllow: false,
      columnWidth: 6
    },
    {
      control: TEXT_FIELD,
      groupStyle: { marginTop: '1rem' },
      key: 'totalHours',
      variant: 'standard',
      label: 'Total Hours',
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
      handleClickButton: () => navigate(TIMELOGS),
      columnWidth: 0.8
    }
  ];

  const isSubmitDisabled = !payload.projectName;


  const handleChangeData = (key, val, ind) => {
    if (key) {
      const updateFields = { [key]: val };
      updatePayload({ ...updateFields });
    }
  };


  const handleAddProject = async () => {
    const data = payload;


    try {
      await validationSchema.validate(data, { abortEarly: false });

      if (isUpdate) {
        dispatch(editProject(data));
      } else {
        dispatch(addProject(data));
      }
      setSnackbarOpen(true);
      updatePayload(emptyPayload);
      setTimeout(() => {
        navigate(TIMELOGS);
      }, 2000);
    } catch (error) {
      // Handle the validation error here
      if (error.inner) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setFormErrors(errors);
        console.log(errors, "errors")
      }
    }
  };

  useEffect(() => {
    dispatch(getProject())
    dispatch(getJob())
    dispatch(getDeliveryManager())
    if (location?.state) {
      updatePayload(location?.state);
      setIsUpdate(true);
    }
  }, [location?.state]);

  let snackbarMessage;
  if (addProjectData === null && editProjectData === null) {
    snackbarMessage = 'Something went wrong. Please try again!!!';
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
  // console.log(formErrors, "formError")
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
      <Grid item xs={12} style={{ height: '32rem', overflowY: 'scroll', whiteSpace: 'nowrap' }}>
        <Box style={{ padding: '1.5rem', backgroundColor: 'white', ...contactInputsStyle }}>
          <Grid container spacing={1}>
            <Grid item xs={12} style={{ paddingLeft: '0.8rem', ...contactSectionStyle }}>
              <RenderComponents
                metaData={{
                  control: TYPOGRAPHY,
                  label: 'TimeLog Configuration Details',
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
                    error={formErrors[comp.key]}
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
        {/* {console.log(formErrors, "formerror inside return")} */}
        {actionButtons?.map((comp, ind) => (
          <RenderComponents key={ind}
            metaData={{ ...comp, disabled: isSubmitDisabled }}
            ind={ind}

          />
        ))}
      </Grid>
    </Grid>
  );
}

export default AddTimeLog;
