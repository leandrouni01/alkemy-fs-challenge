import React from 'react';
import { connect } from 'react-redux';
import { loginUser, userAuthenticated } from 'actions';
import jwt from 'jsonwebtoken';

const { createContext, useContext } = React;

const AuthContext = createContext(null);

const AuthBaseProvider = ({children, dispatch}) => {

  const isAuthenticated = () => {
    const token = getToken();
    return token ? decodeToken(token) : false;
  }

  const getToken = () => {
    return localStorage.getItem('bwm_token');
  }

  const decodeToken = token => {
    return jwt.decode(token);
  }

  const signOut = () => {
    localStorage.removeItem('bwm_token');
    dispatch({type: 'USER_SIGNED_OUT'});
  }

  const signIn = (token, loginData) => {
    if(token) {
      localStorage.setItem('bwm_token', token);
      const decodedToken = decodeToken(token);
      dispatch(userAuthenticated(decodedToken))
      return token;
    }
    return loginUser(loginData)
      .then(token => {
        localStorage.setItem('bwm_token', token);
        const decodedToken = decodeToken(token);
        dispatch(userAuthenticated(decodedToken))
        return token;
      })
  }

  const authApi = {
    signIn,
    signOut,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={authApi}>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthProvider = connect()(AuthBaseProvider);

export const useAuth = () => {
  return useContext(AuthContext);
}

export const withAuth = Component => props => (
  <AuthContext.Consumer>
    {authApi => <Component {...props} auth={authApi} /> }
  </AuthContext.Consumer>
)