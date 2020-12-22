import { GET_CUSTOMER_FORM, SET_CUSTOMER_FORM, GET_JOB_FORM, SET_JOB_FORM, GET_CLAIM_FORM, SET_CLAIM_FORM, SET_DEPOSIT_FORM, GET_DEPOSIT_FORM } from "./formConstants"
import { EditorState } from 'draft-js';


var initialState = {
    addCustomerForm: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        subContacts: [
            {
                name: "",
                phone: "",
                email: ""
            }
        ],
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        phoneNumberError: "",
        subContactPhoneError: "",
        subContactEmailError: ""
    },
    addJobForm: {
        editorState: EditorState.createEmpty(),
        title: "",
        description: "",
        services: [],
        customerId: "",
        startDate: "",
        dates: [new Date()],
        startTime: "",
        anchorEl: "",
        meetTime: "",
        assigneeRequired: "",
        from: "",
        to: "",
        customerIdError: "",
        titleError: "",
        descriptionError: "",
        multiError: "",
        dateError: "",
        timeError: "",
        assigneeError: "",
        locationfromError: "",
        locationtoError: "",
        assigneeList: [],
        jobType: "Fixed",
        status: "pending",
        note: [],
        assigneesId: [],
        add: 1,
        locations: [
            { type: "pickup", value: "", default: false },
            { type: "dropoff", value: "", default: false },
        ],
        fromTo: [],
        assigneeRequiredError: "",
        selectedDate: new Date(),
        newService: "",
        customers: [],
        selectedCustomer: "",
        newCustomer: "",
        showAddCustomer: false,
        serviceOptions : [
            { id: 1, name: "Packaging" },
            { id: 2, name: "Loading" },
            { id: 3, name: "Unloading" },
            { id: 4, name: "Grand Piano" },
            { id: 5, name: "Baby" },
            { id: 6, name: "Hot Tub" },
          ]
    },
    addClaimForm: {
        customerId: "",
        jobId: "",
        claims: {
            claimType: "",
            price: "",
            description: ""
        },
        item: "",
        price: "",
        fromDate: "",
        toDate: "",
        locationfrom: "",
        locationto: "",
        customerIdError: "",
        jobIdError: "",
        itemError: "",
        priceError: "",
        descriptionError: "",
        fromDateError: "",
        toDateError: "",
        locationfromError: "",
        locationtoError: "",
        inputValues: "",
        inputValue: "",
        customers: [],
        jobs: [],
        selectedCustomer: "",
        selectedJob: "",
        titleError: "",
        title: "",
        waitToError: "",
        waitTo: "",
        
        customerClaims: false,
    },
    addDepositForm: {
        quantity: "",
        cost: "",
        customers: [],
        jobs: [],
        selectedCustomer: "",
        selectedJob: "",
        customerIdError: "",
        jobIdError: "",
        quantityError: "",
        costError: "",
        disabled: true,
    },
};
var formsReducer = (state = initialState, action) => {
    var { type, payload } = action;
    switch (type) {
        // CUSTOMER
        case SET_CUSTOMER_FORM:
            return { ...state, addCustomerForm: payload };
        case GET_CUSTOMER_FORM:
            return { ...payload.addCustomerForm };

        // JOB
        case SET_JOB_FORM:
            return { ...state, addJobForm: payload };
        case GET_JOB_FORM:
            return { ...payload.addJobForm };

        // CLAIM
        case SET_CLAIM_FORM:
            return { ...state, addClaimForm: payload };
        case GET_CLAIM_FORM:
            return { ...payload.addClaimForm };

        // BLANKET
        case SET_DEPOSIT_FORM:
            return { ...state, addDepositForm: payload };
        case GET_DEPOSIT_FORM:
            return { ...payload.addDepositForm };

        default:
            return state;
    }
};
export default formsReducer;
