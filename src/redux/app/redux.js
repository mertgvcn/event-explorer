import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import eventReducer from "../features/event/eventSlice";
import adminReducer from "../features/admin/adminSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        event: eventReducer,
        admin: adminReducer
    }
})