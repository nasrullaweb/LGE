import { ajaxCallBegin, ajaxCallSuccess, ajaxCallError } from "../DVajaxStatus/actionCreators";
import { ajaxCallBeginGB, ajaxCallErrorGB, ajaxCallSuccessGB } from "../GBajaxStatus/actionCreators";
import { DV_GET_MODEL_LIST, DV_GET_GEOGRAPHY_LIST, DV_GET_REGION_LIST, DV_GET_BRAND_LIST, DV_GET_SUBBRAND_LIST,
  DV_GET_TACTIC_LIST, DV_GET_GRAPH_DATA, DV_GET_MODEL_LIST_ERROR, DV_GET_GEOGRAPHY_LIST_ERROR, DV_GET_REGION_LIST_ERROR,
  DV_GET_BRAND_LIST_ERROR, DV_GET_SUBBRAND_LIST_ERROR, DV_GET_TACTIC_LIST_ERROR, DV_GET_GRAPH_DATA_ERROR,
  DV_GET_BRAND_LIST1, DV_GET_SUBBRAND_LIST1, DV_GET_TACTIC_LIST1, DV_GET_GRAPH_DATA11, DV_GET_GRAPH_DATA12, DV_GET_GRAPH_DATA13,
  DV_GET_BRAND_LIST1_ERROR, DV_GET_SUBBRAND_LIST1_ERROR, DV_GET_TACTIC_LIST1_ERROR,
   DV_GET_GRAPH_DATA11_ERROR, DV_GET_GRAPH_DATA12_ERROR, DV_GET_GRAPH_DATA13_ERROR,
   DV_GET_BRAND_LIST2, DV_GET_SUBBRAND_LIST2, DV_GET_TACTIC_LIST2, DV_GET_GRAPH_DATA21, DV_GET_GRAPH_DATA22, DV_GET_GRAPH_DATA23,
   DV_GET_BRAND_LIST2_ERROR, DV_GET_SUBBRAND_LIST2_ERROR, DV_GET_TACTIC_LIST2_ERROR, DV_CLEAR_DATA,
   DV_GET_GRAPH_DATA21_ERROR, DV_GET_GRAPH_DATA22_ERROR, DV_GET_GRAPH_DATA23_ERROR, DV_GET_SET_GRAPH, DV_GET_SET_GRAPH1, DV_GET_SET_GRAPH2,
   DV_GET_BRAND_LIST3, DV_GET_SUBBRAND_LIST3, DV_GET_GRAPH_DATA3, DV_GET_BRAND_LIST3_ERROR, DV_GET_SUBBRAND_LIST3_ERROR,
   DV_GET_GRAPH_DATA3_ERROR, DV_GET_SET_GRAPH3, DV_GET_GRAPH_DATA31, DV_GET_GRAPH_DATA32, DV_GET_GRAPH_DATA31_ERROR, DV_GET_GRAPH_DATA32_ERROR
  
  } from './actionType'
import { apiURL } from '../../config/apiConfig'
import axios from 'axios'

const config = {
  headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('accessToken'))}` }
};

export function getModelList() {
  const action = function (dispatch) {
    dispatch(ajaxCallBeginGB())
    axios.get(`${apiURL}/DMModel/GetDMModels`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_MODEL_LIST,
          payload: response.data,
      })
      dispatch(ajaxCallSuccessGB());
    })
    .catch(error => {
      dispatch(ajaxCallErrorGB());
      dispatch({
        type: DV_GET_MODEL_LIST_ERROR,
      })
    })
  }
  return action
}

export function getGeographyList(modal) {
  const action = function (dispatch) {
    dispatch(ajaxCallBeginGB())
    axios.get(`${apiURL}/DMGeography/GetGeography/${modal}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_GEOGRAPHY_LIST,
          payload: response.data,
      })
      dispatch(ajaxCallSuccessGB());
    })
    .catch(error => {
      dispatch(ajaxCallErrorGB());
      dispatch({
        type: DV_GET_GEOGRAPHY_LIST_ERROR,
      })
    })
  }
  return action
}

export function getRegionList(modal, geography) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMRegion/GetRegion/${modal}/${geography}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_REGION_LIST,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_REGION_LIST_ERROR,
      })
    })
  }
  return action
}

