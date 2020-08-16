import { RV_GET_MODEL_LIST, RV_GET_GEOGRAPHY_LIST, RV_GET_REGION_LIST, RV_GET_BRAND_LIST, RV_GET_SUBBRAND_LIST, RV_GET_SET_GRAPH, RV_GET_SET_GRAPH1,
    RV_GET_TACTIC_LIST, RV_GET_GRAPH_DATA1, RV_GET_GRAPH_DATA2, RV_GET_GRAPH_DATA3, RV_GET_GRAPH_DATA4, RV_GET_MODEL_LIST_ERROR, RV_GET_GEOGRAPHY_LIST_ERROR, RV_GET_REGION_LIST_ERROR,
    RV_GET_BRAND_LIST_ERROR, RV_GET_SUBBRAND_LIST_ERROR, RV_CLEAR_DATA, RV_GET_TACTIC_LIST_ERROR, RV_GET_GRAPH_DATA1_ERROR, 
    RV_GET_GRAPH_DATA2_ERROR, RV_GET_GRAPH_DATA3_ERROR, RV_GET_GRAPH_DATA4_ERROR, RV_GET_RSQUARE_ERROR, RV_GET_RSQUARE,
    RV_GET_GRAPH_DATA21, RV_GET_GRAPH_DATA21_ERROR, RV_GET_GRAPH_DATA22, RV_GET_GRAPH_DATA22_ERROR
    } from './actionType'

export const initialState = {
    modelList: [],
    geographyList: [],
    regionList: [],
    brandList: [],
    subBrandList: [],
    tacticList: [],
    graphData1: {},
    graphData2: {},
    graphData21: {},
    graphData22: {},
    graphData3: {},
    graphData4: {},
    setGraphData1: false,
    setGraphData2: false,
    setGraphData21: false,
    setGraphData3: false,
    setGraphData4: false,
    RSquare: [],
}

