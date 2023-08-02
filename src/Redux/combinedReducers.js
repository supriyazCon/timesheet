import { combineReducers } from '@reduxjs/toolkit';
import { addClientReducer, getClientReducer, editClientReducer, deleteClientReducer } from './clients';
import { getProjectReducer, deleteProjectReducer, editProjectReducer, addProjectReducer } from './project';
import { getJobReducer , addJobReducer, editJobReducer, deleteJobReducer} from './jobs';

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
});

export default rootReducer;
