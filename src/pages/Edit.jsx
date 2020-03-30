import React, { useContext } from 'react'
import { useParams, useHistory, Redirect } from 'react-router-dom'
import { BudgetContext } from '../context/budgetContext'
import {Form} from '../components/Form'
import { useMessage } from '../hooks/message.hook'

export const Edit = () => {
    const {payments, editPayment, removePayment} = useContext(BudgetContext)
    const history = useHistory()
    const linkId = useParams().id
    const payment = payments.find(payment => payment.id === linkId) || null
    const message = useMessage()
    if (!payment) {
        return <Redirect to="/history"/>
    }

    const saveHandler = (id, payment) => {
        editPayment(id, payment)
        message('Payment edit')
    }

    const deleteHandler = event => {
        event.preventDefault()
        removePayment(linkId)
        message('Payment delete')
    }

    return (
        <div>
            <Form payment={{...payment}} history={history} onSave={(payment, id)  => saveHandler(id, payment)}/>
            <p className="center-align">
                <a href="/" className="waves-effect waves-light btn-large red" onClick={deleteHandler}>Delete</a>
            </p>
        </div>
    )
}