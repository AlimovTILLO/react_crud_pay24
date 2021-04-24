import { authenticationConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers';

export const authenticationActions = {
    login,
    logout,
    getCurrentUser
};

function login(username, password, from) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: authenticationConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: authenticationConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authenticationConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: authenticationConstants.LOGOUT };
}


function getCurrentUser(id) {
    return dispatch => {
        dispatch(request(id));

        userService.getCurrentUser(id)
            .then(
                user => dispatch(success(user)),
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: authenticationConstants.GET_REQUEST } }
    function success(user) { return { type: authenticationConstants.GET_SUCCESS, user } }
    function failure(error) { return { type: authenticationConstants.GET_FAILURE, error } }
}