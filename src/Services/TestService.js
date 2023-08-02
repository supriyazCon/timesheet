import { getData } from '../Utils/rest-services';

export const getApiData = () => getData('https://jsonplaceholder.typicode.com/posts');
