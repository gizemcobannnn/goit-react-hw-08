import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const initialState ={
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error:null
}

const API_URL="https://connections-api.goit.global";

export const login = createAsyncThunk("auth/login",async({username,password},{ rejectWithValue })=>{
  try{
    const response = await axios.post(`${API_URL}/users/login`,{username,password});
    return response.data;
  }
  catch(error){
    return rejectWithValue(error.response?.data || "Login failed");
  }
});

export const register = createAsyncThunk("auth/register",async({username,email,password},{rejectWithValue})=>{
  try{
    const response = await axios.post(`${API_URL}/users/signup`, { username, email, password });
    return response.data;
  }
  catch(error){
    return rejectWithValue(error.response?.data || "Login failed");
  }
})

export const logoutUser = createAsyncThunk("auth/logout",async(_,{rejectWithValue})=>{
  try{
    const response = await axios.post(`${API_URL}/users/logout`, null);
    return response.data;
  }
  catch(error){
    return rejectWithValue(error.response?.data || "Logout failed");
  }
})

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth; // Token state'ten alınıyor
    if (!token) return rejectWithValue("No token available");

    try {
      const response = await axios.get(`${API_URL}/users/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Refresh failed");
    }
  }
);

const authSlice = createSlice({
  name:"auth",
  initialState,
  extraReducers:(builder)=>{
    builder
          // Login Reducers
          .addCase(login.pending, (state) => {
            state.error = null;
            state.isLoggedIn = false;
            state.isRefreshing = false;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.error = null;
          })
          .addCase(login.rejected, (state, action) => {
            state.error = action.payload || "Login failed";
            state.isLoggedIn = false;
          })
    
          // Register Reducers
          .addCase(register.pending, (state) => {
            state.error = null;
          })
          .addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.error = null;
          })
          .addCase(register.rejected, (state, action) => {
            state.error = action.payload || "Registration failed";
          })
    
          // Logout Reducers
          .addCase(logoutUser.fulfilled, (state) => {
            state.user = { name: null, email: null };
            state.token = null;
            state.isLoggedIn = false;
            state.error = null;
          })
          .addCase(logoutUser.rejected, (state, action) => {
            state.error = action.payload || "Logout failed";
          })
    
          // Refresh Reducers
          .addCase(refreshUser.pending, (state) => {
            state.isRefreshing = true;
          })
          .addCase(refreshUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isRefreshing = false;
          })
          .addCase(refreshUser.rejected, (state, action) => {
            state.error = action.payload || "Refresh failed";
            state.isRefreshing = false;
          });

  }
})

export default authSlice.reducer;