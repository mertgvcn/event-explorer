import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
//style
import MapIcon from '@mui/icons-material/Map';
import FilterListIcon from '@mui/icons-material/FilterList';
//components
import { Wrapper, WrapperTitle, WrapperBody } from '../AdminPanel/AdminPanel'
import Map from '../../components/Map';
import Filters from '../../components/Filters'

const UserPage = () => {
    return (
        <Stack direction={{xs: 'column', md: 'row'}} my={4} gap={2} height="calc(100vh - 124px)">
            <Wrapper flex={7}>
                <WrapperTitle>
                    <MapIcon fontSize='small' />
                    <Typography variant='subtitle2'>
                        Map
                    </Typography>
                </WrapperTitle>

                <WrapperBody>
                    <Map />
                </WrapperBody>
            </Wrapper>

            <Wrapper flex={3}>
                <WrapperTitle>
                    <FilterListIcon fontSize='small' />
                    <Typography variant='subtitle2'>
                        Filters
                    </Typography>
                </WrapperTitle>

                <WrapperBody>
                    <Filters />
                </WrapperBody>
            </Wrapper>
        </Stack>
    )
}

export default UserPage