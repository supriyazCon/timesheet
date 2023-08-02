import {
  PROJECTDETAILS,
  JOBDETAILS,
  JOBFILTER,
  CLIENTDETAILS,
  PROJECTFILTER,
  CLIENTFILTER,
  REFRESH,
} from "../constants/Constants";

export const setProjectDetails = (data) => ({
  type: PROJECTDETAILS,
  payload: data,
});
export const setJobDetails = (data) => ({
  type: JOBDETAILS,
  payload: data,
});

export const setClientDetails = (data) => ({
  type: CLIENTDETAILS,
  payload: data,
});

export const setProjectFilter = (data) => ({
  type: PROJECTFILTER,
  payload: data,
});

export const setJobFilter = (data) => ({
  type: JOBFILTER,
  payload: data,
});


export const setClientFilter = (data) => ({
  type: CLIENTFILTER,
  payload: data,
});

export const setRefresh = (data) =>({
  type: REFRESH,
  payload: data,
})