export function getBrandList(modal, geography, region) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMBrands/GetBrands/${modal}/${geography}/${region}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_BRAND_LIST,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_BRAND_LIST_ERROR,
      })
    })
  }
  return action
}

export function getSubBrandList(modal, geography, region, brand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMSubBrands/GetSubBrands/${modal}/${geography}/${region}/${brand}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_SUBBRAND_LIST,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_SUBBRAND_LIST_ERROR,
      })
    })
  }
  return action
}

export function getTacticList(modal, geography, region, brand, subBrand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/InDepTactic/GetTactics/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_TACTIC_LIST,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_TACTIC_LIST_ERROR,
      })
    })
  }
  return action
}

export function getGraphData(modal, geography, region, brand, subBrand, var1, var2) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMSingleTactic/GetChart/${modal}/${geography}/${region}/${brand}/${subBrand}/${var1}/${var2}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_GRAPH_DATA,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_GRAPH_DATA_ERROR,
      })
    })
  }
  return action
}

export function getAllData() {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    // axios.get(`${apiURL}/DMModel/GetDMModels`, config
    // )
    // .then(response => {
    //   dispatch({
    //       type: DV_GET_MODEL_LIST,
    //       payload: response.data,
    //   })
      // if (sessionStorage.getItem('modelValue')) {
      //   const modal = JSON.parse(sessionStorage.getItem('modelValue'))
      //   axios.get(`${apiURL}/DMGeography/GetGeography/${modal}`, config
      //   )
      //   .then(response => {
      //     dispatch({
      //         type: DV_GET_GEOGRAPHY_LIST,
      //         payload: response.data,
      //     })
          if (sessionStorage.getItem('geographyValue')) { 
            const geography = JSON.parse(sessionStorage.getItem('geographyValue'))
            const modal = JSON.parse(sessionStorage.getItem('modelValue'))
            dispatch(getTab1AllData(modal, geography))
              dispatch(getTab2AllData(modal, geography))
              dispatch(getTab3AllData(modal, geography))
            // axios.get(`${apiURL}/DMRegion/GetRegion/${modal}/${geography}`, config
            // )
            // .then(response => {
            //   dispatch({
            //       type: DV_GET_REGION_LIST,
            //       payload: response.data,
            //   })
              
             // if (sessionStorage.getItem('regionValue')) { 
                const region = 'LGE'
                axios.get(`${apiURL}/DMBrands/GetBrands/${modal}/${geography}/${region}`, config
                )
                .then(response => {
                  dispatch({
                      type: DV_GET_BRAND_LIST,
                      payload: response.data,
                  })
                  if (sessionStorage.getItem('brandValue')) { 
                    const brand = JSON.parse(sessionStorage.getItem('brandValue'))
                    axios.get(`${apiURL}/DMSubBrands/GetSubBrands/${modal}/${geography}/${region}/${brand}`, config
                    )
                    .then(response => {
                      dispatch({
                          type: DV_GET_SUBBRAND_LIST,
                          payload: response.data,
                      })
                      if (sessionStorage.getItem('subBrandValue')) { 
                        const subBrand = JSON.parse(sessionStorage.getItem('subBrandValue'))
                        axios.get(`${apiURL}/InDepTactic/GetTactics/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
                        )
                        .then(response => {
                          dispatch({
                              type: DV_GET_TACTIC_LIST,
                              payload: response.data,
                          })
                          if (sessionStorage.getItem('var2Value')) {
                            const var1 = JSON.parse(sessionStorage.getItem('var1Value'))
                            const var2 = JSON.parse(sessionStorage.getItem('var2Value'))
                            axios.get(`${apiURL}/DMSingleTactic/GetChart/${modal}/${geography}/${region}/${brand}/${subBrand}/${var1}/${var2}`, config
                            )
                            .then(response => {
                              dispatch({
                                  type: DV_GET_GRAPH_DATA,
                                  payload: response.data,
                              })
                              dispatch(ajaxCallSuccess());
                            })
                            .catch(error => {
                              dispatch(ajaxCallError());
                              dispatch({
                                type: DV_GET_GRAPH_DATA_ERROR,
                              })
                            })
                            //dispatch(ajaxCallSuccess());
                          } else {
                            dispatch(ajaxCallSuccess());
                          }
                        })
                        .catch(error => {
                          dispatch(ajaxCallError());
                          dispatch({
                            type: DV_GET_TACTIC_LIST_ERROR,
                          })
                        })
                      } else {
                        dispatch(ajaxCallSuccess());
                      }
                    })
                    .catch(error => {
                      dispatch(ajaxCallError());
                      dispatch({
                        type: DV_GET_SUBBRAND_LIST_ERROR,
                      })
                    })
                  } else {
                    dispatch(ajaxCallSuccess());
                  }
                })
                .catch(error => {
                  dispatch(ajaxCallError());
                  dispatch({
                    type: DV_GET_BRAND_LIST_ERROR,
                  })
                })

            //   } else {
            //     dispatch(ajaxCallSuccess());
            //   }
            // })
            // .catch(error => {
            //   dispatch(ajaxCallError());
            //   dispatch({
            //     type: DV_GET_REGION_LIST_ERROR,
            //   })
            // })
          } else {
            dispatch(ajaxCallSuccess());
          }
      //   })
      //   .catch(error => {
      //     dispatch(ajaxCallError());
      //     dispatch({
      //       type: DV_GET_GEOGRAPHY_LIST_ERROR,
      //     })
      //   })
      // } else {
      //   dispatch(ajaxCallSuccess());
      // }
    // })
    // .catch(error => {
    //   dispatch(ajaxCallError());
    //   dispatch({
    //     type: DV_GET_MODEL_LIST_ERROR,
    //   })
    // })
  }
  return action
}

export function getTab1AllData(modal, geography) {
  const action = function (dispatch) {
    //if (sessionStorage.getItem('regionValueTab1')) { 
      const region = 'LGE'
      axios.get(`${apiURL}/DMBrands/GetBrands/${modal}/${geography}/${region}`, config
      )
      .then(response => {
        dispatch({
            type: DV_GET_BRAND_LIST1,
            payload: response.data,
        })
        if (sessionStorage.getItem('brandValueTab1')) { 
          const brand = JSON.parse(sessionStorage.getItem('brandValueTab1'))
          axios.get(`${apiURL}/DMSubBrands/GetSubBrands/${modal}/${geography}/${region}/${brand}`, config
          )
          .then(response => {
            dispatch({
                type: DV_GET_SUBBRAND_LIST1,
                payload: response.data,
            })
            if (sessionStorage.getItem('subBrandValueTab1')) { 
              const subBrand = JSON.parse(sessionStorage.getItem('subBrandValueTab1'))
              axios.get(`${apiURL}/DMTactic/GetTactics/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
              )
              .then(response => {
                dispatch({
                    type: DV_GET_TACTIC_LIST1,
                    payload: response.data,
                })
                if (sessionStorage.getItem('var2ValueTab1')) {
                  const var2 = JSON.parse(sessionStorage.getItem('var2ValueTab1'))
                  axios.get(`${apiURL}/DMMultipleSubBrands/GetChart/${modal}/${geography}/${region}/${brand}/${subBrand}/${var2}`, config
                  )
                  .then(response => {
                    dispatch({
                        type: DV_GET_GRAPH_DATA11,
                        payload: response.data,
                    })
                  })
                  .catch(error => {
                    dispatch({
                      type: DV_GET_GRAPH_DATA11_ERROR,
                    })
                  })
                  axios.get(`${apiURL}/DMMultipleSubBrands/GetBar1/${modal}/${geography}/${region}/${brand}/${subBrand}/${var2}`, config
                  )
                  .then(response => {
                    dispatch({
                        type: DV_GET_GRAPH_DATA12,
                        payload: response.data,
                    })
                  })
                  .catch(error => {
                    dispatch({
                      type: DV_GET_GRAPH_DATA12_ERROR,
                    })
                  })
                  axios.get(`${apiURL}/DMMultipleSubBrands/GetBar2/${modal}/${geography}/${region}/${brand}/${subBrand}/${var2}`, config
                  )
                  .then(response => {
                    dispatch({
                        type: DV_GET_GRAPH_DATA13,
                        payload: response.data,
                    })
                  })
                  .catch(error => {
                    dispatch({
                      type: DV_GET_GRAPH_DATA13_ERROR,
                    })
                  })
                }
              })
              .catch(error => {
                dispatch({
                  type: DV_GET_TACTIC_LIST1_ERROR,
                })
              })
            }
          })
          .catch(error => {
            dispatch({
              type: DV_GET_SUBBRAND_LIST1_ERROR,
            })
          })
        }
      })
      .catch(error => {
        dispatch({
          type: DV_GET_BRAND_LIST1_ERROR,
        })
      })

    //}
  }
  return action
}

