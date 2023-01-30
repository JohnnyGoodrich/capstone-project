import './App.css';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import AddFood from './components/AddFood';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<AddFood />} />
      </Routes>  
    </main>
  );
}

export default App;
