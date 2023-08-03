import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProject = createAsyncThunk('getProject', async () => {
  const response = await axios.get(`http://10.235.3.8:8021/api/project`);
  return response?.data;
});

const getProjectSlice = createSlice({
  name: 'getProjectSlice',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  actions: getProjectActions,
  reducer: getProjectReducer,
  selectors: getProjectSelectors
} = getProjectSlice;

export const addProject = createAsyncThunk('addProject', async (data) => {
  console.log('post', data);

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
  };

  const response = await fetch(`http://10.235.3.8:8021/api/project`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });

  const resData = response.ok ? await response.json() : null
  return resData
});

const addProjectSlice = createSlice({
  name: 'addProjectSlice',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  actions: addProjectActions,
  reducer: addProjectReducer,
  selectors: addProjectSelectors
} = addProjectSlice;

export const editProject = createAsyncThunk('editProject', async (data) => {
  const { projectId, ...rest } = data;
  const response = await axios.put(`http://10.235.3.8:8021/api/project/${projectId}`, rest);
  // console.log('edit',response)
  return response.data;
});

const editProjectSlice = createSlice({
  name: 'editProjectSlice',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(editProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  actions: editProjectActions,
  reducer: editProjectReducer,
  selectors: editProjectSelectors
} = editProjectSlice;

export const deleteProject = createAsyncThunk('deleteProject', async (id) => {
  // const { id } = data;
  const response = await axios.delete(`http://10.235.3.8:8021/api/project/${id}`);
  return response.data;
});

const deleteProjectSlice = createSlice({
  name: 'deleteProjectSlice',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  actions: deleteProjectActions,
  reducer: deleteProjectReducer,
  selectors: deleteProjectSelectors
} = deleteProjectSlice;
