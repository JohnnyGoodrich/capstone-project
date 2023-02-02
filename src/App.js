import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddFood from './components/AddFood';
import Main from './components/Main';

function App() {
  return (
    <div className='main'>
      <div className='app'>
        <Routes>
          <Route path="/newfood" element={<AddFood />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
