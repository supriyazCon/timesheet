// import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import { COMPONENTS } from '../../Utils/Constants';
import RenderComponents from '../RenderComponents/RenderComponents';
// import { CLIENT_DETAILS } from '../../Redux/Constants';
import { addClientData, updateClientData } from '../../Services/clientServices';
import { ROUTES } from '../../Routes/Paths';
import { BILLING_METHOD, CURRENCIES } from '../../Utils/DataConstants';
import './AddClient.scss';
import { addClient, editClient, getBillingMethod, getCurrency } from '../../Redux/clients';
import ReusableSnackbar from '../../common/ReusableSnackbar';

function AddClient() {
  // const uniqueId = uuidv4();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const { TEXT_FIELD, SELECT_BOX, BUTTON, TYPOGRAPHY, ICON } = COMPONENTS;
  const { CLIENTS } = ROUTES;
  const [isUpdate, setIsUpdate] = useState(false);
  const [emptyPayload, setEmptyPayload] = useState({
    clientName: '',
    currencyId: '',
    billingMethodId: '',
    createdBy: 1,
    updatedBy: 1,
    // isActive: true,
    createdDate: new Date(),
    updatedDate: new Date(),
    emailId: '',
    firstName: '',
    lastName: '',
    phone: '',
    mobile: '',
    fax: ''
  });
  const [payload, setPayload] = useState({ ...emptyPayload });

  const updatePayload = (pairs) => setPayload((prevPayload) => ({ ...prevPayload, ...pairs }));

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState('');
  // const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const addClientError = useSelector(state => state.addClient.error)
  const addClientData = useSelector(state => state.addClient.data)
  const editClientData = useSelector(state => state.editClient?.data)
  const billingMethodData = useSelector(state => state.getBillingMethod.data);
  const billingMethods = billingMethodData.map((el, ind) => ({ 'id': el.billingMethodId, 'name': el.name }));
  const currencyData = useSelector(state => state.getCurrency.data);
  const currencies = currencyData.map((el, ind) => ({ 'id': el.currencyId, 'name': el.currencyCode }));

  // console.log(billingMethodData, "billingMethodData")
  // console.log(currencyData, "currencyData")

  const validationSchema = yup.object().shape({
    clientName: yup.string().required("Client Name is required"),
    currencyId: yup.string().required("Currency is required"),
    billingMethodId: yup.string().nullable(),
    emailId: yup
      .string()
      .email("Invalid email format")
      .test(
        "email-domain",
        "Invalid email domain",
        (value) => value == null || value.endsWith(".com") || value.endsWith(".co")
      ),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    phone: yup
      .string()
      .matches(/^\d{0,10}$/, "Phone must be a maximum of 10 digits")
      .nullable(),
    mobile: yup
      .string()
      .matches(/^\d{0,10}$/, "Mobile must be a maximum of 10 digits")
      .nullable(),
    fax: yup.number().typeError("Fax must be a number").nullable(),
  });



  // Function to handle Snackbar close event
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  // const handleActionDispatch = (type, data = []) => dispatch({ type, data });

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


  const clientLabels = [
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'end',
        whiteSPace: 'nowrap'
      },
      isRequired: true,
      key: 'clientLabel',
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
      isRequired: true,
      key: 'currencyLabel',
      label: 'Currency',
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
      key: 'billingMethodLabel',
      label: 'Billing Method',
      columnWidth: 3.5
    }
  ];

  const contactsLabels = [
    {
      control: TYPOGRAPHY,
      groupStyle: {
        height: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'end',
        marginBottom: '0.8rem'
      },
      key: 'emailIdLabel',
      label: 'Email Id',
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
      key: 'firstNameLabel',
      label: 'First Name',
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
      key: 'lastNameLabel',
      label: 'Last Name',
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
      key: 'phoneLabel',
      label: 'Phone',
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
      key: 'mobileLabel',
      label: 'Mobile',
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
      key: 'faxLabel',
      label: 'Fax',
      columnWidth: 3
    }
  ];

  const clientInputs = [
    {
      control: TEXT_FIELD,
      key: 'clientName',
      variant: 'standard',
      label: 'Client',
      columnWidth: 6
    },
    {
      control: SELECT_BOX,
      select: true,
      variant: 'standard',
      groupStyle: { marginTop: '1rem' },
      key: 'currencyId',
      label: 'currency',
      options: currencies,
      isSelecteAllAllow: false,
      columnWidth: 6
    },
    {
      control: SELECT_BOX,
      select: true,
      variant: 'standard',
      groupStyle: { marginTop: '1rem' },
      key: 'billingMethodId',
      label: 'Billing Method',
      options: billingMethods,
      isSelecteAllAllow: false,
      columnWidth: 6
    }
  ];

  const contactsInputs = [
    {
      control: TEXT_FIELD,
      // groupStyle: { marginTop: '1rem' },
      key: 'emailId',
      variant: 'standard',
      label: 'EmailId',
      columnWidth: 6
    },
    {
      control: TEXT_FIELD,
      groupStyle: { marginTop: '1rem' },
      key: 'firstName',
      variant: 'standard',
      label: 'First Name',
      columnWidth: 6
    },
    {
      control: TEXT_FIELD,
      groupStyle: { marginTop: '1rem' },
      key: 'lastName',
      variant: 'standard',
      label: 'Last Name',
      columnWidth: 6
    },
    {
      control: TEXT_FIELD,
      groupStyle: { marginTop: '1rem' },
      key: 'phone',
      variant: 'standard',
      label: 'Phone',
      columnWidth: 6,
      type: 'number'
    },
    {
      control: TEXT_FIELD,
      groupStyle: { marginTop: '1rem' },
      key: 'mobile',
      variant: 'standard',
      label: 'Mobile',
      columnWidth: 6,
      type: 'number'
    },
    {
      control: TEXT_FIELD,
      groupStyle: { marginTop: '1rem' },
      key: 'fax',
      variant: 'standard',
      label: 'Fax',
      columnWidth: 6,
      type: 'number'
    }
  ];

  // console.log('ccc',CURRENCIES.sort((a, b) => a.name.localeCompare(b.name)))
  const actionButtons = [
    {
      control: BUTTON,
      groupStyle: { marginRight: '1rem' },
      btnTitle: 'Submit',
      handleClickButton: () => handleAddClient(),
      columnWidth: 0.8
    },
    {
      control: BUTTON,
      // groupStyle: { marginRight: '1rem' },
      btnTitle: 'Cancel',
      handleClickButton: () => navigate(CLIENTS),
      columnWidth: 0.8
    }
  ];

  const topComponents = [
    {
      control: ICON,
      iconName: <ArrowBackIosIcon />,
      color: 'primary',
      handleClickIcon: () => navigate(CLIENTS),
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
      label: 'Add Client',
      columnWidth: 1
    },
    {
      control: ICON,
      iconName: <CloseIcon />,
      groupStyle: { position: 'absolute', right: '1rem' },
      color: 'error',
      handleClickIcon: () => navigate(CLIENTS),
      columnWidth: 0.5
    }
  ];

  const handleAddClient = async () => {
    const data = payload;

    try {
      await validationSchema.validate(data, { abortEarly: false });

      if (isUpdate) {
        dispatch(editClient(data));
      } else {
        dispatch(addClient(data));
      }

      setSnackbarOpen(true);
      updatePayload(emptyPayload);
      setFormErrors({}); // Clear form errors on successful submission

      setTimeout(() => {
        navigate(CLIENTS);
      }, 2000);
    } catch (error) {
      // Handle the validation error here
      if (error.inner) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setFormErrors(errors);
      }
    }
  };

  // console.log("Form Errors:", formErrors); // Log the formErrors to the console

  const isSubmitDisabled = !payload.clientName || !payload.currencyId;


  const handleChangeData = (key, val, ind) => {
    if (key) {
      const updateFields = { [key]: val };
      if (key === 'currencyId' || key === 'billingMethodId') {
        updateFields[key] = val.toString();
      }
      updatePayload({ ...updateFields });
    }
    // if (key) {
    //   const updateFields = { [key]: val };
    //   if (key === 'mobile') {
    //     updateFields.mobile = parseInt(val, 10);
    //   } else if (key === 'phone') {
    //     updateFields.phone = parseInt(val, 10);
    //   } else {
    //     updateFields[key] = val;
    //   }
    //   updatePayload({ ...updateFields });
    // }
  };

  useEffect(() => {
    // console.log('locationState', location?.state);
    dispatch(getCurrency())
    dispatch(getBillingMethod())
    if (location?.state) {
      updatePayload(location?.state);
      setIsUpdate(true);
    }
  }, [location?.state]);


  let snackbarMessage;
  if (addClientData === null && editClientData === null) {
    snackbarMessage = 'Something went wrong. Please try again.';
  } else if (isUpdate && editClientData !== null) {
    snackbarMessage = 'Client updated successfully.';
  } else if (!isUpdate && addClientData !== null) {
    snackbarMessage = 'Client added successfully.';
  } else {
    snackbarMessage = 'Client added successfully...';
  }


  return (
    <Grid container spacing={2}>
      <ReusableSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={addClientData === null && editClientData === null ? 'error' : 'success'}
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
                  label: 'Client',
                  labelStyle: { fontWeight: 'bold' }
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex' }}>
              <Grid item xs={4} style={{ paddingLeft: '1.5rem' }}>
                {clientLabels?.map((comp, ind) => (
                  <RenderComponents key={ind} metaData={comp} ind={ind} />
                ))}
              </Grid>
              <Grid item xs={8}>
                {clientInputs?.map((comp, ind) => (
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
          <Grid container spacing={1} mt={2}>
            <Grid item xs={12} style={{ paddingLeft: '0.8rem' }}>
              <RenderComponents
                metaData={{
                  control: TYPOGRAPHY,
                  label: 'Contacts',
                  labelStyle: { fontWeight: 'bold' }
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex' }}>
              <Grid item xs={4} style={{ paddingLeft: '1.5rem' }}>
                {contactsLabels?.map((comp, ind) => (
                  <RenderComponents key={ind} metaData={comp} ind={ind} />
                ))}
              </Grid>
              <Grid item xs={8}>
                {contactsInputs?.map((comp, ind) => (
                  <RenderComponents
                    key={ind}
                    metaData={{ ...comp }}
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
        {actionButtons?.map((comp, ind) => (
          <RenderComponents key={ind} metaData={{ ...comp, disabled: isSubmitDisabled }} // Pass the disabled prop to the button component
            ind={ind} />
        ))}
      </Grid>
    </Grid>
  );
}

export default AddClient;