import { ajaxCallBegin, ajaxCallSuccess, ajaxCallError } from "../ajaxStatus/actionCreators";
import { GET_USERS, POST_USER, GET_ROLES, SET_CHANGE_SUCCESS, SET_CHANGE_PENDING, SET_CHANGE_ERROR  } from './actionType';
import axios from 'axios';
import { apiURL } from '../../config/apiConfig'

const config = {
    headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('accessToken'))}` }
};

export function getUsers() {
    const action = function (dispatch) {
        dispatch(ajaxCallBegin);
        axios.get(`${apiURL}/Users/GetUsers`, config)
            .then(response => {
                dispatch({
                    type: GET_USERS,
                    payload: response.data
                })
                dispatch(ajaxCallSuccess());
            })
            .catch(error => {
                dispatch(ajaxCallError());
            })
    }
    return action;
}


export function postUser(data) {
    const action = function (dispatch) {
        dispatch(ajaxCallBegin())
        axios.post(`${apiURL}/Users/Add`, data, config)
            .then(response => {
                dispatch(ajaxCallSuccess());
                axios.get(`${apiURL}/Users/GetUsers`, config)
                    .then(response => {
                        dispatch({
                            type: GET_USERS,
                            payload: response.data
                        })
                        dispatch(ajaxCallSuccess());
                    })
                    .catch(error => {
                        dispatch(ajaxCallError());
                    })
            })
            .catch(error => {
                dispatch(ajaxCallError());
            })
    }
    return action;
}


export function postRole(role) {
    const action = function (dispatch) {
        dispatch(ajaxCallBegin())
        axios.post(`${apiURL}/Roles/SaveRole/${role}`, null, config)
            .then(response => {
                dispatch(ajaxCallSuccess());
                axios.get(`${apiURL}/Roles/GetRoles`, config)
                    .then(response => {
                        dispatch({
                            type: GET_ROLES,
                            payload: response.data
                        })
                        dispatch(ajaxCallSuccess());
                    })
                    .catch(error => {
                        dispatch(ajaxCallError());
                    })
            })
            .catch(error => {
                dispatch(ajaxCallError());
            })
    }
    return action;
}

export function changePassword(oldPassword, newPassword, confirmPassword) {
    var params = {
        "UserId": JSON.parse(sessionStorage.getItem('userId')),
        "OldPassword" : oldPassword,
        "NewPassword" : newPassword,
        "ConfirmPassword" : confirmPassword
      }
    const action = function (dispatch) {
        dispatch(ajaxCallBegin())
        dispatch({
            type: SET_CHANGE_PENDING
          })
        axios.post(`${apiURL}/Users/ChangePassword`, params, config)
            .then(response => {
                if(response.data.success)
                {
                  dispatch({
                    type: SET_CHANGE_SUCCESS,
                    payload: "Password Changed Succesfully"
                  })
                } else {
                  dispatch({
                    type: SET_CHANGE_ERROR,
                    payload: response.data.error
                  })
                }
                dispatch(ajaxCallSuccess());
            })
            .catch(error => {
                dispatch({
                    type: SET_CHANGE_ERROR,
                    payload: 'Reset problem try again',
                  })
                dispatch(ajaxCallError());
            })
    }
    return action;
}

export function deleteUser(userId) {
    const action = function (dispatch) {
        dispatch(ajaxCallBegin())
        axios.delete(`${apiURL}/Users/DeleteUser/${userId}`, config
        )
            .then(response => {
                axios.get(`${apiURL}/Users/GetUsers`, config
                )
                    .then(response => {
                        dispatch({
                            type: GET_USERS,
                            payload: response.data
                        })
                        dispatch(ajaxCallSuccess());
                    })
                    .catch(error => {
                        dispatch(ajaxCallError());
                    })
            })
            .catch(error => {
                dispatch(ajaxCallError());
            })
    }
    return action
}


export function getRolesList() {
    const action = function (dispatch) {
        dispatch(ajaxCallBegin())
        axios.get(`${apiURL}/Roles/GetRoles`, config)
            .then(response => {
                dispatch({
                    type: GET_ROLES,
                    payload: response.data
                })
                dispatch(ajaxCallSuccess());
            })
            .catch(error => {
                dispatch(ajaxCallError());
            })
    }
    return action
}