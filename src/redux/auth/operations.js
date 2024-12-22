import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL= 'https://connections-api.herokuapp.com'

export const registerUser = createAsyncThunk("auth/register",async()=>{
//post istegi , try…catch , catch bloğunda thunkAPI.rejectWithValue
})


export const loginUser = createAsyncThunk("auth/login",async()=>{
    
})

export const logoutUser = createAsyncThunk("auth/logout",async()=>{
    
})

export const refreshUser = createAsyncThunk("auth/refresh",async()=>{
    
})  