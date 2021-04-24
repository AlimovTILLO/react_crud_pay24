import { passportConstants } from '../constants';
import { passportService } from '../services';

export const passportActions = {
    get,
    getAll,
    create,
    publicCreate,
    update,
    delete: _delete
};

function get(id) {
    return dispatch => {
        dispatch(request());

        passportService.getTour(id)
            .then(
                passport => dispatch(success(passport)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: passportConstants.GET_REQUEST } }
    function success(passport) { return { type: passportConstants.GET_SUCCESS, passport } }
    function failure(error) { return { type: passportConstants.GET_FAILURE, error } }
}

function getAll(data) {
    return dispatch => {
        dispatch(request());

        passportService.getAll(data)
            .then(
                passports => dispatch(success(passports)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: passportConstants.GETALL_REQUEST } }
    function success(passports) { return { type: passportConstants.GETALL_SUCCESS, passports } }
    function failure(error) { return { type: passportConstants.GETALL_FAILURE, error } }
}

function publicCreate(passport) {
    return dispatch => {
        dispatch(request(passport));
        passportService.publicCreate(passport)
            .then(
                passport => {
                    dispatch(success(passport));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(passport) { return { type: passportConstants.PUBLIC_CREATE_REQUEST, passport } }
    function success(passport) { return { type: passportConstants.PUBLIC_CREATE_SUCCESS, passport } }
    function failure(error) { return { type: passportConstants.PUBLIC_CREATE_FAILURE, error } }
}

function create(passport) {
    return dispatch => {
        dispatch(request(passport));
        passportService.create(passport)
            .then(
                passport => {
                    dispatch(success(passport));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(passport) { return { type: passportConstants.CREATE_REQUEST, passport } }
    function success(passport) { return { type: passportConstants.CREATE_SUCCESS, passport } }
    function failure(error) { return { type: passportConstants.CREATE_FAILURE, error } }
}


function update(passport, id) {
    return dispatch => {
        dispatch(request(passport));
        passportService.update(passport, id)
            .then(
                passport => {
                    dispatch(success(passport));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(passport) { return { type: passportConstants.UPDATE_REQUEST, passport } }
    function success(passport) { return { type: passportConstants.UPDATE_SUCCESS, passport } }
    function failure(error) { return { type: passportConstants.UPDATE_FAILURE, error } }
}


function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        passportService.delete(id)
            .then(
                id => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: passportConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: passportConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: passportConstants.DELETE_FAILURE, id, error } }
}