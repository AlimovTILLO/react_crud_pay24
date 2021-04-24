import { passportConstants } from '../constants';


export function passports(state = {}, action) {
    switch (action.type) {
        case passportConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case passportConstants.GETALL_SUCCESS:
            return {
                data: action.passports
            };
        case passportConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case passportConstants.DELETE_REQUEST:
            return {
                ...state,
                data: state.data.map(passport =>
                    passport.id === action.id
                        ? { ...passport, deleting: true }
                        : passport
                )
            };
        case passportConstants.DELETE_SUCCESS:
            return {
                data: state.data.filter(passport => passport.id !== action.id)
            };
        case passportConstants.DELETE_FAILURE:
            return {
                ...state,
                data: state.data.map(passport => {
                    if (passport.id === action.id) {
                        const { deleting, ...passportCopy } = passport;
                        return { ...passportCopy, deleteError: action.error };
                    }

                    return passport;
                })
            };
        case passportConstants.UPDATE_REQUEST:
            return {
                ...state,
                data: state.data.map(passport =>
                    passport.id === action.id
                        ? { ...passport, updating: true }
                        : passport
                )
            };
        case passportConstants.UPDATE_SUCCESS:
            return {
                ...state,
                data: state.data.map((passport) => {
                    if (passport.id === action.passport.id) {
                        return {
                            ...action.passport
                        }
                    }
                    return passport
                })
            };
        case passportConstants.UPDATE_FAILURE:
            return {
                ...state,
                data: state.data.map((passport) => {
                    if (passport.id === action.id) {
                        const { deleting, ...passportCopy } = passport;
                        return {
                            ...passportCopy, deleteError: action.error
                        };
                    }
                    return passport;
                })
            };
        default:
            return state
    }
}