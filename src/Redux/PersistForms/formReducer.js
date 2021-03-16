import { GET_CUSTOMER_FORM, SET_CUSTOMER_FORM, GET_JOB_FORM, SET_JOB_FORM, GET_CLAIM_FORM, SET_CLAIM_FORM, SET_DEPOSIT_FORM, GET_DEPOSIT_FORM, RESET_CUSTOMER_FORM, RESET_JOB_FORM, RESET_CLAIM_FORM, RESET_DEPOSIT_FORM } from "./formConstants"
import { EditorState } from 'draft-js';


let initialState = {
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
        dates: [{ date: new Date(), time: new Date() }],
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
        jobType: "Hourly Based",
        status: "pending",
        note: [],
        assigneesId: [],
        add: 1,
        locations: [],
        fromTo: [],
        assigneeRequiredError: "",
        selectedDate: new Date(),
        newService: "",
        newProperty: "",
        customers: [],
        selectedCustomer: "",
        newCustomer: "",
        showAddCustomer: false,
        propertyType: '',
        price: "",
        trucks: [{ type: "", number: "" }],
        // truck: "",
        // truckSize: "None",
        serviceOptions: [
            { id: 1, name: "Packing" },
            { id: 2, name: "Loading" },
            { id: 3, name: "Unloading" },
            { id: 4, name: "Grand Piano" },
            { id: 5, name: "Baby" },
            { id: 6, name: "Hot Tub" },
        ],
        propertyOptions: [
            { id: 1, name: "House" },
            { id: 2, name: "Condominium" },
            { id: 3, name: "Duplex" },
            { id: 4, name: "Trailer" },
            { id: 5, name: "Office" },
            { id: 6, name: "Indoor Storage" },
            { id: 7, name: "Outdoor Storage" },
            { id: 8, name: "Town House" },
            { id: 9, name: "Apartment" }
        ],
        truckOptions: [
            "Pickup Truck",
            "Cargo Van",
            "15 ft truck",
            "17 ft truck",
            "20 ft truck",
            "26 ft truck"
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
const formsReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        // CUSTOMER
        case SET_CUSTOMER_FORM:
            return { ...state, addCustomerForm: payload };
        case GET_CUSTOMER_FORM:
            return { ...payload.addCustomerForm };
        case RESET_CUSTOMER_FORM:
            return { ...state, addCustomerForm: initialState.addCustomerForm }

        // JOB
        case SET_JOB_FORM:
            return { ...state, addJobForm: payload };
        case GET_JOB_FORM:
            return { ...payload.addJobForm };
        case RESET_JOB_FORM:
            return { ...state, addJobForm: initialState.addJobForm }

        // CLAIM
        case SET_CLAIM_FORM:
            return { ...state, addClaimForm: payload };
        case GET_CLAIM_FORM:
            return { ...payload.addClaimForm };
        case RESET_CLAIM_FORM:
            return { ...state, addClaimForm: initialState.addClaimForm }

        // BLANKET
        case SET_DEPOSIT_FORM:
            return { ...state, addDepositForm: payload };
        case GET_DEPOSIT_FORM:
            return { ...payload.addDepositForm };

        case RESET_DEPOSIT_FORM:
            return { ...state, addDepositForm: initialState.addDepositForm }
        default:
            return state;
    }
};
export default formsReducer;
