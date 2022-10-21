import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { podpiskaReducer } from "./slices/podpiska";

const store = configureStore({
    reducer: {
        posts: postReducer,
        auth: authReducer,
        podpiska: podpiskaReducer,
    }
})

export default store;