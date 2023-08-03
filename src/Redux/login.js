import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const loginSuccess = createAsyncThunk('loginSuccess', async (data) => {

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
  };

  const response = await fetch('http://10.235.3.8:8021/api/auth/api/login', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  // console.log(response)
  const resData = response.ok ? await response.json() : null
  return resData
});

const loginFailure = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.isloggedIn = false;
  state.token = '';
};
const loginSuccessSlice = createSlice({
  name: 'loginSuccessSlice',
  initialState: {
    data: null,
    loading: false,
    error: null,
    isloggedIn: false,
    token: ""
  },
  reducers: {
    login(state, action) {
      state.isloggedIn = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSuccess.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginSuccess.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { actions: loginSuccessActions, reducer: loginSuccessReducer, selectors: loginSuccessSelectors } = loginSuccessSlice;




