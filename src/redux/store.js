import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/Userslice";
import { carReducer } from "./slices/Gaadislice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cars: carReducer,
  },
});

export default store;
