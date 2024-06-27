import { Box, Container, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeTab } from '../../../redux/features/admin/adminSlice'

const AdminTabs = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
        dispatch(changeTab(newValue))
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Container>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Dashboard" value={0} />
                    <Tab label="Events" value={1} />
                </Tabs>
            </Container>
        </Box>
    )
}

export default AdminTabs