import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <div className="text-center">
            <h4> Dashboard</h4>
            <div className="list-group">
                <NavLink to="/dashboard/user" className="list-group-item list-group-item-action">Profile</NavLink>
            </div>
        </div>
    )
}

export default UserMenu;
