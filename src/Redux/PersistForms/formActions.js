import { SET_CUSTOMER_FORM, SET_JOB_FORM, SET_CLAIM_FORM, SET_DEPOSIT_FORM } from "./formConstants";

export var setCustomerForm = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_CUSTOMER_FORM,
            payload: data
        });
    };
};

export var setJobForm = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_JOB_FORM,
            payload: data
        });
    };
};

export var setClaimForm = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_CLAIM_FORM,
            payload: data
        });
    };
};

export var setDepositForm = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_DEPOSIT_FORM,
            payload: data
        });
    };
};