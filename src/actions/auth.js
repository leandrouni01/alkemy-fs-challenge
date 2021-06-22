import axiosService from 'services/AxiosService';
import { extractApiErrors } from './index';
const { pbAxios } = axiosService;


export const registerUser = (registerData) => {
  return pbAxios
    .post('/users/register', registerData)
    .catch(error => Promise.reject(extractApiErrors(error)))
}

export const loginUser = (loginData) => {
  return pbAxios
    .post('/users/login', loginData)
    .then(res => res.data.token)
    .catch(error => Promise.reject(extractApiErrors(error)))
}

export const userAuthenticated = (decodedToken) => {
  return {
    type: 'USER_AUTHENTICATED',
    username: decodedToken.username || ''
  }
}