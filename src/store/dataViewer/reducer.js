import { DV_GET_MODEL_LIST, DV_GET_GEOGRAPHY_LIST, DV_GET_REGION_LIST, DV_GET_BRAND_LIST, DV_GET_SUBBRAND_LIST,
    DV_GET_TACTIC_LIST, DV_GET_GRAPH_DATA, DV_GET_MODEL_LIST_ERROR, DV_GET_GEOGRAPHY_LIST_ERROR, DV_GET_REGION_LIST_ERROR,
    DV_GET_BRAND_LIST_ERROR, DV_GET_SUBBRAND_LIST_ERROR, DV_GET_TACTIC_LIST_ERROR, DV_GET_GRAPH_DATA_ERROR,
    DV_GET_BRAND_LIST1, DV_GET_SUBBRAND_LIST1, DV_GET_TACTIC_LIST1, DV_GET_GRAPH_DATA11, DV_GET_GRAPH_DATA12, DV_GET_GRAPH_DATA13,
    DV_GET_BRAND_LIST1_ERROR, DV_GET_SUBBRAND_LIST1_ERROR, DV_GET_TACTIC_LIST1_ERROR,
     DV_GET_GRAPH_DATA11_ERROR, DV_GET_GRAPH_DATA12_ERROR, DV_GET_GRAPH_DATA13_ERROR,
     DV_GET_BRAND_LIST2, DV_GET_SUBBRAND_LIST2, DV_GET_TACTIC_LIST2, DV_GET_GRAPH_DATA21, DV_GET_GRAPH_DATA22, DV_GET_GRAPH_DATA23,
     DV_GET_BRAND_LIST2_ERROR, DV_GET_SUBBRAND_LIST2_ERROR, DV_GET_TACTIC_LIST2_ERROR, DV_CLEAR_DATA,
     DV_GET_GRAPH_DATA21_ERROR, DV_GET_GRAPH_DATA22_ERROR, DV_GET_GRAPH_DATA23_ERROR, DV_GET_SET_GRAPH, DV_GET_SET_GRAPH1, DV_GET_SET_GRAPH2
    } from './actionType'

export const initialState = {
    modelList: [],
    geographyList: [],
    regionList: [],
    brandList: [],
    subBrandList: [],
    tacticList: {},
    graphData: {},
    brandList1: [],
    subBrandList1: [],
    tacticList1: [],
    graphData11: {},
    graphData12: {},
    graphData13: {},
    brandList2: [],
    subBrandList2: [],
    tacticList2: {},
    graphData21: {},
    graphData22: {},
    graphData23: {},
    setGraphData: false,
    setGraphData11: false,
    setGraphData12: false,
    setGraphData13: false,
    setGraphData21: false,
    setGraphData22: false,
    setGraphData23: false,
}

