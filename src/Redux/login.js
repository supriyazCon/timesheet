import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const loginSuccess = createAsyncThunk('loginSuccess', async (data) => {
  const response = await fetch('http://10.235.3.8:8021/api/auth/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  if (response.status === 200) {
    toast.success("Logged in Successfully!!")
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
    token: "",
    role:'GenericUser'
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




