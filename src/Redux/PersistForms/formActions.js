import { SET_CUSTOMER_FORM, SET_JOB_FORM, SET_CLAIM_FORM, SET_DEPOSIT_FORM, RESET_CUSTOMER_FORM, RESET_JOB_FORM, RESET_CLAIM_FORM, RESET_DEPOSIT_FORM } from "./formConstants";

export const setCustomerForm = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_CUSTOMER_FORM,
            payload: data
        });
    };
};
export const resetCustomerForm = () => {
    return async (dispatch) => {
        dispatch({
            type: RESET_CUSTOMER_FORM
        })
    }
}

export const setJobForm = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_JOB_FORM,
            payload: data
        });
    };
};
export const resetJobForm = () => {
    return async (dispatch) => {
        dispatch({
            type: RESET_JOB_FORM
        })
    }
}

export const setClaimForm = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_CLAIM_FORM,
            payload: data
        });
    };
};
export const resetClaimForm = () => {
    return async (dispatch) => {
        dispatch({
            type: RESET_CLAIM_FORM
        })
    }
}

export const setDepositForm = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_DEPOSIT_FORM,
            payload: data
        });
    };
};

export const resetDepositForm = () => {
    return async (dispatch) => {
        dispatch({
            type: RESET_DEPOSIT_FORM
        })
    }
}