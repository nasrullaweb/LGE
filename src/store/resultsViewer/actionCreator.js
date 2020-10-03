import { ajaxCallBegin, ajaxCallSuccess, ajaxCallError } from "../RVajaxStatus/actionCreators";
import { RV_GET_MODEL_LIST, RV_GET_GEOGRAPHY_LIST, RV_GET_REGION_LIST, RV_GET_BRAND_LIST, RV_GET_SUBBRAND_LIST, RV_GET_SET_GRAPH, RV_GET_SET_GRAPH1,
  RV_GET_TACTIC_LIST, RV_GET_GRAPH_DATA1, RV_GET_GRAPH_DATA2, RV_GET_GRAPH_DATA3, RV_GET_GRAPH_DATA4, RV_GET_MODEL_LIST_ERROR, RV_GET_GEOGRAPHY_LIST_ERROR, RV_GET_REGION_LIST_ERROR,
  RV_GET_BRAND_LIST_ERROR, RV_GET_SUBBRAND_LIST_ERROR, RV_CLEAR_DATA, RV_GET_TACTIC_LIST_ERROR, RV_GET_GRAPH_DATA1_ERROR, RV_GET_GRAPH_DATA2_ERROR, 
  RV_GET_GRAPH_DATA3_ERROR, RV_GET_GRAPH_DATA4_ERROR, RV_GET_RSQUARE_ERROR, RV_GET_RSQUARE, RV_GET_GRAPH_DATA21, RV_GET_GRAPH_DATA21_ERROR, RV_GET_GRAPH_DATA22, RV_GET_GRAPH_DATA22_ERROR,
  RV_GET_GRAPH_DATA23, RV_GET_GRAPH_DATA23_ERROR
  } from './actionType'
import { apiURL } from '../../config/apiConfig'
import axios from 'axios'

const config = {
  headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('accessToken'))}` }
};

export function getModelList() {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/RVFilters/GetModels`, config
    )
    .then(response => {
      dispatch({
          type: RV_GET_MODEL_LIST,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: RV_GET_MODEL_LIST_ERROR,
      })
    })
  }
  return action
}

export function getGeographyList(modal) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/RVFilters/GetGeography/${modal}`, config
    )
    .then(response => {
      dispatch({
          type: RV_GET_GEOGRAPHY_LIST,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: RV_GET_GEOGRAPHY_LIST_ERROR,
      })
    })
  }
  return action
}

export function getRegionList(modal, geography) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/RVFilters/GetRegion/${modal}/${geography}`, config
    )
    .then(response => {
      dispatch({
          type: RV_GET_REGION_LIST,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: RV_GET_REGION_LIST_ERROR,
      })
    })
  }
  return action
}

export function getBrandList(modal, geography, region) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/RVFilters/GetBrands/${modal}/${geography}/${region}`, config
    )
    .then(response => {
      dispatch({
          type: RV_GET_BRAND_LIST,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: RV_GET_BRAND_LIST_ERROR,
      })
    })
  }
  return action
}

export function getSubBrandList(modal, geography, region, brand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/RVFilters/GetSubBrands/${modal}/${geography}/${region}/${brand}`, config
    )
    .then(response => {
      dispatch({
          type: RV_GET_SUBBRAND_LIST,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: RV_GET_SUBBRAND_LIST_ERROR,
      })
    })
  }
  return action
}

export function getTacticList(modal, geography, region, brand, subBrand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/RVFilters/GetTactics/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
    )
    .then(response => {
      dispatch({
          type: RV_GET_TACTIC_LIST,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: RV_GET_TACTIC_LIST_ERROR,
      })
    })
  }
  return action
}

export function getRSquare(modal, geography, region, brand, subBrand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/RVCharts/GetRSquare/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
    )
    .then(response => {
      dispatch({
          type: RV_GET_RSQUARE,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: RV_GET_RSQUARE_ERROR,
      })
    })
  }
  return action
}

export function getGraphData1(modal, geography, region, brand, subBrand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/RVCharts/GetContibution/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
    )
    .then(response => {
      dispatch({
          type: RV_GET_GRAPH_DATA1,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: RV_GET_GRAPH_DATA1_ERROR,
      })
    })
  }
  return action
}

export function getGraphData2(modal, geography, region, brand, subBrand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/RVCharts/GetModelStat/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
    )
    .then(response => {
      dispatch({
          type: RV_GET_GRAPH_DATA2,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: RV_GET_GRAPH_DATA2_ERROR,
      })
    })
  }
  return action
}

export function getGraphData21(modal, geography, region, brand, subBrand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/RVCharts/GetBaseContibution/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
    )
    .then(response => {
      dispatch({
          type: RV_GET_GRAPH_DATA21,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: RV_GET_GRAPH_DATA21_ERROR,
      })
    })
  }
  return action
}

