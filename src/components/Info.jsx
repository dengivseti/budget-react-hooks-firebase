import React from 'react'
import {toCurrency} from '../utils/money'

export const Info = ({value}) => {

    return (
        <div className="container">
        <div className="row center-align">
            <div className="col s12 m4 l4">
                <div className="card indigo darken-3">
                    <div className="card-content white-text">
                    <span className="card-title">Balance</span>
                    <strong>{toCurrency(value.balance)}</strong>
                    </div>
                </div>
            </div>

            <div className="col s12 m4 l4">
                <div className="card red darken-3">
                    <div className="card-content white-text">
                    <span className="card-title">Expense</span>
                    <strong>{toCurrency(value.expense)}</strong>
                    </div>
                </div>
            </div>

            <div className="col s12 m4 l4">
                <div className="card teal darken-3">
                    <div className="card-content white-text">
                    <span className="card-title">Revenue</span>
                    <strong>{toCurrency(value.revenue)}</strong>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}