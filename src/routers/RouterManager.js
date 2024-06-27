import React from 'react'
import { BrowserRouter } from 'react-router-dom'
//Routers
import RouterAdmin from './RouterAdmin'
import RouterGuest from './RouterGuest'
import RouterUser from './RouterUser'

const RouterManager = () => {
    const role = localStorage.getItem("role")

    const redirectGuest = () => {
        return <RouterGuest />
    }

    const redirectByRole = () => {
        if (role == "admin")
            return <RouterAdmin />
        else if (role == "user")
            return <RouterUser />
    }

    return (
        <BrowserRouter>
            {role ? redirectByRole() : redirectGuest()}
        </BrowserRouter>
    )
}

export default RouterManager