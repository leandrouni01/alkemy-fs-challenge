import axiosService from 'services/AxiosService';
import { extractApiErrors } from './index';
const { pbAxios } = axiosService;

export const fetchOperations = () => dispatch => {
  dispatch({type: "REQUEST_DATA"});
  return pbAxios.get('/operations')
  .then((res)=> {
    dispatch({type: "REQUEST_DATA_COMPLETE", items: res.data});
  })
  .catch((err)=> {
    dispatch({type: "ERROR_OCURRED",errors: extractApiErrors(err)});
  })
}

export const deleteOperation = (id) => dispatch => {
  return pbAxios.delete('/operations/'+id)
  .then((res)=> {
    dispatch({type: "DELETE_ITEM", id});
  })
  .catch((err)=> {
    dispatch({type: "ERROR_OCURRED",errors: extractApiErrors(err)});
  })
}

export const createOperation = (operationData, callback) =>  {
  return pbAxios.post('/operations', operationData)
  .then(res =>  res.data)
  .catch(error => Promise.reject(extractApiErrors(error)))
  .finally(()=> {
    if(callback && typeof callback == "function") callback();
  });
}

export const editOperation = (operationData, callback) => dispatch => {
  dispatch({type: "UPDATE_OPERATION"})
  pbAxios.patch('/operations/' + operationData.id, operationData)
  .then((res) => {
    dispatch({type: "UPDATE_OPERATION_COMPLETE", item: res.data});
  })
  .catch((error) => {
    dispatch({type: "ERROR_OCURRED",errors: extractApiErrors(error)});
  })
  .finally(()=> {
    if(callback && typeof callback == "function") callback();
  })
}

export const fetchOperationById = id => dispatch =>{
  dispatch({type: "REQUEST_OPERATION"})
  return pbAxios.get('/operations/' + id)
  .then((res) => {
    dispatch({type: "REQUEST_OPERATION_COMPLETE", item: res.data[0]});
  })
  .catch((error) => {
    dispatch({type: "ERROR_OCURRED",errors: extractApiErrors(error)});
  })
}

export const verifyOperationOwner = id => {
  return pbAxios.get('/operations/' + id + "/verify")
  .then((res) => {
    return res;
  })
  .catch((error) => {
    return Promise.reject(extractApiErrors(error));
  })
}

export const fetchCategories = _=> {
  return pbAxios.get('/categories')
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    return Promise.reject(extractApiErrors(error));
  })
}
