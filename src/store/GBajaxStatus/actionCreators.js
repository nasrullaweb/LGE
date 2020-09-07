import { GB_AJAX_CALL_BEGIN, GB_AJAX_CALL_ERROR, GB_AJAX_CALL_SUCCESS } from './actionType'

export function ajaxCallBeginGB() {
    return {type: GB_AJAX_CALL_BEGIN};
}

export function ajaxCallErrorGB() {
    return {type: GB_AJAX_CALL_ERROR};
}

export function ajaxCallSuccessGB() {
    return {type: GB_AJAX_CALL_SUCCESS};
}