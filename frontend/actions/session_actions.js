import * as APISession from "../utils/session_api_utils";

export const RECEIVE_CURRENT_USER = "RECEIEVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIEVE_ERRORS";

export const receiveCurrentUser = (currentUser)=>{
  return{
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const receiveErrors = errors =>({
  type: RECEIVE_ERRORS,
  errors
});

export const login = user => dispatch => (
  APISession.login(user)
    .then(
      currentUser=> dispatch(receiveCurrentUser(currentUser)),
      errors=> dispatch(receiveErrors(errors)))
);

export const signup = newUser => dispatch => (
  APISession.signup(newUser)
    .then(
      currentUser=> dispatch(receiveCurrentUser(newUser)),
      errors=> dispatch(receiveErrors(errors.responseJSON)))
);

export const logout = () => (dispatch) =>(
  APISession.logout().then((user) => (dispatch(receiveCurrentUser(null))),
  (errors) => dispatch(receiveCurrentUser(errors.responseJSON)))
);
