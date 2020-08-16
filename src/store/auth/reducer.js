import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SET_MENU, SET_LOGOUT, 
    SET_FORGET_PENDING, SET_FORGET_SUCCESS, SET_FORGET_ERROR,
    SET_RESET_PENDING, SET_RESET_SUCCESS, SET_RESET_ERROR } from './actionType'

let user = JSON.parse(sessionStorage.getItem('user'));
let userId = JSON.parse(sessionStorage.getItem('userId'));
let accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
let tokenType = JSON.parse(sessionStorage.getItem('tokenType'));

export const initialState = {
    isLoginSuccess: false,
    loginError: null,
    forgetError: null,
    resetError: null,
    forgetSuccesMsg: null,
    user,
    accessToken,
    tokenType,
    userId,
    currentMenu: 'scenario',
}

export default function auth (state = initialState, action = {}) {
    switch (action.type) {
        case SET_FORGET_PENDING:
            return Object.assign({}, state, {
                isLoginSuccess: false,
                forgetError: null,
            });
        
        case SET_FORGET_SUCCESS:
            return Object.assign({}, state, {
                isLoginSuccess: true,
                forgetError: action.payload,
            });
        
        case SET_FORGET_ERROR:
            return Object.assign({}, state, {
                isLoginSuccess: false,
                forgetError: action.payload
            });
        case SET_RESET_PENDING:
            return Object.assign({}, state, {
                isLoginSuccess: false,
                resetError: null,
            });
        
        case SET_RESET_SUCCESS:
            return Object.assign({}, state, {
                isLoginSuccess: true,
                resetError: action.payload,
            });
        
        case SET_RESET_ERROR:
            return Object.assign({}, state, {
                isLoginSuccess: false,
                resetError: action.payload
            });

        case SET_LOGIN_PENDING:
            return Object.assign({}, state, {
                isLoginSuccess: false,
                loginError: null,
            });
        
        case SET_LOGIN_SUCCESS:
            const { email, access_token, token_type, userId } = action.payload
            return Object.assign({}, state, {
                isLoginSuccess: true,
                user: email,
                accessToken: access_token,
                tokenType: token_type,
                userId,
            });
        
        case SET_LOGIN_ERROR:
            return Object.assign({}, state, {
                isLoginSuccess: false,
                loginError: action.loginError
            });
        case SET_LOGOUT: 
            return Object.assign({}, state, {
                initialState
            });

        case SET_MENU: 
            return Object.assign({}, state, {
                currentMenu: action.menuItem
            });
        default:
            return state;
    }
}