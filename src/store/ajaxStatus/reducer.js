import { AJAX_CALL_BEGIN, AJAX_CALL_ERROR, AJAX_CALL_SUCCESS } from './actionType'

const initialState = {
    ajaxCallsInProgress: 0
}

export default function ajaxStatusReducer (state = initialState.ajaxCallsInProgress, action) {
    switch (action.type) {
        case AJAX_CALL_BEGIN:
            return state + 1
        case AJAX_CALL_ERROR:
            return state - 1
        case AJAX_CALL_SUCCESS:
            return state - 1
        default:
            return state
    }
}