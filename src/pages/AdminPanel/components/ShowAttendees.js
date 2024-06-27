import { Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material'
import React from 'react'

const Wrapper = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: "flex",
    flexDirection: "column",
    width: 400,
    height: 480,
    backgroundColor: 'rgb(240,240,240)',
    borderRadius: "0.5rem",
    padding: "1rem 1rem",
    boxSizing: "border-box"
})

const StyledTableContainer = styled(TableContainer)({
    height: '100%',
    width: '100%',
    backgroundColor: 'rgb(240,240,240)',

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


const ShowAttendees = ({ showAttendeesStatus, setShowAttendeesStatus, attendees }) => {
    return (
        <Modal open={showAttendeesStatus} onClose={() => setShowAttendeesStatus(false)} disableAutoFocus>
            <Wrapper>
                <Typography mt={1} ml={2} component="span" sx={{ fontSize: 18, fontWeight: 'bold' }}>Attendees</Typography>

                {attendees.length > 0 ?
                    <StyledTableContainer component={Box}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {attendees.map((attendee, idx) => (
                                    <TableRow
                                        key={idx}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {attendee.name}
                                        </TableCell>
                                        <TableCell>{attendee.email}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        deneme
                                    </TableCell>
                                    <TableCell>deneme</TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        deneme
                                    </TableCell>
                                    <TableCell>deneme</TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        deneme
                                    </TableCell>
                                    <TableCell>deneme</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </StyledTableContainer>
                    :
                    <Typography mt={1} ml={2} variant='subtitle1'>No one has participated in this event yet!</Typography>
                }

            </Wrapper>
        </Modal>
    )
}

export default ShowAttendees