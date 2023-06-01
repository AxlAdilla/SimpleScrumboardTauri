import React from "react";
import ReactDOM from "react-dom/client";
import App from './Pages/App';
import Create from './Pages/Create';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Auth from './Pages/Auth';
import SignUp from './Pages/SignUp';
import ForgetPassword from './Pages/ForgetPassword';
import './global.css';
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/login' element={<Auth />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/' element={<App />} />
        <Route path='/create/:id' element={<Create />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
