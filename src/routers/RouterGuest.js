import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
//pages
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import Navbar from '../components/Navbar'

const RouterGuest = () => {
    const Layout = () => {
        return (
            <>
                <Navbar />
                <Outlet />
            </>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<LoginPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default RouterGuest