export function getGraphData22(modal, geography, region, brand, subBrand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/RVCharts/GetContibutionBar/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
    )
    .then(response => {
      dispatch({
          type: RV_GET_GRAPH_DATA22,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: RV_GET_GRAPH_DATA22_ERROR,
      })
    })
  }
  return action
}

export function getGraphData23(modal, geography, region, brand, subBrand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/RVCharts/GetContibutionSpendBar/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
    )
    .then(response => {
      dispatch({
          type: RV_GET_GRAPH_DATA23,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: RV_GET_GRAPH_DATA23_ERROR,
      })
    })
  }
  return action
}

export function getGraphData3(modal, geography, region, brand, subBrand) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/RVCharts/GetVolume/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
    )
    .then(response => {
      dispatch({
          type: RV_GET_GRAPH_DATA3,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: RV_GET_GRAPH_DATA3_ERROR,
      })
    })
  }
  return action
}

export function getGraphData4(modal, geography, region, brand, subBrand, tactic) {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    axios.get(`${apiURL}/RVCharts/GetResponsive/${modal}/${geography}/${region}/${brand}/${subBrand}/${tactic}`, config
    )
    .then(response => {
      dispatch({
          type: RV_GET_GRAPH_DATA4,
          payload: response.data,
      })
      dispatch(ajaxCallSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError());
      dispatch({
        type: RV_GET_GRAPH_DATA4_ERROR,
      })
    })
  }
  return action
}

