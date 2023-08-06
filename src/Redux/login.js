import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../Routes/Paths';


export const loginSuccess = createAsyncThunk('loginSuccess', async (data) => {
  console.log(data, "data")


  console.log("tast")
  const response = await fetch('http://10.235.3.8:8021/api/auth/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  let snackbarMessage;
  const resData = await response.json();
  console.log(resData, "resData")
  if (response.status === 200) {
    alert("Logged in Successfully!!")
  } else {

    console.log("error")
  }
});

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
    logOut(state, action) {
      state.isloggedIn = false;
      state.token = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSuccess.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginSuccess.fulfilled, (state, action) => {
        state.data = action.payload;
        state.token = action.payload?.jwtToken;
        state.loading = false;
        state.error = null;
        state.isloggedIn = true;
      })
      .addCase(loginSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { actions: loginSuccessActions, reducer: loginSuccessReducer, selectors: loginSuccessSelectors } = loginSuccessSlice;




