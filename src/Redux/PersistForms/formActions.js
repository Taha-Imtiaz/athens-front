import { SET_CUSTOMER_FORM, SET_JOB_FORM, SET_CLAIM_FORM, SET_DEPOSIT_FORM, RESET_CUSTOMER_FORM, RESET_JOB_FORM, RESET_CLAIM_FORM, RESET_DEPOSIT_FORM } from "./formConstants";

export var setCustomerForm = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_CUSTOMER_FORM,
            payload: data
        });
    };
};
export var resetCustomerForm = () => {
    return async (dispatch) => {
        dispatch({
            type: RESET_CUSTOMER_FORM
        })
    }
}

export var setJobForm = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_JOB_FORM,
            payload: data
        });
    };
};
export var resetJobForm = () => {
    return async (dispatch) => {
        dispatch({
            type: RESET_JOB_FORM
        })
    }
}

export var setClaimForm = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_CLAIM_FORM,
            payload: data
        });
    };
};
export var resetClaimForm = () => {
    return async (dispatch) => {
        dispatch({
            type: RESET_CLAIM_FORM
        })
    }
}

export var setDepositForm = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_DEPOSIT_FORM,
            payload: data
        });
    };
};

export var resetDepositForm = () => {
    return async (dispatch) => {
        dispatch({
            type: RESET_DEPOSIT_FORM
        })
    }
}