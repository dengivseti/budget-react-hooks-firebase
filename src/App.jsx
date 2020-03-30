import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from './routes'
import { Navbar } from './components/Navbar'
import { ButtonAdd } from './components/ButtonAdd'
import { useAuth } from './hooks/auth.hook'
import { Loader } from './components/Loader'
import { AuthContext } from './context/authContext'
import { BudgetState } from './context/BudgetState'


function App() {
  const {login, logout, token, userId, expirationDate, ready} = useAuth()
  const isAuthenticated = !!token
  const router = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader/>
  }

  return (
      <AuthContext.Provider value={{
        login, logout, token, userId, expirationDate
      }}>
        <BudgetState userId={userId} token={token}>
            <BrowserRouter>
              {isAuthenticated && <Navbar/>}
              {isAuthenticated && <ButtonAdd/>}
              <div className="container">
                {router}
                
              </div>
            </BrowserRouter>
        </BudgetState>
      </AuthContext.Provider>
  );
}

export default App
