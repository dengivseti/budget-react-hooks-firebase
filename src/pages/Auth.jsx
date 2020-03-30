import React, { useState, useEffect, useContext } from 'react'
import { useFirebase } from '../hooks/firebase.hook'
import { useMessage } from '../hooks/message.hook'
import { validateEmail } from '../utils/utils'
import { AuthContext } from '../context/authContext'


export const Auth = () => {
    const {login} = useContext(AuthContext)
    const {loading, auth, error, clearError} = useFirebase()
    const message = useMessage()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const validationForm = (email, password) => {
        if (!email.trim()) {
            message('Input email')
            return false
        }
        if (!validateEmail(email)) {
            message('Input correct email')
            return false
        }
        if (!password.trim()) {
            message('Input password')
            return false
        }
        if (!(password.trim().length > 5)) {
            message('Password must be more than 6 characters')
            return false
        }
        return true
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const authHandler = async (event, isRegistration) => {
        event.preventDefault()
        if (!validationForm(form.email, form.password)) {
            return 
        }
        try {
            const data = await auth(form.email, form.password, isRegistration)
            if (isRegistration){
                message('You have successfully registered')
            }else{
                message('You have successfully logged in')
            }   
            login(data.token, data.userId, data.expirationDate)
        } catch (e) {}
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className="row center-align valign-wrapper add-height">
            <div className="col s10 offset-s1">
                <div className="card teal darken-3">
                <div className="card-content white-text">
                    <span className="card-title">Authentication</span>
                    <div>
                        <div className="input-field">
                            <input 
                                placeholder="Email" 
                                id="email" 
                                type="text" 
                                name="email"
                                onChange={changeHandler}
                                value={form.email}
                                disabled={loading}
                            />
                        </div>

                        <div className="input-field">
                            <input 
                                placeholder="Password" 
                                id="password" 
                                type="password" 
                                name="password"
                                onChange={changeHandler}
                                value={form.password}
                                disabled={loading}
                            />
                        </div>

                    </div>
                </div>
                <div className="card-action">
                    <button 
                        className="btn yellow darken-4" 
                        style={{margin:10}}
                        onClick={e => authHandler(e, false)}
                    >SIGN IN</button>
                    <button 
                        className="btn grey lighten-1 black-text"
                        onClick={e => authHandler(e, true)}
                    >SIGN UP</button>
                </div>
                </div>
            </div>
        </div>
    )
}