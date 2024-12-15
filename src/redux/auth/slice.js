import { createSlice } from "@reduxjs/toolkit"

export const initialState ={
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
}
export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{},
  extraReducers:{}
})