export function getBrandList1(modal, geography, region) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMBrands/GetBrands/${modal}/${geography}/${region}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_BRAND_LIST1,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_BRAND_LIST1_ERROR,
      })
    })
  }
  return action
}

export function getSubBrandList1(modal, geography, region, brand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMSubBrands/GetSubBrands/${modal}/${geography}/${region}/${brand}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_SUBBRAND_LIST1,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_SUBBRAND_LIST1_ERROR,
      })
    })
  }
  return action
}

export function getTacticList1(modal, geography, region, brand, subBrand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMTactic/GetTactics/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_TACTIC_LIST1,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_TACTIC_LIST1_ERROR,
      })
    })
  }
  return action
}

export function getGraphData11(modal, geography, region, brand, subBrand, var2) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMMultipleSubBrands/GetChart/${modal}/${geography}/${region}/${brand}/${subBrand}/${var2}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_GRAPH_DATA11,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_GRAPH_DATA11_ERROR,
      })
    })
  }
  return action
}

export function getGraphData12(modal, geography, region, brand, subBrand, var2) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMMultipleSubBrands/GetBar1/${modal}/${geography}/${region}/${brand}/${subBrand}/${var2}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_GRAPH_DATA12,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_GRAPH_DATA12_ERROR,
      })
    })
  }
  return action
}

