import { DV_AJAX_CALL_BEGIN, DV_AJAX_CALL_ERROR, DV_AJAX_CALL_SUCCESS } from './actionType'

export function ajaxCallBegin() {
    return {type: DV_AJAX_CALL_BEGIN};
}

export function ajaxCallError() {
    return {type: DV_AJAX_CALL_ERROR};
}

export function ajaxCallSuccess() {
    return {type: DV_AJAX_CALL_SUCCESS};
}