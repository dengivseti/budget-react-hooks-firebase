import React, { useContext } from 'react'
import { Form } from '../components/Form'
import { BudgetContext } from '../context/budgetContext'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../hooks/message.hook'

export const Add = () => {
    const {addPayment} = useContext(BudgetContext)
    const message = useMessage()
    const history = useHistory()

    const saveHandler = (payment) => {
        addPayment(payment)
        message('Payment added')
    }

    return (
        <Form history={history} onSave={payment => saveHandler(payment)}/>
    )
}