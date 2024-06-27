import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addUser } from '../../../redux/features/user/userSlice'

const RegisterForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData, [name]: value
        })
    }

    const handleSignup = () => {
        if (formData.password === formData.confirmPassword) {
            dispatch(addUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: "user"
            }))

            navigate("/login")
        }
    }

    const handleGoLogin = () => {
        navigate("/login")
    }

    return (
        <Stack direction='column' spacing={6}>
            <Typography variant='h4'>Sign up to Event Explorer</Typography>

            <Stack direction='column' spacing={2}>
                <TextField
                    label='Name'
                    type='name'
                    name='name'
                    size='small'
                    value={formData.name}
                    onChange={handleChange}
                />
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
                <TextField
                    label='Confirm Password'
                    type='password'
                    name='confirmPassword'
                    size='small'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </Stack>

            <Stack direction='column' spacing={2}>
                <Button variant='contained' onClick={handleSignup} >Sign up</Button>
                <Button variant='text' onClick={handleGoLogin} >Do you already have an account?</Button>
            </Stack>
        </Stack>
    )
}

export default RegisterForm