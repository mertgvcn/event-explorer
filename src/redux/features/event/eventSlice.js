import { createSlice } from "@reduxjs/toolkit";
import { Categories, events } from "./eventData";

const initialState = {
    events: events,
    eventIdCounter: 11,
    filters: {
        categories: Categories,
        status: true,
        date: {
            start: null,
            end: null
        }
    }
}

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        addEvent: (state, action) => {
            state.events.push(action.payload)
            state.eventIdCounter++
        },
        deleteEvent: (state, action) => {
            const index = state.events.findIndex(event => event.id === action.payload.id)
            if (index >= 0) {
                state.events.splice(index, 1)
            }
        },
        updateEvent: (state, action) => {
            const index = state.events.findIndex(event => event.id === action.payload.id);
            if (index >= 0) {
                state.events[index] = {
                    ...state.events[index],
                    ...action.payload
                };
            }
        },
        changeCategoryFilter: (state, action) => {
            state.filters.categories = action.payload
        },
        changeStatusFilter: (state, action) => {
            state.filters.status = action.payload
        },
        changeStartDateFilter: (state, action) => {
            state.filters.date.start = action.payload
        },
        changeEndDateFilter: (state, action) => {
            state.filters.date.end = action.payload
        }
    }
})

export const { addEvent, deleteEvent, updateEvent, changeCategoryFilter, changeStatusFilter, changeStartDateFilter, changeEndDateFilter } = eventSlice.actions

export default eventSlice.reducer