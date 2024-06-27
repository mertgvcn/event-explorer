import { LocalActivity } from '@mui/icons-material'
import { AppBar, Box, Button, Container, Typography, styled } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const StyledToolbar = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    height: 60
})

const StyledBox = styled(Box)({
    display:"flex",
    alignItems: "center",
    gap:2,
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

                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </StyledToolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar