import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';

import Header from 'components/shared/Header';

import  { Provider } from 'react-redux';
import { initStore } from './redux/store';
import { AuthProvider, useAuth } from "providers/AuthProvider";

const store = initStore();

const Providers = ({children}) => 
  <Provider store={store}>
    <AuthProvider>
        {children}
    </AuthProvider>
  </Provider>

const PBApp = () => {
  const authService = useAuth();

  useEffect(() => {
    authService.checkAuthState();
  }, [authService])

  return (
    <Router>
      <Header logout={authService.signOut} />
      <Routes />
    </Router>
  )
}

function App() {
  return (
    <Providers >
      <PBApp />
    </Providers>
  );
}

export default App;
