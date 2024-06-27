import { Box, Checkbox, FormControlLabel, Radio, RadioGroup, Typography, styled } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Categories } from '../redux/features/event/eventData'
import { changeCategoryFilter, changeStartDateFilter, changeEndDateFilter, changeStatusFilter } from '../redux/features/event/eventSlice'
import { DateTimePicker } from '@mui/x-date-pickers'

const FiltersWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: 16,
    boxSizing: 'border-box',
})

const Filters = () => {
    const dispatch = useDispatch()

    const [checkedCategories, setCheckedCategories] = useState(Categories)
    const checkedCategoriesRef = useRef(Categories)

    const [selectedStatus, setSelectedStatus] = useState(true)
    const selectedStatusRef = useRef(true)

    const [dateRange, setDateRange] = useState({
        start: null,
        end: null
    })
    const dateRangeRef = useRef({
        start: null,
        end: null
    })

    const handleCategoryAllChange = (e) => {
        if (e.target.checked) {
            setCheckedCategories(Categories)
            checkedCategoriesRef.current = Categories
        }
        else {
            setCheckedCategories([])
            checkedCategoriesRef.current = []
        }

        dispatch(changeCategoryFilter(checkedCategoriesRef.current))
    }

    const handleCategoryChange = (e) => {
        const value = e.target.value
        let updatedCategories;

        if (checkedCategoriesRef.current.includes(value)) {
            updatedCategories = checkedCategoriesRef.current.filter(category => category !== value);
        } else {
            updatedCategories = [...checkedCategoriesRef.current, value];
        }

        checkedCategoriesRef.current = updatedCategories
        setCheckedCategories(updatedCategories)

        dispatch(changeCategoryFilter(updatedCategories))
    }

    const handleStatusChange = (e) => {
        const value = e.target.value === "true"

        selectedStatusRef.current = value
        setSelectedStatus(value)

        dispatch(changeStatusFilter(value))
    }

    const handleStartDateChange = (newValue) => {
        dateRangeRef.current.start = newValue
        setDateRange(prev => ({ ...prev, start: newValue }))

        dispatch(changeStartDateFilter(newValue ? newValue.toString() : null))
    }

    const handleEndDateChange = (newValue) => {
        dateRangeRef.current.end = newValue
        setDateRange(prev => ({ ...prev, end: newValue }))

        dispatch(changeEndDateFilter(newValue ? newValue.toString() : null))
    }

    return (
        <FiltersWrapper>

            {/* Category Filter */}
            <Box marginBottom={2}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Typography variant='subtitle2' fontSize={16}>Categories</Typography>
                    <FormControlLabel label="All" control={
                        <Checkbox
                            size='xs'
                            value='All'
                            checked={checkedCategories.length === Categories.length}
                            onChange={handleCategoryAllChange}
                        />
                    } />
                </Box>

                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap"
                }}>
                    {Categories.map((category, idx) => (
                        <FormControlLabel key={idx} label={category} control={
                            <Checkbox
                                size='xs'
                                value={category}
                                checked={checkedCategories.includes(category)}
                                onChange={handleCategoryChange}
                            />
                        } />
                    ))}
                </Box>
            </Box>

            {/* Status Filter */}
            <Box marginBottom={2}>
                <Typography variant='subtitle2' fontSize={16}>Status</Typography>
                <RadioGroup
                    row
                    name="event-status"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                >
                    <FormControlLabel value={true} control={<Radio />} label="Available" />
                    <FormControlLabel value={false} control={<Radio />} label="Unavailable" />
                </RadioGroup>
            </Box>

            {/* Date Filter */}
            <Box marginBottom={2}>
                <Typography variant='subtitle2' fontSize={16} mb={2}>Date Range</Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 2
                }}>
                    <DateTimePicker
                        sx={{ width: { xs: '100%', lg: '45%' } }}
                        name="start" maxDateTime={dateRange.end} label="Start Date"
                        value={dateRange.start} onChange={handleStartDateChange}
                    />

                    <DateTimePicker
                        sx={{ width: { xs: '100%', lg: '45%' } }}
                        name="end" minDateTime={dateRange.start} label="End Date"
                        value={dateRange.end} onChange={handleEndDateChange}
                    />
                </Box>
            </Box>
        </FiltersWrapper>
    )
}

export default Filters