import { authenticationConstants } from '../constants';

let token = JSON.parse(localStorage.getItem('token'));
const initialState = token ? { loggedIn: true, token } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authenticationConstants.LOGIN_REQUEST:
      return {
        loggingInLoad: true
      };
    case authenticationConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        token: action.user.token,
        data: action.user
      };
    case authenticationConstants.LOGIN_FAILURE:
      return {};
    case authenticationConstants.LOGOUT:
      return {};
    case authenticationConstants.GET_REQUEST:
      return {
        loading: true
      };
    case authenticationConstants.GET_SUCCESS:
      return {
        loggedIn: true,
        token: state.token,
        data: action.user
      };
    case authenticationConstants.GET_FAILURE:
      return {
        error: action.error
      };
    case authenticationConstants.UPDATE_REQUEST:
      return state
    case authenticationConstants.UPDATE_SUCCESS:
      return {
        ...state,
        data: action.user
      };
    case authenticationConstants.UPDATE_FAILURE:
      return state
    default:
      return state
  }
}