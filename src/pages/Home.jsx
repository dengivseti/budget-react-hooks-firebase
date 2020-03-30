import React, { useContext, useEffect } from 'react'
import { Info } from '../components/Info'
import { BudgetContext } from '../context/budgetContext'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/authContext'



export const Home = () => {
    const {loading, balance, revenue, expense, fetchPayments} = useContext(BudgetContext)
    const {userId} = useContext(AuthContext)


    useEffect(() => {
        fetchPayments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])

    if (loading) {
        return <Loader/>
    }
    return (
        <Info value={{balance, expense, revenue}}/>
    )
}