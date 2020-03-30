import React, { useContext, useEffect } from 'react'
import { ListPayment } from '../components/ListPayment'
import { BudgetContext } from '../context/budgetContext'
import { Loader } from '../components/Loader'

export const History = () => {
    const {loading, payments, fetchPayments} = useContext(BudgetContext)

    useEffect(() => {
        if (!payments.length){
            fetchPayments()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading){
        return <Loader/>
    }
    
    if (!payments.length) {
        return (
            <div  className="center-align" style={{marginTop: '3rem'}}>
                <h4>You have not yet made payments</h4>
            </div>
        )
    }
    return (
        <table className="highlight">
        <thead>
          <tr>
              <th>Category</th>
              <th>Amout</th>
              <th>Date</th>
          </tr>
        </thead>

        <tbody>
            {
                payments
                    .sort(function(a, b){
                        return  new Date(b.date) - new Date(a.date)
                    })
                    .map(payment => (<ListPayment key={payment.id} payment={payment}/>))
            }
        </tbody>
      </table>
    )
}