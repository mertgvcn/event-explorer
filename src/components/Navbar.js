import { LocalActivity } from '@mui/icons-material'
import { AppBar, Box, Button, Container, IconButton, Typography, styled } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const StyledToolbar = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    height: 60
})

const StyledBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 2,
    padding: "6px 8px",
    boxSizing: "border-box",
    borderRadius: "4px",
    ":hover": {
        cursor: "pointer",
        backgroundColor: "rgb(24,113,202)"
    }
})

const Navbar = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const isLogin = localStorage.getItem("name") != null

    const handleChangeLanguage = () => {
        i18n.changeLanguage(i18n.language == "tr" ? "en" : "tr")
    }

    const handleLogout = () => {
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        localStorage.removeItem("role")

        window.location = "/"
    }

    return (
        <AppBar position='sticky'>
            <Container>
                <StyledToolbar>
                    <StyledBox onClick={() => navigate("/")}>
                        <LocalActivity />
                        <Typography variant='h6'>Event Explorer</Typography>
                    </StyledBox>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isLogin ? "space-between" : "flex-end",
                        width: "150px"
                    }}>
                        <Button onClick={handleChangeLanguage}>
                            <img
                                width={24} height={24}
                                src={i18n.language == "tr" ? require("../assets/tr_icon.png") : require("../assets/en_icon.png")}
                            />
                        </Button>

                        {isLogin && <Button color="inherit" onClick={handleLogout}>{t('logout')}</Button>}
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar