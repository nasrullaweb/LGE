import { RV_AJAX_CALL_BEGIN, RV_AJAX_CALL_ERROR, RV_AJAX_CALL_SUCCESS } from './actionType'

export function ajaxCallBegin() {
    return {type: RV_AJAX_CALL_BEGIN};
}

export function ajaxCallError() {
    return {type: RV_AJAX_CALL_ERROR};
}

export function ajaxCallSuccess() {
    return {type: RV_AJAX_CALL_SUCCESS};
}