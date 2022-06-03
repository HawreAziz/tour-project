import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signup, Signin, Home } from './pages/';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components';
import AddTour from './pages/AddTour';
import { useAppDispatch } from './hooks';
import { setUser } from './states/reducers/auth-reducer';
import localforage from 'localforage';
import { User } from '../types';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    localforage.getItem<User>("profile").then((user) => {
      if (typeof user == 'string') {
        user = JSON.parse(user)
        if (user) {
          dispatch(setUser(user));
        }
      }
    })
  }, [setUser]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addTour" element={<AddTour />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
