import React from "react";
// import Navigation from "./components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import UserList from "./pages/UserList";
import CreateUser from "./pages/CreateUser";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
              <Route path="/" element={<UserList/>}/>
              <Route path="createuser" element={<CreateUser/>}/>
             </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;

