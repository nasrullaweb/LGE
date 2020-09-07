import { DV_AJAX_CALL_BEGIN, DV_AJAX_CALL_ERROR, DV_AJAX_CALL_SUCCESS } from './actionType'

const initialState = {
    DVajaxCallsInProgress: 0
}

export default function DVajaxStatusReducer (state = initialState.DVajaxCallsInProgress, action) {
    switch (action.type) {
        case DV_AJAX_CALL_BEGIN:
            return state + 1
        case DV_AJAX_CALL_ERROR:
            return -1
        case DV_AJAX_CALL_SUCCESS:
            return 0
        default:
            return state
    }
}