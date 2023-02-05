import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddFood from './components/AddFood';
import Main from './components/Main';
import EditFood from './components/EditFood';
import Auth from './components/Auth';
import AuthRegister from './components/AuthRegister';
import { useState } from 'react';
import { UserContext } from './data';

function App() {
  const { Provider: UserInfo } = UserContext

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <div className='main'>
      <div className='app'>

        <UserInfo value={{
          isAuthenticated,
          currentUser,
          setAuth: setIsAuthenticated,
          setUser: setCurrentUser
        }}>
          <Routes>
            <Route path="/newfood" element={<AddFood />} />
            <Route path="/" element={<Main />} />
            <Route path="/newfood/:id" element={<EditFood />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/register" element={<AuthRegister />} />
          </Routes>
        </UserInfo>
      </div>
    </div>
  );
}

export default App;
