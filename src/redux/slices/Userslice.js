import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserData = createAsyncThunk("getUser", () => {
  return fetch("http://localhost:3001/users").then((res) => res.json());
});

export const postData = createAsyncThunk("postUser", (formData) => {
  return fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => res.json());
});

export const getUserById = createAsyncThunk("getUserById", async (id) => {
  const response = await fetch(`http://localhost:3001/users/${id}`);
  const data = await response.json();
  return data;
});

export const putData = createAsyncThunk("putData", async ({ formData, id }) => {
  return fetch(`http://localhost:3001/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => res.json());
});

export const deleteUserData = createAsyncThunk("deleteuser", async (id) => {
  const response = await fetch(`http://localhost:3001/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return { id, data };
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    loader: false,
    userData: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.loader = false;
    });
    builder.addCase(getUserData.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loader = false;
      state.error = action.error.message;
    });
  },
});

export const userReducer = userSlice.reducer;