export function getAllData() {
  const action = function (dispatch) {
    dispatch(ajaxCallBegin())
    console.log('test')
    // axios.get(`${apiURL}/RVFilters/GetModels`, config
    // )
    // .then(response => {
    //   dispatch({
    //       type: RV_GET_MODEL_LIST,
    //       payload: response.data,
    //   })
    //   if (sessionStorage.getItem('RmodelValue')) {
    //     const modal = JSON.parse(sessionStorage.getItem('RmodelValue'))
    //     axios.get(`${apiURL}/RVFilters/GetGeography/${modal}`, config
    //     )
    //     .then(response => {
    //       dispatch({
    //           type: RV_GET_GEOGRAPHY_LIST,
    //           payload: response.data,
    //       })
          if (sessionStorage.getItem('geographyValue')) { 
            const geography = JSON.parse(sessionStorage.getItem('geographyValue'))
            const modal = JSON.parse(sessionStorage.getItem('modelValue'))
            // axios.get(`${apiURL}/RVFilters/GetRegion/${modal}/${geography}`, config
            // )
            // .then(response => {
            //   dispatch({
            //       type: RV_GET_REGION_LIST,
            //       payload: response.data,
            //   })
              //if (sessionStorage.getItem('RregionValue')) { 
                const region = 'LGE'
                axios.get(`${apiURL}/RVFilters/GetBrands/${modal}/${geography}/${region}`, config
                )
                .then(response => {
                  dispatch({
                      type: RV_GET_BRAND_LIST,
                      payload: response.data,
                  })
                  if (sessionStorage.getItem('RbrandValue')) { 
                    const brand = JSON.parse(sessionStorage.getItem('RbrandValue'))
                    axios.get(`${apiURL}/RVFilters/GetSubBrands/${modal}/${geography}/${region}/${brand}`, config
                    )
                    .then(response => {
                      dispatch({
                          type: RV_GET_SUBBRAND_LIST,
                          payload: response.data,
                      })
                      if (sessionStorage.getItem('RsubBrandValue')) { 
                        const subBrand = JSON.parse(sessionStorage.getItem('RsubBrandValue'))
                        axios.get(`${apiURL}/RVFilters/GetTactics/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
                        )
                        .then(response => {
                          dispatch({
                              type: RV_GET_TACTIC_LIST,
                              payload: response.data,
                          })
                          axios.get(`${apiURL}/RVCharts/GetContibution/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
                          )
                          .then(response => {
                            dispatch({
                                type: RV_GET_GRAPH_DATA1,
                                payload: response.data,
                            })
                            dispatch(ajaxCallSuccess());
                          })
                          .catch(error => {
                            dispatch(ajaxCallError());
                            dispatch({
                              type: RV_GET_GRAPH_DATA1_ERROR,
                            })
                          })
                          axios.get(`${apiURL}/RVCharts/GetBaseContibution/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
                          )
                          .then(response => {
                            dispatch({
                                type: RV_GET_GRAPH_DATA21,
                                payload: response.data,
                            })
                            dispatch(ajaxCallSuccess());
                          })
                          .catch(error => {
                            dispatch(ajaxCallError());
                            dispatch({
                              type: RV_GET_GRAPH_DATA21_ERROR,
                            })
                          })
                          axios.get(`${apiURL}/RVCharts/GetContibutionBar/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
                          )
                          .then(response => {
                            dispatch({
                                type: RV_GET_GRAPH_DATA22,
                                payload: response.data,
                            })
                            dispatch(ajaxCallSuccess());
                          })
                          .catch(error => {
                            dispatch(ajaxCallError());
                            dispatch({
                              type: RV_GET_GRAPH_DATA22_ERROR,
                            })
                          })
                          axios.get(`${apiURL}/RVCharts/GetContibutionSpendBar/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
                          )
                          .then(response => {
                            dispatch({
                                type: RV_GET_GRAPH_DATA23,
                                payload: response.data,
                            })
                            dispatch(ajaxCallSuccess());
                          })
                          .catch(error => {
                            dispatch(ajaxCallError());
                            dispatch({
                              type: RV_GET_GRAPH_DATA23_ERROR,
                            })
                          })
                          axios.get(`${apiURL}/RVCharts/GetModelStat/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
                          )
                          .then(response => {
                            dispatch({
                                type: RV_GET_GRAPH_DATA2,
                                payload: response.data,
                            })
                            dispatch(ajaxCallSuccess());
                          })
                          .catch(error => {
                            dispatch(ajaxCallError());
                            dispatch({
                              type: RV_GET_GRAPH_DATA2_ERROR,
                            })
                          })

                          axios.get(`${apiURL}/RVCharts/GetRSquare/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
                          )
                          .then(response => {
                            dispatch({
                                type: RV_GET_RSQUARE,
                                payload: response.data,
                            })
                            dispatch(ajaxCallSuccess());
                          })
                          .catch(error => {
                            dispatch(ajaxCallError());
                            dispatch({
                              type: RV_GET_RSQUARE_ERROR,
                            })
                          })

                          axios.get(`${apiURL}/RVCharts/GetVolume/${modal}/${geography}/${region}/${brand}/${subBrand}`, config
                          )
                          .then(response => {
                            dispatch({
                                type: RV_GET_GRAPH_DATA3,
                                payload: response.data,
                            })
                            dispatch(ajaxCallSuccess());
                          })
                          .catch(error => {
                            dispatch(ajaxCallError());
                            dispatch({
                              type: RV_GET_GRAPH_DATA3_ERROR,
                            })
                          })
                          if (sessionStorage.getItem('RtacticValue')) {
                            const tactic = JSON.parse(sessionStorage.getItem('RtacticValue'))
                            axios.get(`${apiURL}/RVCharts/GetResponsive/${modal}/${geography}/${region}/${brand}/${subBrand}/${tactic}`, config
                            )
                            .then(response => {
                              dispatch({
                                  type: RV_GET_GRAPH_DATA4,
                                  payload: response.data,
                              })
                              dispatch(ajaxCallSuccess());
                            })
                            .catch(error => {
                              dispatch(ajaxCallError());
                              dispatch({
                                type: RV_GET_GRAPH_DATA4_ERROR,
                              })
                            })
                          } else {
                            dispatch(ajaxCallSuccess());
                          }
                        })
                        .catch(error => {
                          dispatch(ajaxCallError());
                          dispatch({
                            type: RV_GET_TACTIC_LIST_ERROR,
                          })
                        })
                      } else {
                        dispatch(ajaxCallSuccess());
                      }
                    })
                    .catch(error => {
                      dispatch(ajaxCallError());
                      dispatch({
                        type: RV_GET_SUBBRAND_LIST_ERROR,
                      })
                    })
                  } else {
                    dispatch(ajaxCallSuccess());
                  }
                })
                .catch(error => {
                  dispatch(ajaxCallError());
                  dispatch({
                    type: RV_GET_BRAND_LIST_ERROR,
                  })
                })

            //   } else {
            //     dispatch(ajaxCallSuccess());
            //   }
            // })
            // .catch(error => {
            //   dispatch(ajaxCallError());
            //   dispatch({
            //     type: RV_GET_REGION_LIST_ERROR,
            //   })
            // })
          } else {
            dispatch(ajaxCallSuccess());
          }
    //     })
    //     .catch(error => {
    //       dispatch(ajaxCallError());
    //       dispatch({
    //         type: RV_GET_GEOGRAPHY_LIST_ERROR,
    //       })
    //     })
    //   } else {
    //     dispatch(ajaxCallSuccess());
    //   }
    // })
    // .catch(error => {
    //   dispatch(ajaxCallError());
    //   dispatch({
    //     type: RV_GET_MODEL_LIST_ERROR,
    //   })
    // })
  }
  return action
}


export function setGraphChange() {
  const action = function (dispatch) {
    dispatch({
      type: RV_GET_SET_GRAPH,
  })
  }
  return action
}

export function setGraphChange1() {
  const action = function (dispatch) {
    dispatch({
      type: RV_GET_SET_GRAPH1,
  })
  }
  return action
}

export function clearData() {
  const action = function (dispatch) {
    dispatch({
        type: RV_CLEAR_DATA
    }) 
  }
  return action
}

