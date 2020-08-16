import { GET_USERS, POST_USER, DELETE_USER, GET_ROLES, POST_ROLE, SET_CHANGE_SUCCESS, SET_CHANGE_PENDING, SET_CHANGE_ERROR } from './actionType'

export const intialState = {
    usersList: [],
    changePasswordError: null,
    isLoginSuccess: false,
}

export default function users(state = intialState, action = {}) {
    switch (action.type) {
        case SET_CHANGE_PENDING:
            return Object.assign({}, state, {
                isLoginSuccess: false,
                changePasswordError: null,
            });
        
        case SET_CHANGE_SUCCESS:
            return Object.assign({}, state, {
                isLoginSuccess: true,
                changePasswordError: action.payload,
            });
        
        case SET_CHANGE_ERROR:
            return Object.assign({}, state, {
                isLoginSuccess: false,
                changePasswordError: action.payload
            });

        case GET_USERS:
            const { email, access_token, token_type, userId } = action.payload
            return Object.assign({}, state, {
                usersList: action.payload.users
            });
        case POST_USER:
            return Object.assign({}, state, {
                ...state,
                addedId: ''
            });
        case DELETE_USER:
            return Object.assign({}, state, {
                ...state,
                addedId: ''
            });
        case GET_ROLES: {
            return Object.assign({}, state, {
                rolesList: action.payload.items
            });
        }
        case POST_ROLE:
            return Object.assign({}, state, {
                ...state,
                addedId: ''
            });
        default:
            return state;
    }
}
