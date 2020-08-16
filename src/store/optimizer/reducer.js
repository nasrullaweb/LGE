import { GET_BRANDS, GET_GEOGRAPHY, GET_PERIOD, GET_TACTICS, GET_SUB_BRANDS,
    GET_KEY_HIGHLIGHTS, GET_SPENDINGCOST_DATA, REVERT_SPENDINGCOST_DATA, POST_SIMULATE_DATA,
    GET_SIMULATED_DATA, CLEAR_DATA, GET_OPTIMIZATIONTYPE, RUN_SIMULATE_DATA, SAVEAS_SCENARIO, RESET_SCENARIO, 
    SET_LOADER_ICON, UNSET_LOADER_ICON, DISCARD_CHANGES
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
    optimizationTypeOptions: [],
    simulatedMsg: '',
    runSimulate: false,
    saveAsId: '',
    isOptimized: false,
    isSaved: false,
}

export default function optimizer (state = initialState, action = {}) {
    switch (action.type) {
        case GET_BRANDS:
            return Object.assign({}, state, {
                ...state,
                brandOptions: action.payload.items,
                geographyOptions: [],
                periodOptions: [],
                tacticsOptions: [],
                subBrandOptions: [],
                selectedBrand: [],
                runSimulate: false,
                isOptimized: false,
                isSaved: false,
            });
        case GET_GEOGRAPHY:
            return Object.assign({}, state, {
                ...state,
                geographyOptions: action.payload.items,
                periodOptions: [],
                tacticsOptions: [],
                subBrandOptions: [],
                runSimulate: false,
                isOptimized: false,
                isSaved: false,
            });
        case GET_PERIOD:
            return Object.assign({}, state, {
                ...state,
                periodOptions: action.payload.items,
                tacticsOptions: [],
                runSimulate: false,
                isOptimized: false,
                isSaved: false,
            });
        case GET_TACTICS:
            return Object.assign({}, state, {
                ...state,
                tacticsOptions: action.payload.items,
                runSimulate: false,
                isOptimized: false,
                isSaved: false,
            });
        case GET_OPTIMIZATIONTYPE:
                return Object.assign({}, state, {
                    ...state,
                    optimizationTypeOptions: action.payload.items,
                    runSimulate: false,
                    isOptimized: false,
                    isSaved: false,
                });
        case GET_SUB_BRANDS:
            return Object.assign({}, state, {
                ...state,
                subBrandOptions: action.payload.items,
                periodOptions: [],
                tacticsOptions: [],
                runSimulate: false,
                isOptimized: false,
                isSaved: false,
            });
        case GET_KEY_HIGHLIGHTS:
            return Object.assign({}, state, {
                ...state,
                keyHighlights: action.payload,
                runSimulate: false,
                isOptimized: false,
                isSaved: false,
            });
        case GET_SPENDINGCOST_DATA:
            return Object.assign({}, state, {
                ...state,
                spendData: action.payload,
                oldSpendData: JSON.parse(JSON.stringify(action.payload)),
                runSimulate: false,
                isOptimized: false,
                isSaved: false,
            });
        case REVERT_SPENDINGCOST_DATA:
            return Object.assign({}, state, {
                ...state,
                spendData: JSON.parse(JSON.stringify(action.payload)),
                runSimulate: false,
                isOptimized: false,
                isSaved: false,
            });
        case POST_SIMULATE_DATA:
            return Object.assign({}, state, {
                ...state,
                simulatedMsg: action.payload,
                runSimulate: false,
                isOptimized: false,
                isSaved: false,
            });
        case RUN_SIMULATE_DATA:
            return Object.assign({}, state, {
                ...state,
                simulatedMsg: '',
                spendData: [],
                oldSpendData: [],
                keyHighlights: [],
                runSimulate: true,
                setLoader: true,
                isSaved: false,
            });
        case GET_SIMULATED_DATA:
            return Object.assign({}, state, {
                ...state,
                brandOptions: action.payload.brands,
                geographyOptions: action.payload.geographies,
                periodOptions: action.payload.periods,
                tacticsOptions: action.payload.tactics,
                subBrandOptions: action.payload.subBrands,
                optimizationTypeOptions: action.payload.optimisationType,
                spendData: getNestedChildren(action.payload.spends),
                oldSpendData: JSON.parse(JSON.stringify(getNestedChildren(action.payload.spends))),
                keyHighlights: action.payload.keyHighlights,
                selectedBrand: action.payload.selectedBrands,
                selectedGeography: action.payload.selectedGeographies,
                selectedPeriod: action.payload.selectedPeriods,
                selectedtactic: action.payload.selectedTactics,
                selectedSubBrand: action.payload.selectedSubBrands,
                selectedOptimisationType: action.payload.selectedOptimisationType,
                selectedOptimisationTypeValues: action.payload.selectedOptimisationTypeValues,
                simulatedMsg: '',
                runSimulate: false,
                setLoader: false,
                isOptimized: true,
                isSaved: action.isSaved,
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
                optimizationTypeOptions: [],
                simulatedMsg: '',
                runSimulate: false,
                setLoader: false,
                isOptimized: false,
                isSaved: false,
            }); 
            
        case SAVEAS_SCENARIO:
            return Object.assign({}, state, {
                ...state,
                saveAsId: action.newId,
                saveAsName: action.newName,
                runSimulate: false,
                setLoader: false,
                isOptimized: false,
                isSaved: true,
            });  

        case RESET_SCENARIO:
            return Object.assign({}, state, {
                ...state,
                saveAsId: '',
                runSimulate: false,
                setLoader: false,
                isOptimized: false,
                isSaved: false,
            });

        case SET_LOADER_ICON:
            return Object.assign({}, state, {
                ...state,
                spendData: [],
                oldSpendData: [],
                setLoader: true,
                isOptimized: false,
                isSaved: false,
            }); 
        case UNSET_LOADER_ICON:
            return Object.assign({}, state, {
                ...state,
                spendData: [],
                oldSpendData: [],
                setLoader: false,
                isOptimized: false,
                isSaved: false,
            });   
            
        default: 
        return state
    }
}