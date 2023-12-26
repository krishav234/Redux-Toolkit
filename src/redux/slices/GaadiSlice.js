import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCarData = createAsyncThunk("getcar",()=>{
    return fetch("http://localhost:3001/cars").then((res)=>res.json())
  });

const carSlice = createSlice({
    name: "car",
    initialState: {
      
    },
    reducers: {},
    
  });

  export const carReducer = carSlice.reducer;