import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
//style
import { Button, Stack, TextField, Typography } from '@mui/material'



const LoginForm = () => {
    const navigate = useNavigate()
    const { users } = useSelector(state => state.user)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData, [name]: value
        })
    }

    const handleLogin = () => {
        users.map((user) => {
            if (user.email == formData.email && user.password == formData.password) {
                console.log("Giriş Başarılı")
                
                localStorage.setItem("id", user.id)
                localStorage.setItem("name", user.name)
                localStorage.setItem("email", user.email)
                localStorage.setItem("role", user.role)

                window.location = "/"
            }
        })
    }

    const handleGoSignup = () => {
        navigate("/register")
    }

    return (
        <Stack direction='column' spacing={6}>
            <Typography variant='h4'>Login to Event Explorer</Typography>

            <Stack direction='column' spacing={2}>
                <TextField
                    label='Email'
                    type='email'
                    name='email'
                    size='small'
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    label='Password'
                    type='password'
                    name='password'
                    size='small'
                    value={formData.password}
                    onChange={handleChange}
                />
            </Stack>

            <Stack direction='column' spacing={2}>
                <Button variant='contained' onClick={handleLogin}>Login</Button>
                <Button variant='outlined' onClick={handleGoSignup}>Sign up</Button>
            </Stack>
        </Stack>
    )
}

export default LoginForm