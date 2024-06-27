import React from 'react'
//components
import RegisterForm from './components/RegisterForm'
import { Box } from '@mui/material'

const RegisterPage = () => {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 60px)",
            width: "100%"
        }}>
            <RegisterForm />
        </Box>
    )
}

export default RegisterPage