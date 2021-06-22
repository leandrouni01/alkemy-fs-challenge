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