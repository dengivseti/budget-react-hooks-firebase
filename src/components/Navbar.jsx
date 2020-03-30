import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }
    return (
        <nav>
            <div className="nav-wrapper teal darken-4">
            <span className="brand-logo hide-on-med-and-down">Home Budget</span>
            <ul  className="right" >
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/history">History</NavLink></li>
                <li><NavLink exact to="/logout" onClick={logoutHandler} style={{ marginLeft: '2rem' }}>Logout</NavLink></li>
            </ul>
            </div>
        </nav>
    )
}