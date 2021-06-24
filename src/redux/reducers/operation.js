import { combineReducers } from 'redux';

const status = {FETCHING: "FETCHING", FETCHING_COMPLETE: "FETCHING_COMPLETE", ERROR: "ERROR"};

const initOperationReducer = () => {
  const opStatus = (state = status.FETCHING, action) => {
    switch(action.type) {
      case "UPDATE_OPERATION":
      case "REQUEST_OPERATION":
        return status.FETCHING;
      case "UPDATE_OPERATION_COMPLETE":
      case "REQUEST_OPERATION_COMPLETE":
        return status.FETCHING_COMPLETE;
      case "OPERATION_ERROR_OCURRED":
        return status.ERROR;
      default:
        return state;
    }
  }

  const operation = (state = {}, action) => {
    switch(action.type) {
      case "REQUEST_OPERATION":
        return {};
      case "UPDATE_OPERATION_COMPLETE":
      case "REQUEST_OPERATION_COMPLETE":
        return action.item;
      default:
        return state;
    }
  }

  const errors = (state = [], action) => {
    switch(action.type) {
      case "UPDATE_OPERATION":
      case "REQUEST_OPERATION":
      case "UPDATE_OPERATION_COMPLETE":
      case "REQUEST_OPERATION_COMPLETE":
        return [];
      case "OPERATION_ERROR_OCURRED":
        return action.errors;
      default:
        return state;
    }
  }

  return combineReducers({
    opStatus,
    operation,
    errors
  });
}

const operation = initOperationReducer();

export default operation;