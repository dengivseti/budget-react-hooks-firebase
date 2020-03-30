import React from 'react'
import {NavLink} from 'react-router-dom'

export const ButtonAdd = () => {
    return (
        <div className="fixed-action-btn direction-top" style={{bottom: "60px", right: "35px"}}>
          <NavLink to="/add" className="btn-floating btn-large teal darken-4">+</NavLink>
        </div>
    )
}