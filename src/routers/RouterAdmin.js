import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Box, Container } from '@mui/material'
//Pages
import AdminPanel from '../pages/AdminPanel/AdminPanel'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
//components
import Navbar from '../components/Navbar'
import AdminTabs from '../pages/AdminPanel/components/AdminTabs'

const RouterAdmin = () => {
    const Layout = () => {
        return (
            <>
                <Navbar />
                <AdminTabs />
                
                <Container>
                    <Outlet />
                </Container>
            </>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<AdminPanel />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default RouterAdmin