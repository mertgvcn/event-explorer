import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography, styled } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateEvent } from '../../../redux/features/event/eventSlice'
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

const UpdateEvent = ({ updateEventStatus, setUpdateEventStatus, data }) => {
    const dispatch = useDispatch()

    const [formData, setFromData] = useState({
        title: data.title,
        category: data.category,
        description: data.description,
    })
    const [isActive, setIsActive] = useState(data.isActive)
    const [dateTime, setDateTime] = useState(dayjs(new Date(data.dateTime)))

    const handleChange = (e) => {
        const { name, value } = e.target

        setFromData({
            ...formData, [name]: value
        })
    }

    const handleCancel = () => {
        resetInputs()
        setUpdateEventStatus(false)
    }

    const handleSubmit = () => {
        const updatedEvent = {
            id: data.id,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            dateTime: dateTime.$d.toString(),
            isActive: isActive,
        }

        dispatch(updateEvent(updatedEvent))
        setUpdateEventStatus(false)
    }

    const resetInputs = () => {
         setFromData({
            title: data.title,
            category: data.category,
            description: data.description,
        })
        setIsActive(data.isActive)
        setDateTime(dayjs(new Date(data.dateTime)))
    }

    return (
        <Modal open={updateEventStatus} onClose={() => setUpdateEventStatus(false)} disableAutoFocus>
            <Wrapper>
                <Typography variant='h5'>Update Event</Typography>

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

                        <FormControlLabel control={<Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />} label="Active Event" />
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

export default UpdateEvent