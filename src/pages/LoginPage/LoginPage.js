import React from 'react'
import { Box } from '@mui/material'
//components
import LoginForm from './components/LoginForm'

const LoginPage = () => {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 60px)",
            width: "100%"
        }}>
            <LoginForm />
        </Box >
    )
}

export default LoginPage