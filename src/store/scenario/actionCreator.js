import { ajaxCallBegin, ajaxCallSuccess, ajaxCallError } from "../ajaxStatus/actionCreators";
import { GET_SCENARIOS, GET_MODEL_LIST, POST_SCENARIO, RESET_SCENARIO, Delete_SCENARIOS, GET_USERS_LIST, SHARE_SCENARIO } from './actionType'
import { apiURL } from '../../config/apiConfig'
import axios from 'axios'

const config = {
    headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('accessToken'))}` }
};

export function getScenarios() {
    const action = function (dispatch) {
      dispatch(ajaxCallBegin())
      axios.get(`${apiURL}/Scenario/GetScenarios`, config
      )
      .then(response => {
        dispatch({
            type: GET_SCENARIOS,
            payload: response.data,
        })
        dispatch(ajaxCallSuccess());
      })
      .catch(error => {
       
        //   dispatch({
        //     type: SET_LOGIN_ERROR,
        //     loginError: error.response.data.error_description,
        //   })
        dispatch(ajaxCallError());
      })
    }
    return action
  }

  export function getModelList() {
    const action = function (dispatch) {
      axios.get(`${apiURL}/Model/GetModels`, config
      )
      .then(response => {
        dispatch({
            type: GET_MODEL_LIST,
            payload: response.data,
        })
      })
      .catch(error => {
      })
    }
    return action
  }

  export function postScenario(data) {
    const action = function (dispatch) {
      dispatch(ajaxCallBegin())
      axios.post(`${apiURL}/Scenario/SaveScenario`, data, config
      )
      .then(response => {
        dispatch(ajaxCallSuccess());
        dispatch({
          type: POST_SCENARIO,
          newId: response.data.result.scenarioId,
          newModal: response.data.result.modelName,
          isSimulated: response.data.result.isSimulated,
          isSimulatorOptimiser: data.isSimulatorOptimiser,
        })
      })
      .catch(error => {
       //alert(error.response.data.message)
        //   dispatch({
        //     type: SET_LOGIN_ERROR,
        //     loginError: error.response.data.error_description,
        //   })
        dispatch(ajaxCallError());
      })
    }
    return action
  }

  export function resetScenario() {
    const action = function (dispatch) {
      
        dispatch({
          type: RESET_SCENARIO,
      })
      
    }
    return action
  }

  export function deleteScenario(id) {
    const action = function (dispatch) {
      dispatch(ajaxCallBegin())
      axios.delete(`${apiURL}/Scenario/DeleteScenario/${id}`, config
      )
      .then(response => {
        axios.get(`${apiURL}/Scenario/GetScenarios`, config
        )
        .then(response => {
          dispatch({
              type: GET_SCENARIOS,
              payload: response.data,
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

  export function getUsersList() {
    const action = function (dispatch) {
      dispatch(ajaxCallBegin())
      axios.get(`${apiURL}/Users/GetUserNames`, config
      )
      .then(response => {
        dispatch({
            type: GET_USERS_LIST,
            payload: response.data,
        })
        dispatch(ajaxCallSuccess());
      })
      .catch(error => {
       
        //   dispatch({
        //     type: SET_LOGIN_ERROR,
        //     loginError: error.response.data.error_description,
        //   })
        dispatch(ajaxCallError());
      })
    }
    return action
  }

  export function postShareScenario(data) {
    const action = function (dispatch) {
      dispatch(ajaxCallBegin())
      axios.put(`${apiURL}/Scenario/InsertorUpdateShareScenario`, data, config
      )
      .then(response => {
        dispatch({
            type: SHARE_SCENARIO,
        })
        dispatch(ajaxCallSuccess());
      })
      .catch(error => {
       
        //   dispatch({
        //     type: SET_LOGIN_ERROR,
        //     loginError: error.response.data.error_description,
        //   })
        dispatch(ajaxCallError());
      })
    }
    return action
  }
