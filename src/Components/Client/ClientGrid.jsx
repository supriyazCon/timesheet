import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { COMPONENTS } from '../../Utils/Constants';
import { CLIENTS_DATA } from '../../Utils/DataConstants';
import { ROUTES } from '../../Routes/Paths';
import MuiTable from '../MuiTable/MuiTable';
import NoDataFound from '../NoDataFound/NoDataFound';
import { deleteClient, getClient } from '../../Redux/clients';
import RenderComponents from '../RenderComponents/RenderComponents';
import ReusableSnackbar from '../../common/ReusableSnackbar';
import ReusableDialog from '../../common/ReusableDialog';


function ClientGrid() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const clientData = useSelector((state) => state.getClient.data);
  const dispatch = useDispatch();
  // const [clientData, setClientData] = useState([]);
  const { SELECT_BOX, BUTTON, ICON } = COMPONENTS;
  const { ADD_CLIENT } = ROUTES;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const deleteCLientError = useSelector(state => state.deleteClient.error)
  const [deleteId, setDeleteId] = useState(null)

  console.log('client', clientData)
  // Function to handle Snackbar close event
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  // console.log('error', addCLientError)
  const topComponents = [
    {
      control: SELECT_BOX,
      select: true,
      variant: 'standard',
      groupStyle: { paddingBottom: '0.5rem', marginBottom: '1rem' },
      key: 'clients',
      label: 'Clients',
      options: CLIENTS_DATA,
      isSelecteAllAllow: false,
      columnWidth: 2
    },
    {
      control: BUTTON,
      groupStyle: { position: 'absolute', right: '6rem', marginBottom: '1rem' },
      btnTitle: 'Add Client',
      handleClickButton: () => navigate(ADD_CLIENT),
      startIcon: <AddIcon />,
      columnWidth: 1.5
    }
  ];

  const columnData = [
    // { field: 'id', headerName: 'Id', width: 70 },
    { field: 'clientName', headerName: 'Client name', width: 130 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    // { field: 'currency', headerName: 'Currency', width: 100 },
    // { field: 'billingMethod', headerName: 'Billing Method', width: 130 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'fax', headerName: 'Fax', width: 150 },
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
              // groupStyle: { paddingTop: '0rem', marginLeft: '0.6rem' },
              handleClickIcon: () => handleEdit(params.row.clientId)
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
              handleClickIcon: () => handleDeleteClick(params.row.clientId)
            }}
          />
        </div>
      )
    }
  ];

  const handleEdit = (id) => {
    // console.log('navigateData', data);
    console.log('gridid', id)
    const tableData = clientData.find((item) => item.clientId === id);
    // console.log('tableData', tableData);
    navigate(ADD_CLIENT, { state: tableData });
  };

  const handleDeleteClick = (id) => {
    setDialogOpen(true);
    setDeleteId(id)
  };

  const handleConfirm = () => {
    dispatch(deleteClient(deleteId));
    setSnackbarOpen(true)
    dispatch(getClient());
    setDialogOpen(false); // Close the dialog after confirming delete
    setDeleteId(null)
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const getRowId = (data) => data?.clientId;

  useEffect(() => {
    dispatch(getClient());
    // console.log('delete', deleteId)
  }, [deleteId]);

  let snackbarMessage;
  if (deleteCLientError !== null) {
    snackbarMessage = 'Something went wrong. Please try again.';
  }
  else {
    snackbarMessage = 'Client deleted successfully.';
  }

  return (
    <Grid container spacing={2}>
      <ReusableSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={deleteCLientError !== null ? 'error' : 'success'}
        handleClose={handleSnackbarClose}
      />
      <ReusableDialog
        open={dialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message='Are you sure you want to delete this client?'
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
        {clientData?.length > 0 ? (
          <MuiTable columnsData={columnData} rowsData={clientData} getRowId={getRowId} />
        ) : (
          <NoDataFound message='No Clients found' />
        )}
      </Grid>
      {/* <Grid item xs={12} style={{ backgroundColor: '#ffffff', height: '100vh ' }}>
        <NoDataFound />
      </Grid> */}
    </Grid>
  );
}

export default ClientGrid;
