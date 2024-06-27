import { createSlice } from "@reduxjs/toolkit"
import { users } from "./userData"

const initialState = {
    users : users
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser : (state, action) => {
            state.users.push(action.payload)
        }
    }
})

export const { addUser } = userSlice.actions

export default userSlice.reducer