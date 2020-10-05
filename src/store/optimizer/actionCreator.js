import { ajaxCallBegin, ajaxCallSuccess, ajaxCallError } from "../ajaxStatus/actionCreators";
import { GET_BRANDS, GET_GEOGRAPHY, GET_PERIOD, GET_TACTICS, GET_SUB_BRANDS,
   GET_KEY_HIGHLIGHTS, GET_SPENDINGCOST_DATA, REVERT_SPENDINGCOST_DATA, POST_SIMULATE_DATA,
   GET_SIMULATED_DATA, CLEAR_DATA, GET_OPTIMIZATIONTYPE, RUN_SIMULATE_DATA, RESET_SCENARIO, SAVEAS_SCENARIO,
   SET_LOADER_ICON, UNSET_LOADER_ICON, DISCARD_CHANGES
  } from './actionType'
import { apiURL } from '../../config/apiConfig'
import axios from 'axios'

const config = {
    headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('accessToken'))}` }
};

const generateKeyHighLights = function generateKeyHighLights(oldData, NewData) {
  const newKeyHighlights = [];
  newKeyHighlights.push(oldData[0])
  newKeyHighlights.push(NewData[0])
  const changeObj = {
    "tactic": "Change",
    "spend": NewData[0]["spend"] - oldData[0]["spend"],
    "profit": NewData[0]["profit"] - oldData[0]["profit"],
    "revenue": NewData[0]["revenue"] - oldData[0]["revenue"],
    "roi": NewData[0]["roi"] - oldData[0]["roi"]
  }
  newKeyHighlights.push(changeObj)
  return newKeyHighlights;
}

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

export function getKeyHighLights(brand, geography, subBrand, period, tactic, modal, optimizationType, typeValue) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/Optimiser/GetKeyHighlights/${brand}/${geography}/${subBrand}/${period}/${tactic}/${modal}/${optimizationType}`, config)
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


export function getSpendingCostData(brand, geography, subBrand, period, tactic, modal, optimizationType, typeValue) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/Optimiser/GetSpends/${brand}/${geography}/${subBrand}/${period}/${tactic}/${modal}/${optimizationType}`, config
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

export function simulateData(modal, period, geography, scenarioID, spendData, optimizationType, minimizeSpendValue, maximizeRevenueValue, methodValue) {
  const params = spendData;
  const methodValueData = methodValue ? methodValue : 'NA'
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.post(`${apiURL}/optimiser/SaveOptimisationResults/${modal}/${period}/${geography}/${optimizationType}/${minimizeSpendValue}/${maximizeRevenueValue}/${scenarioID}/${methodValueData}`, params, config
    )
    .then(response => {
      dispatch({
          type: RUN_SIMULATE_DATA,
          msg: 'Successfully Optimized',
          spenData: spendData,
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

export function getSimulatedSpendData(scenarioID, modal) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/optimiser/GetStatus/${scenarioID}`, config
    )
    .then(response => {
      if(response.data.result[0].isOptimisationCompleted === 1) {
        const isSaved = response.data.result[0].isSaved ? true : false
        axios.get(`${apiURL}/optimiser/GetOptimisedSpendValues/${scenarioID}`, config
        )
        .then(response => {
          dispatch({
              type: GET_SIMULATED_DATA,
              payload: response.data,
              isSaved: isSaved,
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
      } else if(response.data.result[0].isOptimisationCompleted === 0) {
          dispatch({
            type: SET_LOADER_ICON,
        })
      } else if(response.data.result[0].isOptimisationCompleted === 2) {
          axios.get(`${apiURL}/Brands/GetBrand/${modal}`, config
          )
          .then(response => {
            dispatch({
              type: UNSET_LOADER_ICON,
            })
            dispatch({
                type: GET_BRANDS,
                payload: response.data,
            })
          })
          .catch(error => {
          })
      }
      
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

export function getOptimizationType(modal) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/OptimizationType/GetOptimization`, config
    )
    .then(response => {
      dispatch({
          type: GET_OPTIMIZATIONTYPE,
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

export function saveResults(scenarioID) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.post(`${apiURL}/Optimiser/SaveOptimisationFinalResult/${scenarioID}`, '', config
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

export function saveAsScenario(modal, scenarioName, scenarioNote, oldScenarioID) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.post(`${apiURL}/Optimiser/SaveAsOptimisationFinalResult/${oldScenarioID}/${scenarioName}/${scenarioNote}/${modal}`, '', config
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


export function checkStatus(scenarioID) {
  const action = function (dispatch) {
    axios.get(`${apiURL}/optimiser/GetStatus/${scenarioID}`, config
    )
    .then(response => {
      if(response.data.result[0].isOptimisationCompleted === 1) {
        const isSaved = response.data.result[0].isSaved ? true : false
        axios.get(`${apiURL}/optimiser/GetOptimisedSpendValues/${scenarioID}`, config
        )
        .then(response => {
          dispatch({
              type: GET_SIMULATED_DATA,
              payload: response.data,
              isSaved: isSaved,
          }) 
        })
        .catch(error => {
          
          //   dispatch({
          //     type: SET_LOGIN_ERROR,
          //     loginError: error.response.data.error_description,
          //   })
        }) 
      } else if(response.data.result[0].isOptimisationCompleted === 0) {
          dispatch({
            type: SET_LOADER_ICON,
        })
      } else if(response.data.result[0].isOptimisationCompleted === 2) {
        dispatch({
          type: UNSET_LOADER_ICON,
        })
      }
      
    })
    .catch(error => {
      
      //   dispatch({
      //     type: SET_LOGIN_ERROR,
      //     loginError: error.response.data.error_description,
      //   })
    })
      
  }
  return action
}


export function discardChanges(scenarioID) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.post(`${apiURL}/optimiser/DiscardOptimisationDeatails/${scenarioID}`, '', config
    )
    .then(response => {
      
      axios.get(`${apiURL}/optimiser/GetStatus/${scenarioID}`, config
      )
      .then(response => {
        if(response.data.result[0].isOptimisationCompleted === 1) {
          const isSaved = response.data.result[0].isSaved ? true : false
          axios.get(`${apiURL}/optimiser/GetOptimisedSpendValues/${scenarioID}`, config
          )
          .then(response => {
            dispatch({
                type: GET_SIMULATED_DATA,
                payload: response.data,
                isSaved: isSaved,
            }) 
          })
          .catch(error => {
            
            //   dispatch({
            //     type: SET_LOGIN_ERROR,
            //     loginError: error.response.data.error_description,
            //   })
          }) 
        } else if(response.data.result[0].isOptimisationCompleted === 0) {
            dispatch({
              type: SET_LOADER_ICON,
          })
        } else if(response.data.result[0].isOptimisationCompleted === 2) {
          dispatch({
            type: UNSET_LOADER_ICON,
          })
        }
        
      })
      .catch(error => {
        
        //   dispatch({
        //     type: SET_LOGIN_ERROR,
        //     loginError: error.response.data.error_description,
        //   })
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
