import { ADD_PAYMENT, START_LOADING, FETCHED_PAYMENT, EDIT_PAYMENT, REMOVE_PAYMENT } from "./types"


const handlers = {
    [START_LOADING]: state => ({...state, loading: true}),
    [ADD_PAYMENT]: (state, {payload}) => ({...state, payments: [...state.payments, payload]}),
    [EDIT_PAYMENT]: (state, {payload}) => ({...state, payments: payload}),
    [REMOVE_PAYMENT]: (state, {payload}) => ({
        ...state, 
        payments: state.payments.filter(payment => payment.id !== payload)
    }),
    [FETCHED_PAYMENT]: (state, {payload}) => ({
        ...state, 
        loading: false,
        payments: payload.payments, 
        balance: payload.total,
        revenue: payload.totalRevenue,
        expense: payload.totalExpense
    }),
    DEFAULT: state => state
}

export const budgetReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}