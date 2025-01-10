import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const initialState ={
  user: {
    name: null,
    email: null,
    password:""
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error:null
}

const API_URL="https://connections-api.goit.global";

export const login = createAsyncThunk("auth/login",async({email,password},{dispatch, rejectWithValue })=>{
  try{
 
    const response = await axios.post(`${API_URL}/users/login`,{email,password});
    const token = response.data.token;
    dispatch(setToken(token))
    console.log(token)
    return response.data;
  }
  catch(error){
    return rejectWithValue(error.response?.data || "Login failed");
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/signup`, {
        name, email, password
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);


export const logoutUser = createAsyncThunk("auth/logout",async(_,{getState,rejectWithValue})=>{
  try{
    const { token } = getState().auth;
    const response = await axios.post(`${API_URL}/users/logout`, null, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`
  
      },});
    
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
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isLoggedIn = !!action.payload; // Token varsa giriş yapıldı
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
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
            state.isLoggedIn = false;
            state.error = null;
          })
          .addCase(register.rejected, (state, action) => {
            state.error = action.payload || "Registration failed";
            state.isLoggedIn = false;
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
          })
          .addCase('persist/REHYDRATE', (state, action) => {
            // Redux Persist yeniden yükleme işlemi için varsayılan davranış
            return action.payload ? { ...state, ...action.payload.auth } : state;
          });

  }
})
export const { setToken } = authSlice.actions;

export default authSlice.reducer;