import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddFood from './components/AddFood';
import Main from './components/Main';
import EditFood from './components/EditFood';

function App() {
  return (
    <div className='main'>
      <div className='app'>
        <Routes>
          <Route path="/newfood" element={<AddFood />} />
          <Route path="/" element={<Main />} />
          <Route path="/newfood/:id" element={<EditFood />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
