import { BookmarkAdded, BookmarkRemove, Delete, Update } from '@mui/icons-material'
import { Box, Button, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEvent, updateEvent } from '../redux/features/event/eventSlice'
import UpdateEvent from '../pages/AdminPanel/components/UpdateEvent'

const Wrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 16
})

const Event = ({ data }) => {
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.user)

    const role = localStorage.getItem("role")
    const userId = Number(localStorage.getItem("id"))

    const [alreadyAttendee, setAlreadyAttendee] = useState(data.attendees.findIndex(attendee => attendee.id == userId) >= 0)
    const [updateEventStatus, setUpdateEventStatus] = useState(false)

    const handleRemoveAttendee = () => {
        const updatedAttendees = data.attendees.filter(attendee => attendee.id !== userId)
        const updatedData = {...data, attendees: updatedAttendees}

        setAlreadyAttendee(false)
        dispatch(updateEvent(updatedData))
    }

    const handleAddAttendee = () => {
        const user = users.find(user => user.id === userId);
        const updatedAttendees = [...data.attendees, {
            id: user.id,
            name: user.name,
            email: user.email
        }];
        const updatedData = { ...data, attendees: updatedAttendees };
        
        setAlreadyAttendee(true);
        dispatch(updateEvent(updatedData));
    }

    return (
        <>
            <Wrapper my={2.5}>
                <Box>
                    <Typography fontSize="large" variant='subtitle2'>{data.title}</Typography>
                    <Typography fontSize="medium" component="span">({data.category})</Typography>
                </Box>

                {data.isActive ?
                    <>
                        <Typography fontSize="medium" component="span">{data.description}</Typography>
                        <Typography fontSize="small" component="span">{data.dateTime}</Typography>
                    </>
                    :
                    <>
                        <Typography fontSize="medium" component="span">This event is not available.</Typography>
                    </>
                }

                {role === "admin" &&
                    (
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant='text' color='error'
                                startIcon={<Delete />} size='small'
                                onClick={() => { dispatch(deleteEvent(data)) }}
                            >
                                Delete
                            </Button>

                            <Button
                                variant='outlined' color="primary"
                                startIcon={<Update />} size='small'
                                onClick={() => { setUpdateEventStatus(true) }}
                            >
                                Update
                            </Button>
                        </Box>
                    )
                }

                {role === "user" &&
                    (
                        <Box>
                            <Button
                                variant='outlined' color={alreadyAttendee ? 'error' : 'success'}
                                startIcon={alreadyAttendee ? <BookmarkRemove /> : <BookmarkAdded />} size='small'
                                onClick={() => {
                                    if (alreadyAttendee)
                                        handleRemoveAttendee()
                                    else
                                        handleAddAttendee()
                                }}
                            >
                                {alreadyAttendee ? "Cancel Participate" : "Participate"}
                            </Button>
                        </Box>
                    )
                }
            </Wrapper>

            <UpdateEvent updateEventStatus={updateEventStatus} setUpdateEventStatus={setUpdateEventStatus} data={data} />
        </>
    )
}

export default Event