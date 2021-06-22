import { combineReducers } from 'redux';

const status = {FETCHING: "FETCHING", FETCHING_COMPLETE: "FETCHING_COMPLETE", ERROR: "ERROR"};

const initOperationReducer = () => {
  const opStatus = (state = status.FETCHING, action) => {
    switch(action.type) {
      case "REQUEST_DATA":
        return status.FETCHING;
      case "REQUEST_DATA_COMPLETE":
        return status.FETCHING_COMPLETE;
      case "ERROR_OCURRED":
        return status.ERROR;
      default:
        return state;
    }
  }

  const operations = (state = [], action) => {
    switch(action.type) {
      case "REQUEST_DATA":
      case "ERROR_OCURRED":
        return [];
      case "REQUEST_DATA_COMPLETE":
        return action.items;
      case "DELETE_ITEM": 
        const deleteIndex = state.findIndex(i => i.id === action.id)
        return state.filter((i, index) => deleteIndex !== index);
      default:
        return state;
    }
  }

  const errors = (state = [], action) => {
    switch(action.type) {
      case "REQUEST_DATA":
      case "REQUEST_DATA_COMPLETE":
      case "DELETE_ITEM":
        return [];
      case "ERROR_OCURRED":
        return action.errors;
      default:
        return state;
    }
  }

  return combineReducers({
    opStatus,
    operations,
    errors
  });
}

const operations = initOperationReducer();

export default operations;