export function getGraphData13(modal, geography, region, brand, subBrand, var2) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMMultipleSubBrands/GetBar2/${modal}/${geography}/${region}/${brand}/${subBrand}/${var2}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_GRAPH_DATA13,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_GRAPH_DATA13_ERROR,
      })
    })
  }
  return action
}

export function getBrandList2(modal, geography, region) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMBrands/GetBrands/${modal}/${geography}/${region}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_BRAND_LIST2,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_BRAND_LIST2_ERROR,
      })
    })
  }
  return action
}

export function getSubBrandList2(modal, geography, region, brand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMSubBrands/GetSubBrands/${modal}/${geography}/${region}/${brand}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_SUBBRAND_LIST2,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_SUBBRAND_LIST2_ERROR,
      })
    })
  }
  return action
}

export function getTacticList2(modal, geography, region, brand, subBrand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/InDepTactic/GetTactics/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_TACTIC_LIST2,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_TACTIC_LIST2_ERROR,
      })
    })
  }
  return action
}

export function getGraphData21(modal, geography, region, brand, subBrand, var1, var2) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMMultipleTactics/GetChart/${modal}/${geography}/${region}/${brand}/${subBrand}/${var1}/${var2}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_GRAPH_DATA21,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_GRAPH_DATA21_ERROR,
      })
    })
  }
  return action
}

export function getGraphData22(modal, geography, region, brand, subBrand, var1, var2) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMMultipleTactics/GetBar1/${modal}/${geography}/${region}/${brand}/${subBrand}/${var1}/${var2}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_GRAPH_DATA22,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_GRAPH_DATA22_ERROR,
      })
    })
  }
  return action
}

export function getGraphData23(modal, geography, region, brand, subBrand, var1, var2) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMMultipleTactics/GetBar2/${modal}/${geography}/${region}/${brand}/${subBrand}/${var1}/${var2}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_GRAPH_DATA23,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_GRAPH_DATA23_ERROR,
      })
    })
  }
  return action
}

