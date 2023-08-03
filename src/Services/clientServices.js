import { getData, postData, putData, deleteData } from '../Utils/rest-services';
import { API } from '../Utils/apiList';

export const addClientData = (data) => postData(API.ADD_CLIENT_URL, data);

export const getClientData = () => getData(API.CLIENT_LIST_URL);

export const updateClientData = (id, data) => putData(`${API.UPDATE_CLIENT_URL}=${id}`, data);

export const deleteClientData = (id) => deleteData(`${API.DELETE_CLIENT_URL}=${id}`);
