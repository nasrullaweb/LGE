import { GB_AJAX_CALL_BEGIN, GB_AJAX_CALL_ERROR, GB_AJAX_CALL_SUCCESS } from './actionType'

const initialState = {
    GBajaxCallsInProgress: 0
}

export default function GBajaxStatusReducer (state = initialState.GBajaxCallsInProgress, action) {
    switch (action.type) {
        case GB_AJAX_CALL_BEGIN:
            return state + 1
        case GB_AJAX_CALL_ERROR:
            return state - 1
        case GB_AJAX_CALL_SUCCESS:
            return state - 1
        default:
            return state
    }
}