import { GET_SCENARIOS, GET_MODEL_LIST, POST_SCENARIO, RESET_SCENARIO, Delete_SCENARIOS, GET_USERS_LIST, SHARE_SCENARIO } from './actionType'

export const initialState = {
    scenarioList: [],
    modelList: [],
    addedId: '',
    addedModal: '',
    addedIsSimulatorOptimiser: '',
    addedIsSimulated: false,
    usersList: '',
}

export default function scenario (state = initialState, action = {}) {
    switch (action.type) {
        case GET_SCENARIOS:
            return Object.assign({}, state, {
                ...state,
                scenarioList: action.payload.items
            });
        case GET_MODEL_LIST:
            return Object.assign({}, state, {
                ...state,
                modelList: action.payload.models
            });
        case GET_USERS_LIST:
            return Object.assign({}, state, {
                ...state,
                usersList: action.payload.userNames
            });
        case POST_SCENARIO:
            return Object.assign({}, state, {
                ...state,
                addedId: action.newId,
                addedModal: action.newModal,
                addedIsSimulated: action.isSimulated ? true : false,
                addedIsSimulatorOptimiser: action.isSimulatorOptimiser,
            });
        case RESET_SCENARIO:
            return Object.assign({}, state, {
                ...state,
                addedId: '',
                addedModal: '',
                addedIsSimulated: false,
                addedIsSimulatorOptimiser: ''
            });
        case SHARE_SCENARIO:
            return Object.assign({}, state, {
                ...state,
                shareScenarioTxt: 'Successfully Shared',
            });
        case Delete_SCENARIOS:
            return Object.assign({}, state, {
                ...state,
                addedId: ''
            });
        default: 
        return state
    }
}