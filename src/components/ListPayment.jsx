import React from 'react'
import {toDate} from '../utils/toDate'
import {toCurrency} from '../utils/money'
import { useHistory } from 'react-router-dom'


export const ListPayment = ({payment}) => {
    const history = useHistory()
    const editHandler = event => {
        event.preventDefault()
        history.push(`/edit/${payment.id}`)
    }

    return(
        <tr className={payment.type} onClick={editHandler}>
            <td>{payment.category}</td>
            <td>{toCurrency(payment.amount)}</td>
            <td>{toDate(payment.date)}</td>
        </tr>
)}