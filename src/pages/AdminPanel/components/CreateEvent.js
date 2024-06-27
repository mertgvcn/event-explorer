import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography, styled } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addEvent } from '../../../redux/features/event/eventSlice'
import { Categories } from '../../../redux/features/event/eventData'

const Wrapper = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: 400,
    height: 480,
    backgroundColor: 'rgb(240,240,240)',
    borderRadius: "0.5rem",
    padding: "1rem 1rem",
    boxSizing: "border-box"
})

const CreateEvent = ({ createEventStatus, setCreateEventStatus, createEventLocation }) => {
    const dispatch = useDispatch()
    const { eventIdCounter } = useSelector(state => state.event)

    const [formData, setFromData] = useState({
        title: "",
        category: Categories[0],
        description: ""
    })
    const [dateTime, setDateTime] = useState(dayjs(new Date()))

    const handleChange = (e) => {
        const { name, value } = e.target

        setFromData({
            ...formData, [name]: value
        })
    }

    const handleCancel = () => {
        resetInputs()
        setCreateEventStatus(false)
    }

    const handleSubmit = () => {
        const newEvent = {
            id: eventIdCounter,
            isActive: true,
            geocode: [createEventLocation.lat, createEventLocation.lng],
            title: formData.title,
            category: formData.category,
            description: formData.description,
            dateTime: dateTime.$d.toString()
        }

        dispatch(addEvent(newEvent))
        resetInputs()
        setCreateEventStatus(false)
    }

    const resetInputs = () => {
        setFromData({
            title: "",
            description: "",
        })
        setDateTime(dayjs(new Date()))
    }

    return (
        <Modal open={createEventStatus} onClose={() => setCreateEventStatus(false)} disableAutoFocus>
            <Wrapper>
                <Typography variant='h5'>Create Event</Typography>

                <Box width="100%">
                    <Stack direction="column" gap={2}>
                        <TextField
                            name="title" label="Title"
                            variant="outlined" size='small'
                            value={formData.title} onChange={handleChange}>
                        </TextField>

                        <TextField
                            name="description" label="Description"
                            variant='outlined' size='small' multiline maxRows={3}
                            value={formData.description} onChange={handleChange}>
                        </TextField>

                        <FormControl fullWidth size='small'>
                            <InputLabel id="category-selector">Category</InputLabel>
                            <Select
                                labelId="category-selector"
                                name="category" label="Category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                {Categories.map((category, idx) => (
                                    <MenuItem value={category} key={idx}>{category}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <DateTimePicker
                            name="dateTime" label='Date/Time' disablePast
                            value={dateTime} onChange={(newValue) => setDateTime(newValue)}
                        />
                    </Stack>
                </Box>

                <Box>
                    <Stack direction="row" gap={1}>
                        <Button variant='text' onClick={handleCancel}>Cancel</Button>
                        <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                    </Stack>
                </Box>
            </Wrapper>
        </Modal>
    )
}

export default CreateEvent