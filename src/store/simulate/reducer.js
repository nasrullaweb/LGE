import { GET_BRANDS, GET_GEOGRAPHY, GET_PERIOD, GET_TACTICS, GET_SUB_BRANDS,
    GET_KEY_HIGHLIGHTS, GET_SPENDINGCOST_DATA, REVERT_SPENDINGCOST_DATA, POST_SIMULATE_DATA,
    GET_SIMULATED_DATA, CLEAR_DATA, RUN_SIMULATE_DATA, SAVEAS_SCENARIO, RESET_SCENARIO, REMOVE_SIMULATED_MSG
 } from './actionType'

 import { getNestedChildren } from './actionCreator'

export const initialState = {
    brandOptions: [],
    geographyOptions: [],
    periodOptions: [],
    tacticsOptions: [],
    subBrandOptions: [],
    spendData: [],
    oldSpendData: [],
    keyHighlights: [],
    simulatedMsg: '',
    runSimulate: false,
    saveAsId: '',
    profitROI: 0,
    fixedTactics: [],
}

export default function simulate (state = initialState, action = {}) {
    switch (action.type) {
        case GET_BRANDS:
            return Object.assign({}, state, {
                ...state,
                brandOptions: action.payload.items,
                geographyOptions: [],
                periodOptions: [],
                tacticsOptions: [],
                subBrandOptions: [],
                runSimulate: false,
            });
        case GET_GEOGRAPHY:
            return Object.assign({}, state, {
                ...state,
                geographyOptions: action.payload.items,
                periodOptions: [],
                tacticsOptions: [],
                subBrandOptions: [],
                runSimulate: false,
            });
        case GET_PERIOD:
            return Object.assign({}, state, {
                ...state,
                periodOptions: action.payload.items,
                tacticsOptions: [],
                runSimulate: false,
            });
        case GET_TACTICS:
            return Object.assign({}, state, {
                ...state,
                tacticsOptions: action.payload.items,
                runSimulate: false,
            });
        case GET_SUB_BRANDS:
            return Object.assign({}, state, {
                ...state,
                subBrandOptions: action.payload.items,
                periodOptions: [],
                tacticsOptions: [],
                runSimulate: false,
            });
        case GET_KEY_HIGHLIGHTS:
            return Object.assign({}, state, {
                ...state,
                keyHighlights: action.payload,
                runSimulate: false,
            });
        case GET_SPENDINGCOST_DATA:
            return Object.assign({}, state, {
                ...state,
                spendData: action.payload,
                oldSpendData: JSON.parse(JSON.stringify(action.payload)),
                fixedTactics: action.fixedTactics,
                runSimulate: false,
            });
        case REVERT_SPENDINGCOST_DATA:
            return Object.assign({}, state, {
                ...state,
                spendData: JSON.parse(JSON.stringify(action.payload)),
                runSimulate: false,
            });
        case POST_SIMULATE_DATA:
            return Object.assign({}, state, {
                ...state,
                simulatedMsg: action.payload,
                runSimulate: false,
            });
        case RUN_SIMULATE_DATA:
            return Object.assign({}, state, {
                ...state,
                simulatedMsg: action.msg,
                spendData: getNestedChildren(action.spenData),
                oldSpendData: JSON.parse(JSON.stringify(getNestedChildren(action.spenData))),
                keyHighlights: action.keyHighlights,
                runSimulate: true,
            });
        case GET_SIMULATED_DATA:
            return Object.assign({}, state, {
                ...state,
                brandOptions: action.payload.brands,
                geographyOptions: action.payload.geographies,
                periodOptions: action.payload.periods,
                tacticsOptions: action.payload.tactics,
                subBrandOptions: action.payload.subBrands,
                spendData: getNestedChildren(action.payload.spends),
                oldSpendData: JSON.parse(JSON.stringify(getNestedChildren(action.payload.spends))),
                keyHighlights: action.payload.keyHighlights,
                selectedBrand: action.payload.selectedBrands,
                selectedGeography: action.payload.selectedGeographies,
                selectedPeriod: action.payload.selectedPeriods,
                selectedtactic: action.payload.selectedTactics,
                selectedSubBrand: action.payload.selectedSubBrands,
                fixedTactics: action.payload.fixedTactics,
                simulatedMsg: '',
                runSimulate: false,
                profitROI: action.payload.profitROI
            });
        case CLEAR_DATA:
            return Object.assign({}, state, {
                ...state,
                brandOptions: [],
                geographyOptions: [],
                periodOptions: [],
                tacticsOptions: [],
                subBrandOptions: [],
                spendData: [],
                oldSpendData: [],
                keyHighlights: [],
                fixedTactics: [],
                simulatedMsg: '',
                runSimulate: false,
                saveAsId: '',
                saveAsName: '',
            });  

        case SAVEAS_SCENARIO:
            return Object.assign({}, state, {
                ...state,
                saveAsId: action.newId,
                runSimulate: false,
                saveAsName: action.newName,
            });  

        case RESET_SCENARIO:
            return Object.assign({}, state, {
                ...state,
                saveAsId: '',
                runSimulate: false,
            });

        case REMOVE_SIMULATED_MSG:
            return Object.assign({}, state, {
                ...state,
                simulatedMsg: ''
            });
            
        default: 
        return state
    }
}