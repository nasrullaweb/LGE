import { ajaxCallBegin, ajaxCallSuccess, ajaxCallError } from "../ajaxStatus/actionCreators";
import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SET_MENU, SET_LOGOUT, 
  SET_FORGET_PENDING, SET_FORGET_SUCCESS, SET_FORGET_ERROR,
  SET_RESET_PENDING, SET_RESET_SUCCESS, SET_RESET_ERROR } from './actionType'
import { apiURL } from '../../config/apiConfig'
import axios from 'axios'



export function login(email, password) {
  const action = function (dispatch) {
    var params = `grant_type=password&username=${email}&password=${password}`
    dispatch(ajaxCallBegin())
    dispatch({
      type: SET_LOGIN_PENDING
    })
    axios.post(`${apiURL}/token`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then(response => {
      sessionStorage.setItem('userId', JSON.stringify(response.data.userId));
      sessionStorage.setItem('accessToken', JSON.stringify(response.data.access_token));
      sessionStorage.setItem('tokenType', JSON.stringify(response.data.token_type));
      sessionStorage.setItem('user', JSON.stringify(response.data.email));
      sessionStorage.setItem('role', JSON.stringify(response.data.roles));
      localStorage.setItem('user', JSON.stringify(response.data.email));
      window.location = window.location.origin
      dispatch({
        type: SET_LOGIN_SUCCESS,
        payload: response.data
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
     
        dispatch({
          type: SET_LOGIN_ERROR,
          loginError: error.response ? error.response.data.error_description : 'Login Problem',
        })
      dispatch(ajaxCallError());
    })
  }
  return action
}

export function forgetPassword(email) {
  const action = function (dispatch) {
    var params = {
      "Email": email
    }
    dispatch(ajaxCallBegin())
    dispatch({
      type: SET_FORGET_PENDING
    })
    axios.post(`${apiURL}/Users/ForgotPassword`, params, {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(response => {
      if(response.data.success)
      {
        dispatch({
          type: SET_FORGET_SUCCESS,
          payload: "Email successfully sent"
        })
      } else {
        dispatch({
          type: SET_FORGET_ERROR,
          payload: response.data.error
        })
      }
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
     
        dispatch({
          type: SET_FORGET_ERROR,
          loginError: error.response ? error.response.data.error_description : 'Password not Sent',
        })
      dispatch(ajaxCallError());
    })
  }
  return action
}

export function resetPassword(email, password, token) {
  const action = function (dispatch) {
    var params = {
      "Email": email,
      "Token": token,
      "Password": password
    }
    dispatch(ajaxCallBegin())
    dispatch({
      type: SET_RESET_PENDING
    })
    axios.patch(`${apiURL}/Users/ResetPassword`, params, {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(response => {
      if(response.data.success)
      {
        dispatch({
          type: SET_RESET_SUCCESS,
          payload: "Password Changed Succesfully"
        })
      } else {
        dispatch({
          type: SET_RESET_ERROR,
          payload: response.data.error
        })
      }
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
     
        dispatch({
          type: SET_RESET_ERROR,
          payload: 'Reset problem try again',
        })
      dispatch(ajaxCallError());
    })
  }
  return action
}

export function setMenu(menuItem) {
  return dispatch => {
    dispatch({type: SET_MENU, menuItem});
  }
}

export function logOut() {
  return dispatch => {
    callLogoutApi(() => {
        dispatch(setLogoutSuccess());
    });
  }
}

export function clearAuth() {
  return dispatch => {
    callLogoutApi(() => {
        dispatch(setLogoutSuccess());
    });
  }
}

function setLogoutSuccess() {
  return {
    type: SET_LOGOUT
  };
}

  function callLogoutApi() {
    setTimeout(() => {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('tokenType');
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');
        sessionStorage.clear();
        const url = window.location.origin + '/login'
        window.location = url
    }, 1000);
  }