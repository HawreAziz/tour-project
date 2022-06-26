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
import { UserData } from '../types';
import TourDetail from './pages/TourDetail';
import Dashboard from './pages/Dashboard';
import EditTour from './pages/EditTour';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    localforage.getItem<UserData>("profile").then((user) => {
      if (typeof user == 'string') {
        user = JSON.parse(user) as UserData;
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
          <Route path="/addTour" element={
            <PrivateRoute>
              <AddTour />
            </PrivateRoute>} />
          <Route path="/tourDetail/:id" element={<TourDetail />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>} />
          <Route path="/edittour" element={
            <PrivateRoute>
              <EditTour />
            </PrivateRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
