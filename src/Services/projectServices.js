import { getData, postData, putData, deleteData } from '../Utils/rest-services';
import { API } from '../Utils/apiList';

export const addProjectData = (data) => postData(API.ADD_PROJECT_URL, data);

export const getProjectData = () => getData(API.PROJECT_LIST_URL);

export const updateProjectData = (id, data) => putData(`${API.UPDATE_PROJECT_URL}=${id}`, data);

export const deleteProjectData = (id) => deleteData(`${API.DELETE_PROJECT_URL}=${id}`);
