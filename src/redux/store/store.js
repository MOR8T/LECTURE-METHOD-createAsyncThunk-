import { configureStore } from "@reduxjs/toolkit";
import todos from '../reducers/Todos'

export const store = configureStore({
    reducer:({
        Todos:todos,
    }),
})