import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
//style
import { Button, Stack, TextField, Typography } from '@mui/material'



const LoginForm = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
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
            <Typography variant='h4'>{t('loginPage.title')}</Typography>

            <Stack direction='column' spacing={2}>
                <TextField
                    label={t('loginPage.inputs.email')}
                    type='email'
                    name='email'
                    size='small'
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    label={t('loginPage.inputs.password')}
                    type='password'
                    name='password'
                    size='small'
                    value={formData.password}
                    onChange={handleChange}
                />
            </Stack>

            <Stack direction='column' spacing={2}>
                <Button variant='contained' onClick={handleLogin}>{t('loginPage.buttons.login')}</Button>
                <Button variant='outlined' onClick={handleGoSignup}>{t('loginPage.buttons.signup')}</Button>
            </Stack>
        </Stack>
    )
}

export default LoginForm