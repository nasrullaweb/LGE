import { RV_AJAX_CALL_BEGIN, RV_AJAX_CALL_ERROR, RV_AJAX_CALL_SUCCESS } from './actionType'

const initialState = {
    RVajaxCallsInProgress: 0
}

export default function RVajaxStatusReducer (state = initialState.RVajaxCallsInProgress, action) {
    switch (action.type) {
        case RV_AJAX_CALL_BEGIN:
            return state + 1
        case RV_AJAX_CALL_ERROR:
            return state - 1
        case RV_AJAX_CALL_SUCCESS:
            return state - 1
        default:
            return state
    }
}