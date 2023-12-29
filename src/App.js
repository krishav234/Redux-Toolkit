import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import UserList from "./pages/UserList";
import CreateUser from "./pages/CreateUser";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCar from "./pages/AddCar";
import CarList from "./pages/CarList";
import Google from "./components/Google";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Google />}/>
            <Route path="layout" element={<Layout />}>
              <Route path="createuser/:id" element={<CreateUser />} />
              <Route path="userlist" element={<UserList />} />
              <Route path="addcar/:id" element={<AddCar />} />
              <Route path="carlist" element={<CarList />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </Provider>
    </>
  );
};

export default App;
