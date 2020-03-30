import { useState, useCallback } from "react"
import axios from "axios"


const apiKey = process.env.REACT_APP_API_KEY
const url = process.env.REACT_APP_BD_URL

export const useFirebase = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const auth = useCallback(async (email, password, isRegistration = false) => {
        setLoading(true)
        const authData = {
            email, password, 
            returnSecureToken: true
        }
        try {
            let res = null
            if (isRegistration){
                res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, authData)
            }else{
                res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, authData)
            }
            const data = res.data
            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
            setLoading(false)
            const result = {token: data.idToken, userId: data.localId, expirationDate: expirationDate}
            return result
        } catch (e) {
            setLoading(false)
            setError(e.response.data.error.message)
            throw new Error(e.response.data.error.message)
        }
    }, [])

    const getBase = useCallback(async (userId, token) => {
        try {
            setLoading(true)
            const res = await axios.get(`${url}/${userId}/budgets.json?auth=${token}`)
            setLoading(false)
            return res.data || []
        } catch (e) {
            setLoading(false)
            setError(e.response.data.error.message)
            throw new Error(e.response.data.error.message)
        }
    }, [])

    const addInBase = useCallback(async (userId, token, payload) => {
        try {
            setLoading(true)
            const res = await axios.post(`${url}/${userId}/budgets.json?auth=${token}`, payload)
            setLoading(false)
            return res.data
        } catch (e) {
            setLoading(false)
            setError(e.response.data.error.message)
            throw new Error(e.response.data.error.message)
        }
    }, [])

    const getIdBase = useCallback(async (userId, token, id) => {
        try {
            setLoading(true)
            const res = await axios.get(`${url}/${userId}/budgets/${id}.json?auth=${token}`)
            setLoading(false)
            return res.data
        } catch (e) {
            setLoading(false)
            setError(e.response.data.error.message)
            throw new Error(e.response.data.error.message)
        }
    }, [])

    const editIdBase = useCallback(async (userId, token, id, payload) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${url}/${userId}/budgets/${id}.json?auth=${token}`, payload)
            setLoading(false)
            return res.data
        } catch (e) {
            setLoading(false)
            setError(e.response.data.error.message)
            throw new Error(e.response.data.error.message)
        }
    }, [])

    const removeIdBase = useCallback(async (userId, token, id) => {
        try {
            setLoading(true)
            const res = await axios.delete(`${url}/${userId}/budgets/${id}.json?auth=${token}`)
            setLoading(false)
            return res.data
        } catch (e) {
            setLoading(false)
            setError(e.response.data.error.message)
            throw new Error(e.response.data.error.message)
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, error, auth, clearError, getBase, getIdBase, editIdBase, removeIdBase, addInBase}
}