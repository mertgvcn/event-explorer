import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Delete, Visibility } from '@mui/icons-material';
import { deleteEvent } from '../../redux/features/event/eventSlice.js';
//style
import { Box, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material'
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import FilterListIcon from '@mui/icons-material/FilterList';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
//components
import Map from '../../components/Map.js'
import Filters from '../../components/Filters.js';
import Stats from './components/Stats.js';
import ShowAttendees from './components/ShowAttendees.js';

export const Wrapper = styled(Box)(({ flex }) => ({
    display: "flex",
    flexDirection: "column",
    flex: flex,
    width: "100%",
    height: "100%",
    border: "1px solid grey",
    color: "rgb(60,50,70)",
}))

export const WrapperTitle = styled(Box)({
    display: "flex",
    alignItems: "center",
    width: '100%',
    minHeight: "40px",
    bgcolor: "rgb(240,240,240)",
    borderBottom: "1px solid grey",
    padding: "2px 12px",
    boxSizing: "border-box",
    gap: "0.2rem"
})

export const WrapperBody = styled(Box)({
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",

    overflowY: 'auto',

    // Scrollbar stilini özelleştirme
    '&::-webkit-scrollbar': {
        width: '4px', // Scrollbar genişliği
        height: '10px', // Scrollbar yüksekliği
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgb(242, 242, 242)', // Scrollbar track arkaplan rengi
        borderRadius: '10px', // Scrollbar track köşe yuvarlama
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Scrollbar thumb arkaplan rengi
        borderRadius: '10px', // Scrollbar thumb köşe yuvarlama
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Scrollbar thumb hover rengi
    }
})

const WrapperFooter = styled(Box)({
    display: "flex",
    alignItems: "center",
    width: '100%',
    height: "fit-content",
    bgcolor: "rgb(240,240,240)",
    color: "rgb(80,70,80)",
    borderTop: "1px solid grey",
    padding: "2px 12px",
    boxSizing: "border-box",
    gap: "0.4rem",
})

const AdminPanel = () => {
    const dispatch = useDispatch()
    const { adminTab } = useSelector(state => state.admin)
    const { events } = useSelector(state => state.event)

    const [showAttendeesStatus, setShowAttendeesStatus] = useState(false)
    const [attendees, setAttendees] = useState([])

    const renderByTab = () => {
        if (adminTab === 0) {
            return (
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} my={4} height="calc(100vh - 174px)">
                    <Wrapper flex={2}>
                        <WrapperTitle>
                            <MapIcon fontSize='small' />
                            <Typography variant='subtitle2'>
                                Map
                            </Typography>
                        </WrapperTitle>

                        <WrapperBody>
                            <Map />
                        </WrapperBody>

                        <WrapperFooter>
                            <InfoIcon fontSize='small' />
                            <Typography variant='subtitle1' fontSize={{ xs: "small", md: "medium" }}>
                                To create a new event on the map, double click on the location of the event
                            </Typography>
                        </WrapperFooter>
                    </Wrapper>

                    <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }} flex={1} spacing={2}>
                        <Wrapper flex={1}>
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

                        <Wrapper flex={1}>
                            <WrapperTitle>
                                <QueryStatsIcon fontSize='small' />
                                <Typography variant='subtitle2'>
                                    Stats
                                </Typography>
                            </WrapperTitle>

                            <WrapperBody>
                                <Stats />
                            </WrapperBody>
                        </Wrapper>
                    </Stack>
                </Stack>
            )
        }
        else if (adminTab === 1) {
            return (
                <Box my={4} sx={{ height: 'calc(100vh - 174px)' }}>
                    <TableContainer component={Paper} sx={{ overflowY: 'auto', height: '100%' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {events.map((event, idx) => (
                                    <TableRow
                                        key={idx}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {event.category}
                                        </TableCell>
                                        <TableCell>{event.title}</TableCell>
                                        <TableCell>{event.description}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                color='primary'
                                                onClick={() => {
                                                    setAttendees(event.attendees)
                                                    setShowAttendeesStatus(true)
                                                }}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color='error'
                                                onClick={() => {
                                                    dispatch(deleteEvent(event))
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )
        }
    }

    return (
        <>
            {renderByTab()}
            <ShowAttendees showAttendeesStatus={showAttendeesStatus} setShowAttendeesStatus={setShowAttendeesStatus} attendees={attendees} />
        </>
    )
}

export default AdminPanel