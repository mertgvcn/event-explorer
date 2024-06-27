import { Box, Container, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeTab } from '../../../redux/features/admin/adminSlice'
import { useTranslation } from 'react-i18next'

const AdminTabs = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
        dispatch(changeTab(newValue))
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Container>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label={t('adminPanel.adminTabs.dashboard')} value={0} />
                    <Tab label={t('adminPanel.adminTabs.events')} value={1} />
                </Tabs>
            </Container>
        </Box>
    )
}

export default AdminTabs