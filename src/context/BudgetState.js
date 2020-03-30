import React, { useReducer, useEffect} from 'react'
import { budgetReducer } from './budgetReducer'
import { useFirebase } from '../hooks/firebase.hook'
import { BudgetContext } from './budgetContext'
import { ADD_PAYMENT, START_LOADING, FETCHED_PAYMENT, EDIT_PAYMENT, REMOVE_PAYMENT } from './types'
import { useMessage } from '../hooks/message.hook'


export const BudgetState = ({children, userId, token}) => {
    const {error, clearError, getBase, editIdBase, removeIdBase, addInBase} = useFirebase()
    const message = useMessage()
    const initialState = {
        loading: false,
        payments: [],
        revenue: 0,
        expense: 0,
        balance: 0,
        payment: []
    }

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const fetchPayments = async () => {
        if (!userId){
            return
        }
        loading()
        const payments = []
        let total = 0
        let totalExpense = 0
        let totalRevenue = 0
        try {
            const response = await getBase(userId, token)
            if (!response){
                succsessPayments(payments, total, totalExpense, totalRevenue)
            }
            Object.keys(response).forEach((key) => {
                payments.push({
                    id: key,
                    ...response[key]
                })
                if (response[key].type === 'expense') {
                    totalExpense += response[key].amount
                }else{
                    totalRevenue += response[key].amount
                }
            })
            total = totalRevenue - totalExpense
            succsessPayments(payments, total, totalExpense, totalRevenue)
        } catch (e) {}
    }

    const succsessPayments = (payments, total, totalExpense, totalRevenue) => {
        dispatch({
            type: FETCHED_PAYMENT,
            payload: {payments, total, totalExpense, totalRevenue}
        })
    }

    const addPayment = async (payment) => {
        try {
            const res = await addInBase(userId, token, payment)
            const payload = {
                ...payment,
                id: res.name
            }
            dispatch({type: ADD_PAYMENT, payload})
        } catch (e) {}
    }

    const removePayment = async (id) => {
        try {
            await removeIdBase(userId, token, id)
            dispatch({type: REMOVE_PAYMENT, payload: id})
        } catch (e) {}
    }

    const editPayment = async (id, payment) => {
        try {
            await editIdBase(userId, token, id, payment)
            const paymentOld = state.payments.filter(payment => payment.id !== id)
            const payload = [
                ...paymentOld,
                {...payment, id}
            ]
            dispatch({type: EDIT_PAYMENT, payload})
        } catch (e) {}
    }

    const loading = () => {
        dispatch({type: START_LOADING})
    }

    return (
        <BudgetContext.Provider value={{
            addPayment, fetchPayments, editPayment, removePayment,
            loading: state.loading,
            payments: state.payments,
            revenue: state.revenue,
            expense: state.expense,
            balance: state.balance
            }}>
            {children}
        </BudgetContext.Provider>
    )
}