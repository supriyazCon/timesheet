import { combineReducers } from '@reduxjs/toolkit';
import { addClientReducer, getClientReducer, editClientReducer, deleteClientReducer, getBillingMethodReducer, getCurrencyReducer } from './clients';
import { getProjectReducer, deleteProjectReducer, editProjectReducer, addProjectReducer, getProjectManagerReducer, getDeliveryManagerReducer } from './project';
import { getJobReducer, addJobReducer, editJobReducer, deleteJobReducer } from './jobs';
import { loginSuccessReducer } from './login';
import { getTimeLogReducer } from './timeLogs';


const rootReducer = combineReducers({
  getClient: getClientReducer,
  addClient: addClientReducer,
  editCLient: editClientReducer,
  deleteClient: deleteClientReducer,
  getProject: getProjectReducer,
  addProject: addProjectReducer,
  editProject: editProjectReducer,
  deleteProject: deleteProjectReducer,
  getJob: getJobReducer,
  addJob: addJobReducer,
  editJob: editJobReducer,
  deleteJob: deleteJobReducer,
  loginSuccess: loginSuccessReducer,
  getProjectManager: getProjectManagerReducer,
  getDeliveryManager: getDeliveryManagerReducer,
  getBillingMethod: getBillingMethodReducer,
  getCurrency: getCurrencyReducer,
  getTimeLog: getTimeLogReducer
});

export default rootReducer;
