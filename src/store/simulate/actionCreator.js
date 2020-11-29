import { ajaxCallBegin, ajaxCallSuccess, ajaxCallError } from "../ajaxStatus/actionCreators";
import { GET_BRANDS, GET_GEOGRAPHY, GET_PERIOD, GET_TACTICS, GET_SUB_BRANDS,
   GET_KEY_HIGHLIGHTS, GET_SPENDINGCOST_DATA, REVERT_SPENDINGCOST_DATA, POST_SIMULATE_DATA,
   GET_SIMULATED_DATA, CLEAR_DATA, RUN_SIMULATE_DATA, RESET_SCENARIO, SAVEAS_SCENARIO,
   REMOVE_SIMULATED_MSG
  } from './actionType'
import { apiURL } from '../../config/apiConfig'
import axios from 'axios'

const generateKeyHighLights = function generateKeyHighLights(oldData, NewData) {
    const newKeyHighlights = [];
    newKeyHighlights.push(oldData[0])
    newKeyHighlights.push(NewData[0])
    const changeObj = {
      "tactic": "Change",
      "spend": NewData[0]["spend"] - oldData[0]["spend"],
      "spendPercentage": Math.round(((NewData[0]["spend"] - oldData[0]["spend"])/oldData[0]["spend"])*1000)/10,
      "profit": NewData[0]["profit"] - oldData[0]["profit"],
      "profitPercentage": Math.round(((NewData[0]["profit"] - oldData[0]["profit"])/oldData[0]["profit"])*1000)/10,
      "revenue": NewData[0]["revenue"] - oldData[0]["revenue"],
      "revenuePercentage": Math.round(((NewData[0]["revenue"] - oldData[0]["revenue"])/oldData[0]["revenue"])*1000)/10,
      "ltRevenue": NewData[0]["ltRevenue"] - oldData[0]["ltRevenue"],
      "ltRevenuePercentage": Math.round(((NewData[0]["ltRevenue"] - oldData[0]["ltRevenue"])/oldData[0]["ltRevenue"])*1000)/10,
      "roi": NewData[0]["roi"] - oldData[0]["roi"],
      "roiPercentage": Math.round(((NewData[0]["roi"] - oldData[0]["roi"])/oldData[0]["roi"])*10000)/100,
      "ltroi": NewData[0]["ltroi"] - oldData[0]["ltroi"],
      "ltroiPercentage": Math.round(((NewData[0]["ltroi"] - oldData[0]["ltroi"])/oldData[0]["ltroi"])*10000)/100,
      "baseRevenue": NewData[0]["baseRevenue"] - oldData[0]["baseRevenue"],
      "baseRevenuePercentage": Math.round(((NewData[0]["baseRevenue"] - oldData[0]["baseRevenue"])/oldData[0]["baseRevenue"])*1000)/10
    }
    newKeyHighlights.push(changeObj)
    return newKeyHighlights;
}

const config = {
    headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('accessToken'))}` }
};

export function getBrands(modal, geography) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/Brands/GetBrands/${modal}/${geography}`, config
    )
    .then(response => {
      dispatch({
          type: GET_BRANDS,
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

export function getGeography(brand, modal) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/Geography/GetGeography/${brand}/${modal}`, config
    )
    .then(response => {
      dispatch({
          type: GET_GEOGRAPHY,
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

export function getPeriod(modal) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/Period/GetPeriod/${modal}`, config
    )
    .then(response => {
      dispatch({
          type: GET_PERIOD,
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

export function getTactics(brand, geography, subBrand, period, modal) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/Tactic/GetTactics/${brand}/${geography}/${subBrand}/${period}/${modal}`, config
    )
    .then(response => {
      dispatch({
          type: GET_TACTICS,
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

export function getSubBrands(brand, geography, modal) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/SubBrand/GetSubBrands/${brand}/${geography}/${modal}`, config
    )
    .then(response => {
      dispatch({
          type: GET_SUB_BRANDS,
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

export function removeSimulatedMsg () {
  const action = function (dispatch) {
    dispatch({
        type: REMOVE_SIMULATED_MSG
    }) 
  }
  return action
}

export function getKeyHighLights(brand, geography, subBrand, period, tactic, modal) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/Spend/GetKeyHighlights/${brand}/${geography}/${subBrand}/${period}/${tactic}/${modal}`, config)
    .then(response => {
      dispatch({
          type: GET_KEY_HIGHLIGHTS,
          payload: response.data.result,
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


export function getSpendingCostData(brand, geography, subBrand, period, tactic, modal) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/Spend/GetSpendValues/${brand}/${geography}/${subBrand}/${period}/${tactic}/${modal}`, config
    )
    .then(response => {
      const spendingData = getNestedChildren(response.data.result)
      dispatch({
          type: GET_SPENDINGCOST_DATA,
          payload: spendingData,
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

export function revertData(oldData) {
  const action = function (dispatch) {
    dispatch({
        type: GET_SPENDINGCOST_DATA,
        payload: oldData,
    }) 
  }
  return action
}

export function clearData() {
  const action = function (dispatch) {
    dispatch({
        type: CLEAR_DATA
    }) 
  }
  return action
}

export function getNestedChildren(data) {
  var out = []
  
  for(var i in data) {
      data[i].key = i;
      data[i].percentage = '100%'
      if(data[i].children) {
          for(var j in data[i].children) {
              data[i].children[j].key = `${i}_${j}`;
              data[i].children[j].percentage = (data[i].children[j].spend * 100)/data[i].spend
              if(data[i].children[j].children) {
                  for(var k in data[i].children[j].children) {
                      data[i].children[j].children[k].key = `${i}_${j}_${k}`;
                      data[i].children[j].children[k].percentage = (data[i].children[j].children[k].spend * 100)/data[i].spend
                  }
              }
          }
      }
      out.push(data[i])
  }
  return out
}

export function simulateData(modal, period, geography, scenarioID, spendData, oldKeyHighlights, BaseFactor) {
  const params = spendData;
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.post(`${apiURL}/Spend/RunSimulator/${modal}/${period}/${geography}/${scenarioID}/${BaseFactor}`, params, config
    )
    .then(response => {
      
      dispatch({
          type: RUN_SIMULATE_DATA,
          msg: 'Successfully Simulated',
          keyHighlights: generateKeyHighLights(oldKeyHighlights, response.data.keyHighlights),
          spenData: response.data.spend
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

export function getSimulatedSpendData(scenarioID) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/Spend/GetSimulatedSpendValues/${scenarioID}`, config
    )
    .then(response => {
      dispatch({
          type: GET_SIMULATED_DATA,
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

export function saveResults(modal, period, geography, scenarioID, spendData, BaseFactor) {
  const params = spendData;
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.post(`${apiURL}/Spend/SaveResults/${modal}/${period}/${geography}/${scenarioID}/${BaseFactor}`, params, config
    )
    .then(response => {
      dispatch({
          type: POST_SIMULATE_DATA,
          payload: 'Saved Successfully',
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

export function saveAsScenario(modal, period, geography, scenarioName, scenarioNote, spendData, BaseFactor) {
  const params = spendData;
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.post(`${apiURL}/Spend/SaveAsResults/${modal}/${period}/${geography}/${scenarioName}/${scenarioNote}/${BaseFactor}`, params, config
    )
    .then(response => {
      dispatch(ajaxCallSuccess());
      dispatch({
        type: SAVEAS_SCENARIO,
        newId: response.data.result,
        newName: scenarioName,
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

export function resetSaveAsScenario() {
  const action = function (dispatch) {
    
      dispatch({
        type: RESET_SCENARIO,
    })
    
  }
  return action
}

