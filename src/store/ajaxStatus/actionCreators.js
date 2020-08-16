import { AJAX_CALL_BEGIN, AJAX_CALL_ERROR, AJAX_CALL_SUCCESS } from './actionType'

export function ajaxCallBegin() {
    return {type: AJAX_CALL_BEGIN};
}

export function ajaxCallError() {
    return {type: AJAX_CALL_ERROR};
}

export function ajaxCallSuccess() {
    return {type: AJAX_CALL_SUCCESS};
}