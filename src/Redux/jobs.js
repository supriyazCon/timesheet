import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getJob = createAsyncThunk('getJob', async () => {
  const response = await axios.get('http://10.235.3.8:8021/api/task');
  return response?.data;
});

const getJobSlice = createSlice({
  name: 'getJobSlice',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJob.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { actions: getJobActions, reducer: getJobReducer, selectors: getJobSelectors } = getJobSlice;

export const addJob = createAsyncThunk('addJob', async (data) => {
  // const data2 = {
  //   "jobName": "job1",
  //   "startDate": "08/07/2023",
  //   "endDate": "08/07/2023",
  //   "estimatedHours": 9,
  //   "loggedHours": 9,
  //   "status": "In Progress",
  //   "users": "user 1",
  //   "taskName": "suraj saroj"
  // }

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
  };
  const response = await fetch('http://10.235.3.8:8021/api/task', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  // console.log(response)
  const resData = response.ok ? await response.json() : null
  return resData

});

const addJobSlice = createSlice({
  name: 'addJobSlice',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { actions: addJobActions, reducer: addJobReducer, selectors: addJobSelectors } = addJobSlice;

export const editJob = createAsyncThunk('editJob', async (data) => {
  const { taskId, ...rest } = data; // Exclude headers from the payload
  // console.log('id', id);
  const response = await axios.put(`http://10.235.3.8:8021/api/task/${taskId}`, rest);
  // console.log(response);
  return response.data;
});

const editJobSlice = createSlice({
  name: 'editJobSlice',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(editJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { actions: editJobActions, reducer: editJobReducer, selectors: editJobSelectors } = editJobSlice;

export const deleteJob = createAsyncThunk('deleteJob', async (id) => {
  const response = await axios.delete(`http://10.235.3.8:8021/api/task/${id}`);
  return response.data;
});

const deleteJobSlice = createSlice({
  name: 'deleteJobSlice',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { actions: deleteJobActions, reducer: deleteJobReducer, selectors: deleteJobSelectors } = deleteJobSlice;