export default function dataViewer (state = initialState, action = {}) {
    switch (action.type) {
        case DV_CLEAR_DATA:
            return Object.assign({}, state, {
                ...state,
                modelList: [],
                geographyList: [],
                regionList: [],
                brandList: [],
                subBrandList: [],
                tacticList: {},
                graphData: {},
                brandList1: [],
                subBrandList1: [],
                tacticList1: [],
                graphData11: {},
                graphData12: {},
                graphData13: {},
                brandList2: [],
                subBrandList2: [],
                tacticList2: {},
                graphData21: {},
                graphData22: {},
                graphData23: {},
                setGraphData: false,
                setGraphData11: false,
                setGraphData12: false,
                setGraphData13: false,
                setGraphData21: false,
                setGraphData22: false,
                setGraphData23: false,
            }); 
        case DV_GET_MODEL_LIST:
            return Object.assign({}, state, {
                ...state,
                modelList: action.payload.models,
                geographyList: [],
                regionList: [],
                brandList: [],
                subBrandList: [],
                tacticList: {},
                graphData: {},
            });
        case DV_GET_MODEL_LIST_ERROR:
            return Object.assign({}, state, {
                ...state,
                modelList: [],
                geographyList: [],
                regionList: [],
                brandList: [],
                subBrandList: [],
                tacticList: {},
                graphData: {},
            });
        case DV_GET_GEOGRAPHY_LIST:
            return Object.assign({}, state, {
                ...state,
                geographyList: action.payload.items,
                regionList: [],
                brandList: [],
                subBrandList: [],
                tacticList: {},
                graphData: {},
            });
        case DV_GET_GEOGRAPHY_LIST_ERROR:
            return Object.assign({}, state, {
                ...state,
                geographyList: [],
                regionList: [],
                brandList: [],
                subBrandList: [],
                tacticList: {},
                graphData: {},
            });
        case DV_GET_REGION_LIST:
            return Object.assign({}, state, {
                ...state,
                regionList: action.payload.items,
                brandList: [],
                subBrandList: [],
                tacticList: {},
                graphData: {},
            });
        case DV_GET_REGION_LIST_ERROR:
            return Object.assign({}, state, {
                ...state,
                regionList: [],
                brandList: [],
                subBrandList: [],
                tacticList: {},
                graphData: {},
            });
        case DV_GET_BRAND_LIST:
            return Object.assign({}, state, {
                ...state,
                brandList: action.payload.items,
                subBrandList: [],
                tacticList: {},
                graphData: {},
            });
        case DV_GET_BRAND_LIST_ERROR:
            return Object.assign({}, state, {
                ...state,
                brandList: [],
                subBrandList: [],
                tacticList: {},
                graphData: {},
            });
        case DV_GET_SUBBRAND_LIST:
            return Object.assign({}, state, {
                ...state,
                subBrandList: action.payload.items,
                tacticList: {},
                graphData: {},
            });
        case DV_GET_SUBBRAND_LIST_ERROR:
            return Object.assign({}, state, {
                ...state,
                subBrandList: [],
                tacticList: {},
                graphData: {},
            });
        case DV_GET_TACTIC_LIST:
            return Object.assign({}, state, {
                ...state,
                tacticList: action.payload,
                graphData: {},
            });
        case DV_GET_TACTIC_LIST_ERROR:
            return Object.assign({}, state, {
                ...state,
                tacticList: {},
                graphData: {},
            });
        case DV_GET_GRAPH_DATA:
            return Object.assign({}, state, {
                ...state,
                graphData: action.payload,
                setGraphData: true,
            });
        case DV_GET_GRAPH_DATA_ERROR:
            return Object.assign({}, state, {
                ...state,
                graphData: {},
                setGraphData: true,
            });
        case DV_GET_BRAND_LIST1:
            return Object.assign({}, state, {
                ...state,
                brandList1: action.payload.items,
                subBrandList1: [],
                tacticList1: [],
                graphData11: {},
                graphData12: {},
                graphData13: {},
            });
        case DV_GET_BRAND_LIST1_ERROR:
            return Object.assign({}, state, {
                ...state,
                brandList1: [],
                subBrandList1: [],
                tacticList1: [],
                graphData11: {},
                graphData12: {},
                graphData13: {},
            });
        case DV_GET_SUBBRAND_LIST1:
            return Object.assign({}, state, {
                ...state,
                subBrandList1: action.payload.items,
                tacticList1: [],
                graphData11: {},
                graphData12: {},
                graphData13: {},
            });
        case DV_GET_SUBBRAND_LIST1_ERROR:
            return Object.assign({}, state, {
                ...state,
                subBrandList1: [],
                tacticList1: [],
                graphData11: {},
                graphData12: {},
                graphData13: {},
            });
        case DV_GET_TACTIC_LIST1:
            return Object.assign({}, state, {
                ...state,
                tacticList1: action.payload.items,
                graphData11: {},
                graphData12: {},
                graphData13: {},
            });
        case DV_GET_TACTIC_LIST1_ERROR:
            return Object.assign({}, state, {
                ...state,
                tacticList: [],
                graphData11: {},
                graphData12: {},
                graphData13: {},
            });
        case DV_GET_GRAPH_DATA11:
            return Object.assign({}, state, {
                ...state,
                graphData11: action.payload,
                setGraphData11: true,
            });
        case DV_GET_GRAPH_DATA11_ERROR:
            return Object.assign({}, state, {
                ...state,
                graphData11: {},
                setGraphData11: true,
            });
        case DV_GET_GRAPH_DATA12:
            return Object.assign({}, state, {
                ...state,
                graphData12: action.payload,
                setGraphData12: true,
            });
        case DV_GET_GRAPH_DATA12_ERROR:
            return Object.assign({}, state, {
                ...state,
                graphData12: {},
                setGraphData12: true,
            });
        case DV_GET_GRAPH_DATA13:
            return Object.assign({}, state, {
                ...state,
                graphData13: action.payload,
                setGraphData13: true,
            });
        case DV_GET_GRAPH_DATA13_ERROR:
            return Object.assign({}, state, {
                ...state,
                graphData13: {},
                setGraphData13: true,
            });
        case DV_GET_BRAND_LIST2:
            return Object.assign({}, state, {
                ...state,
                brandList2: action.payload.items,
                subBrandList2: [],
                tacticList2: {},
                graphData21: {},
                graphData22: {},
                graphData23: {},
            });
        case DV_GET_BRAND_LIST2_ERROR:
            return Object.assign({}, state, {
                ...state,
                brandList2: [],
                subBrandList2: [],
                tacticList2: {},
                graphData21: {},
                graphData22: {},
                graphData23: {},
            });
        case DV_GET_SUBBRAND_LIST2:
            return Object.assign({}, state, {
                ...state,
                subBrandList2: action.payload.items,
                tacticList2: {},
                graphData21: {},
                graphData22: {},
                graphData23: {},
            });
        case DV_GET_SUBBRAND_LIST2_ERROR:
            return Object.assign({}, state, {
                ...state,
                subBrandList2: [],
                tacticList2: {},
                graphData21: {},
                graphData22: {},
                graphData23: {},
            });
        case DV_GET_TACTIC_LIST2:
            return Object.assign({}, state, {
                ...state,
                tacticList2: action.payload,
                graphData21: {},
                graphData22: {},
                graphData23: {},
            });
        case DV_GET_TACTIC_LIST2_ERROR:
            return Object.assign({}, state, {
                ...state,
                tacticList2: {},
                graphData21: {},
                graphData22: {},
                graphData23: {},
            });
        case DV_GET_GRAPH_DATA21:
            return Object.assign({}, state, {
                ...state,
                graphData21: action.payload,
                setGraphData21: true,
            });
        case DV_GET_GRAPH_DATA21_ERROR:
            return Object.assign({}, state, {
                ...state,
                graphData21: {},
                setGraphData21: true,
            });
        case DV_GET_GRAPH_DATA22:
            return Object.assign({}, state, {
                ...state,
                graphData22: action.payload,
                setGraphData22: true,
            });
        case DV_GET_GRAPH_DATA22_ERROR:
            return Object.assign({}, state, {
                ...state,
                graphData22: {},
                setGraphData22: true,
            });
        case DV_GET_GRAPH_DATA23:
            return Object.assign({}, state, {
                ...state,
                graphData23: action.payload,
                setGraphData23: true,
            });
        case DV_GET_GRAPH_DATA23_ERROR:
            return Object.assign({}, state, {
                ...state,
                graphData23: {},
                setGraphData23: true,
            });
        case DV_GET_SET_GRAPH:
            return Object.assign({}, state, {
                ...state,
                setGraphData: false,
            });
        case DV_GET_SET_GRAPH1:
            return Object.assign({}, state, {
                ...state,
                setGraphData11: false,
                setGraphData12: false,
                setGraphData13: false,
            });
        case DV_GET_SET_GRAPH2:
            return Object.assign({}, state, {
                ...state,
                setGraphData21: false,
                setGraphData22: false,
                setGraphData23: false,
            });
            
        default: 
        return state
    }
}