import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    adminTab: 0
}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        changeTab: (state, action) => {
            state.adminTab = action.payload
        }
    }
})

export const { changeTab } = adminSlice.actions

export default adminSlice.reducer