export default function resultsViewer (state = initialState, action = {}) {
    switch (action.type) {
        case RV_CLEAR_DATA:
            return Object.assign({}, state, {
                ...state,
                modelList: [],
                geographyList: [],
                regionList: [],
                brandList: [],
                subBrandList: [],
                tacticList: [],
                graphData1: {},
                graphData2: {},
                graphData21: {},
                graphData22: {},
                graphData3: {},
                graphData4: {},
                setGraphData1: false,
                setGraphData2: false,
                setGraphData3: false,
                setGraphData4: false,
            }); 
        case RV_GET_MODEL_LIST:
            return Object.assign({}, state, {
                ...state,
                modelList: action.payload.models,
                geographyList: [],
                regionList: [],
                brandList: [],
                subBrandList: [],
                tacticList: [],
                graphData1: {},
                graphData2: {},
                graphData21: {},
                graphData22: {},
                graphData3: {},
            });
        case RV_GET_MODEL_LIST_ERROR:
            return Object.assign({}, state, {
                ...state,
                modelList: [],
                geographyList: [],
                regionList: [],
                brandList: [],
                subBrandList: [],
                tacticList: [],
                graphData1: {},
                graphData2: {},
                graphData21: {},
                graphData22: {},
                graphData3: {},
            });
        case RV_GET_GEOGRAPHY_LIST:
            return Object.assign({}, state, {
                ...state,
                geographyList: action.payload.items,
                regionList: [],
                brandList: [],
                subBrandList: [],
                tacticList: [],
                graphData1: {},
                graphData2: {},
                graphData21: {},
                graphData22: {},
                graphData3: {},
            });
        case RV_GET_GEOGRAPHY_LIST_ERROR:
            return Object.assign({}, state, {
                ...state,
                geographyList: [],
                regionList: [],
                brandList: [],
                subBrandList: [],
                tacticList: [],
                graphData1: {},
                graphData2: {},
                graphData21: {},
                graphData22: {},
                graphData3: {},
            });
        case RV_GET_REGION_LIST:
            return Object.assign({}, state, {
                ...state,
                regionList: action.payload.items,
                brandList: [],
                subBrandList: [],
                tacticList: [],
                graphData1: {},
                graphData2: {},
                graphData21: {},
                graphData22: {},
                graphData3: {},
            });
        case RV_GET_REGION_LIST_ERROR:
            return Object.assign({}, state, {
                ...state,
                regionList: [],
                brandList: [],
                subBrandList: [],
                tacticList: [],
                graphData1: {},
                graphData2: {},
                graphData21: {},
                graphData22: {},
                graphData3: {},
            });
        case RV_GET_BRAND_LIST:
            return Object.assign({}, state, {
                ...state,
                brandList: action.payload.items,
                subBrandList: [],
                tacticList: [],
                graphData1: {},
                graphData2: {},
                graphData21: {},
                graphData22: {},
                graphData3: {},
            });
        case RV_GET_BRAND_LIST_ERROR:
            return Object.assign({}, state, {
                ...state,
                brandList: [],
                subBrandList: [],
                tacticList: [],
                graphData1: {},
                graphData2: {},
                graphData21: {},
                graphData22: {},
                graphData3: {},
            });
        case RV_GET_SUBBRAND_LIST:
            return Object.assign({}, state, {
                ...state,
                subBrandList: action.payload.items,
                tacticList: [],
                graphData1: {},
                graphData2: {},
                graphData21: {},
                graphData22: {},
                graphData3: {},
            });
        case RV_GET_SUBBRAND_LIST_ERROR:
            return Object.assign({}, state, {
                ...state,
                subBrandList: [],
                tacticList: [],
                graphData1: {},
                graphData2: {},
                graphData21: {},
                graphData22: {},
                graphData3: {},
            });
        case RV_GET_TACTIC_LIST:
            return Object.assign({}, state, {
                ...state,
                tacticList: action.payload.items,
                graphData4: {},
            });
        case RV_GET_TACTIC_LIST_ERROR:
            return Object.assign({}, state, {
                ...state,
                tacticList: [],
                graphData4: {},
            });
        case RV_GET_RSQUARE:
            return Object.assign({}, state, {
                ...state,
                RSquare: action.payload.items,
            });
        case RV_GET_RSQUARE_ERROR:
            return Object.assign({}, state, {
                ...state,
                RSquare: [],
            });
        case RV_GET_GRAPH_DATA1:
            return Object.assign({}, state, {
                ...state,
                graphData1: action.payload,
                setGraphData1: true
            });
        case RV_GET_GRAPH_DATA1_ERROR:
            return Object.assign({}, state, {
                ...state,
                graphData1: {},
                setGraphData1: true
            });
        case RV_GET_GRAPH_DATA2:
            return Object.assign({}, state, {
                ...state,
                graphData2: action.payload,
                setGraphData2: true
            });
        case RV_GET_GRAPH_DATA2_ERROR:
            return Object.assign({}, state, {
                ...state,
                graphData2: {},
                setGraphData2: true
            });
        case RV_GET_GRAPH_DATA21:
            return Object.assign({}, state, {
                ...state,
                graphData21: action.payload,
                setGraphData21: true
            });
        case RV_GET_GRAPH_DATA21_ERROR:
            return Object.assign({}, state, {
                ...state,
                graphData21: {},
                setGraphData21: true
            });
        case RV_GET_GRAPH_DATA22:
            return Object.assign({}, state, {
                ...state,
                graphData22: action.payload,
            });
        case RV_GET_GRAPH_DATA22_ERROR:
            return Object.assign({}, state, {
                ...state,
                graphData22: {},
            });
        case RV_GET_GRAPH_DATA3:
            return Object.assign({}, state, {
                ...state,
                graphData3: action.payload,
                setGraphData3: true
            });
        case RV_GET_GRAPH_DATA3_ERROR:
            return Object.assign({}, state, {
                ...state,
                graphData3: {},
                setGraphData3: true
            });
        case RV_GET_GRAPH_DATA4:
            return Object.assign({}, state, {
                ...state,
                graphData4: action.payload,
                setGraphData4: true
            });
        case RV_GET_GRAPH_DATA4_ERROR:
            return Object.assign({}, state, {
                ...state,
                graphData4: {},
                setGraphData4: true
            });
        case RV_GET_SET_GRAPH1:
            return Object.assign({}, state, {
                ...state,
                setGraphData4: false,
            });
        case RV_GET_SET_GRAPH:
            return Object.assign({}, state, {
                ...state,
                setGraphData1: false,
                setGraphData2: false,
                setGraphData3: false,
            });
            
        default: 
        return state
    }
}