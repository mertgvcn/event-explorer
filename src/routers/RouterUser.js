import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Container } from '@mui/material'
//Pages
import UserPage from '../pages/UserPage/UserPage'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
//components
import Navbar from '../components/Navbar'

const RouterUser = () => {
    const Layout = () => {
        return (
            <>
                <Navbar />

                <Container>
                    <Outlet />
                </Container>
            </>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<UserPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default RouterUser