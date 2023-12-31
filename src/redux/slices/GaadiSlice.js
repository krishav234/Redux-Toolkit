import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCarData = createAsyncThunk("getCar", () => {
  return fetch("http://localhost:3001/cars").then((res) => res.json());
});


export const postCarData = createAsyncThunk("postCar", (carFormData) => {
  return fetch("http://localhost:3001/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carFormData),
  }).then((res) => res.json());
});


export const getCarById = createAsyncThunk("getCarById", async (id) => {
  const response = await fetch(`http://localhost:3001/cars/${id}`);
  const data = await response.json();
  return data;
});


export const putCarData = createAsyncThunk(
  "putCarData",
  async ({ carFormData, id }) => {
    return fetch(`http://localhost:3001/cars/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carFormData),
    }).then((res) => res.json());
  }
);

export const deleteCarData = createAsyncThunk("deleteCarData", async (id) => {
  const response = await fetch(`http://localhost:3001/cars/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return { id, data };
});

const carSlice = createSlice({
  name: "cars",
  initialState: {
    loader: false,
    carData: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCarData.fulfilled, (state, action) => {
      state.carData = action.payload;
      state.loader = false;
    });
    builder.addCase(getCarData.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getCarData.rejected, (state, action) => {
      state.loader = false;
      state.error = action.error.message;
    });
  },
});

export const carReducer = carSlice.reducer;
