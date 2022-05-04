import React from 'react';
import '../styles/App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Profile from '../pages/Profile';
import Error from '../pages/Error';

const App = () => {
  return (
    <Router>
      {/* put navbar here */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </Router>
  );
};

export default App;
