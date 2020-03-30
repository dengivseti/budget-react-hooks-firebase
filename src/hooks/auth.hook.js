import { useState, useCallback, useEffect } from "react"
const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [expirationDate, setExpirationDate] = useState(null)
    const [ready, setReady] = useState(null)

    const login = useCallback((tokenFire, id, date) =>{
        setToken(tokenFire)
        setUserId(id)
        setExpirationDate(date)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: tokenFire, expirationDate: date
        }))
    }, [])

    const logout = useCallback(() =>{
        setToken(null)
        setUserId(null)
        setExpirationDate(null)
        localStorage.removeItem(storageName)
    }, [])


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            const expirationDate = new Date(data.expirationDate)
            if (expirationDate <= new Date()) {
                logout()
            } else{
                login(data.token, data.userId, data.expirationDate)
            }
        }
        setReady(true)
    }, [login, logout])

    return {login, logout, token, userId, expirationDate, ready}
}