export function getTab2AllData(modal, geography) {
  const action = function (dispatch) {
    //if (sessionStorage.getItem('regionValueTab2')) { 
      const region = 'LGE'
      axios.get(`${apiURL}/DMBrands/GetBrands/${modal}/${geography}/${region}`, config
      )
      .then(response => {
        dispatch({
            type: DV_GET_BRAND_LIST2,
            payload: response.data,
        })
        if (sessionStorage.getItem('brandValueTab2')) { 
          const brand = JSON.parse(sessionStorage.getItem('brandValueTab2'))
          axios.get(`${apiURL}/DMSubBrands/GetSubBrands/${modal}/${geography}/${region}/${brand}`, config
          )
          .then(response => {
            dispatch({
                type: DV_GET_SUBBRAND_LIST2,
                payload: response.data,
            })
            if (sessionStorage.getItem('subBrandValueTab2')) { 
              const subBrand = JSON.parse(sessionStorage.getItem('subBrandValueTab2'))
              axios.get(`${apiURL}/InDepTactic/GetTactics/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
              )
              .then(response => {
                dispatch({
                    type: DV_GET_TACTIC_LIST2,
                    payload: response.data,
                })
                if (sessionStorage.getItem('var2ValueTab2')) {
                  const var1 = JSON.parse(sessionStorage.getItem('var1ValueTab2'))
                  const var2 = JSON.parse(sessionStorage.getItem('var2ValueTab2'))
                  axios.get(`${apiURL}/DMMultipleTactics/GetChart/${modal}/${geography}/${region}/${brand}/${subBrand}/${var1}/${var2}`, config
                  )
                  .then(response => {
                    dispatch({
                        type: DV_GET_GRAPH_DATA21,
                        payload: response.data,
                    })
                  })
                  .catch(error => {
                    dispatch({
                      type: DV_GET_GRAPH_DATA21_ERROR,
                    })
                  })
                  axios.get(`${apiURL}/DMMultipleTactics/GetBar1/${modal}/${geography}/${region}/${brand}/${subBrand}/${var1}/${var2}`, config
                  )
                  .then(response => {
                    dispatch({
                        type: DV_GET_GRAPH_DATA22,
                        payload: response.data,
                    })
                  })
                  .catch(error => {
                    dispatch({
                      type: DV_GET_GRAPH_DATA22_ERROR,
                    })
                  })
                  axios.get(`${apiURL}/DMMultipleTactics/GetBar2/${modal}/${geography}/${region}/${brand}/${subBrand}/${var1}/${var2}`, config
                  )
                  .then(response => {
                    dispatch({
                        type: DV_GET_GRAPH_DATA23,
                        payload: response.data,
                    })
                  })
                  .catch(error => {
                    dispatch({
                      type: DV_GET_GRAPH_DATA23_ERROR,
                    })
                  })
                }
              })
              .catch(error => {
                dispatch({
                  type: DV_GET_TACTIC_LIST2_ERROR,
                })
              })
            }
          })
          .catch(error => {
            dispatch({
              type: DV_GET_SUBBRAND_LIST2_ERROR,
            })
          })
        }
      })
      .catch(error => {
        dispatch({
          type: DV_GET_BRAND_LIST2_ERROR,
        })
      })

    }
  //}
  return action
}


export function setGraphChange() {
  const action = function (dispatch) {
    dispatch({
      type: DV_GET_SET_GRAPH,
  })
  }
  return action
}

export function setGraphChange1() {
  const action = function (dispatch) {
    dispatch({
      type: DV_GET_SET_GRAPH1,
  })
  }
  return action
}

export function setGraphChange2() {
  const action = function (dispatch) {
    dispatch({
      type: DV_GET_SET_GRAPH2,
  })
  }
  return action
}

export function clearData() {
  const action = function (dispatch) {
    dispatch({
        type: DV_CLEAR_DATA
    }) 
  }
  return action
}

export function getModelandGeographyList() {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMModel/GetDMModels`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_MODEL_LIST,
          payload: response.data,
      })
      if (sessionStorage.getItem('modelValue')) {
        const modal = JSON.parse(sessionStorage.getItem('modelValue'))
        axios.get(`${apiURL}/DMGeography/GetGeography/${modal}`, config
        )
        .then(response => {
          dispatch({
              type: DV_GET_GEOGRAPHY_LIST,
              payload: response.data,
          })
        })
        .catch(error => {
          dispatch(ajaxCallError());
          dispatch({
            type: DV_GET_GEOGRAPHY_LIST_ERROR,
          })
        })
      } else {
        dispatch(ajaxCallSuccess());
      }
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_MODEL_LIST_ERROR,
      })
    })
  }
  return action
}

export function getBrandList3(modal, geography, region) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMBrands/GetBrands/${modal}/${geography}/${region}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_BRAND_LIST3,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_BRAND_LIST3_ERROR,
      })
    })
  }
  return action
}

export function getSubBrandList3(modal, geography, region, brand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMSubBrands/GetSubBrands/${modal}/${geography}/${region}/${brand}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_SUBBRAND_LIST3,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_SUBBRAND_LIST3_ERROR,
      })
    })
  }
  return action
}

