import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getClient = createAsyncThunk('getClient', async () => {
  const response = await axios.get(`http://10.235.3.8:8021/api/client`);
  return response?.data;
});

const getClientSlice = createSlice({
  name: 'getClientSlice',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClient.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { actions: getClientActions, reducer: getClientReducer, selectors: getClientSelectors } = getClientSlice;


export const getBillingMethod = createAsyncThunk('getBillingMethod', async () => {
  const response = await axios.get(`http://10.235.3.8:8021/api/billingmethod`);
  return response?.data;
});

const getBillingMethodSlice = createSlice({
  name: 'getBillingMethodSlice',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBillingMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBillingMethod.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getBillingMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { actions: getBillingMethodActions, reducer: getBillingMethodReducer, selectors: getBillingMethodSelectors } = getBillingMethodSlice;


export const getCurrency = createAsyncThunk('getCurrency', async () => {
  const response = await axios.get(`http://10.235.3.8:8021/api/currency`);
  return response?.data;
});

const getCurrencySlice = createSlice({
  name: 'getCurrencySlice',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrency.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrency.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCurrency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { actions: getCurrencyActions, reducer: getCurrencyReducer, selectors: getCurrencySelectors } = getCurrencySlice;

export const addClient = createAsyncThunk('addClient', async (data) => {

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
  };

  const response = await fetch('http://10.235.3.8:8021/api/client', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  console.log(response)
  const resData = response.ok ? await response.json() : null
  return resData
});

const addClientSlice = createSlice({
  name: 'addClientSlice',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { actions: addClientActions, reducer: addClientReducer, selectors: addClientSelectors } = addClientSlice;

export const editClient = createAsyncThunk('editClient', async (data) => {
  const { clientId, ...rest } = data; // Exclude headers from the payload
  // console.log('id', id);
  const response = await axios.put(`http://10.235.3.8:8021/api/client/${clientId}`, rest);
  // console.log(response);
  return response.data;
});

const editClientSlice = createSlice({
  name: 'editClientSlice',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(editClient.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(editClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});


export const {
  actions: editClientActions,
  reducer: editClientReducer,
  selectors: editClientSelectors
} = editClientSlice;

export const deleteClient = createAsyncThunk('deleteClient', async (clientId) => {
  // console.log('post', id);
  const response = await axios.delete(`http://10.235.3.8:8021/api/client/${clientId}`);
  // console.log('delete',response.data)
  return response.data;
});

const deleteClientSlice = createSlice({
  name: 'deleteClientSlice',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  actions: deleteClientActions,
  reducer: deleteClientReducer,
  selectors: deleteClientSelectors
} = deleteClientSlice;