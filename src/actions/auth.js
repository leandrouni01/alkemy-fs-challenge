import axiosService from 'services/AxiosService';

const { pbAxios } = axiosService;

export const registerUser = (registerData) => {
  return pbAxios
    .post('/users/register', registerData)
    .catch(error => Promise.reject(error))
}

export const loginUser = (loginData) => {
  return pbAxios
    .post('/users/login', loginData)
    .then(res => res.data)
    .catch(error => Promise.reject(error))
}

export const userAuthenticated = (decodedToken) => {
  return {
    type: 'USER_AUTHENTICATED',
    username: decodedToken.username || ''
  }
}