export function getGraphData3(modal, geography, region, brand, subBrand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMCharts/GetSpendBar/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_GRAPH_DATA3,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_GRAPH_DATA3_ERROR,
      })
    })
  }
  return action
}

export function getGraphData31(modal, geography, region, brand, subBrand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMCharts/GetSpendTactics/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_GRAPH_DATA31,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_GRAPH_DATA31_ERROR,
      })
    })
  }
  return action
}

export function getGraphData32(modal, geography, region, brand, subBrand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/DMCharts/GetYOY/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
    )
    .then(response => {
      dispatch({
          type: DV_GET_GRAPH_DATA32,
          payload: response.data.dmSpends,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: DV_GET_GRAPH_DATA32_ERROR,
      })
    })
  }
  return action
}

export function setGraphChange3() {
  const action = function (dispatch) {
    dispatch({
      type: DV_GET_SET_GRAPH3,
  })
  }
  return action
}

export function getTab3AllData(modal, geography) {
  const action = function (dispatch) {
    //if (sessionStorage.getItem('regionValueTab3')) { 
      const region = 'LGE'
      axios.get(`${apiURL}/DMBrands/GetBrands/${modal}/${geography}/${region}`, config
      )
      .then(response => {
        dispatch({
            type: DV_GET_BRAND_LIST3,
            payload: response.data,
        })
        if (sessionStorage.getItem('brandValueTab3')) { 
          const brand = JSON.parse(sessionStorage.getItem('brandValueTab3'))
          axios.get(`${apiURL}/DMSubBrands/GetSubBrands/${modal}/${geography}/${region}/${brand}`, config
          )
          .then(response => {
            dispatch({
                type: DV_GET_SUBBRAND_LIST3,
                payload: response.data,
            })
            if (sessionStorage.getItem('subBrandValueTab3')) { 
              const subBrand = JSON.parse(sessionStorage.getItem('subBrandValueTab3'))
              // axios.get(`${apiURL}/InDepTactic/GetTactics/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
              // )
              // .then(response => {
              //   dispatch({
              //       type: DV_GET_TACTIC_LIST2,
              //       payload: response.data,
              //   })
                // if (sessionStorage.getItem('var2ValueTab2')) {
                //   const var1 = JSON.parse(sessionStorage.getItem('var1ValueTab2'))
                //   const var2 = JSON.parse(sessionStorage.getItem('var2ValueTab2'))
                  axios.get(`${apiURL}/DMCharts/GetSpendBar/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
                  )
                  .then(response => {
                    dispatch({
                        type: DV_GET_GRAPH_DATA3,
                        payload: response.data,
                    })
                  })
                  .catch(error => {
                    dispatch({
                      type: DV_GET_GRAPH_DATA3_ERROR,
                    })
                  })

                  axios.get(`${apiURL}/DMCharts/GetSpendTactics/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
                  )
                  .then(response => {
                    dispatch({
                        type: DV_GET_GRAPH_DATA31,
                        payload: response.data,
                    })
                    dispatch(ajaxCallSuccess());
                  })
                  .catch(error => {
                    dispatch(ajaxCallError());
                    dispatch({
                      type: DV_GET_GRAPH_DATA31_ERROR,
                    })
                  })

                  axios.get(`${apiURL}/DMCharts/GetYOY/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
                  )
                  .then(response => {
                    console.log("g", response.data.dmSpends)
                    dispatch({
                        type: DV_GET_GRAPH_DATA32,
                        payload: response.data.dmSpends,
                    })
                    dispatch(ajaxCallSuccess());
                  })
                  .catch(error => {
                    dispatch(ajaxCallError());
                    dispatch({
                      type: DV_GET_GRAPH_DATA32_ERROR,
                    })
                  })
              //   }
              // })
              // .catch(error => {
              //   dispatch({
              //     type: DV_GET_TACTIC_LIST2_ERROR,
              //   })
              // })
            }
          })
          .catch(error => {
            dispatch({
              type: DV_GET_SUBBRAND_LIST3_ERROR,
            })
          })
        }
      })
      .catch(error => {
        dispatch({
          type: DV_GET_BRAND_LIST3_ERROR,
        })
      })

    //}
  }
  return action
}
