import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchPodpiska = createAsyncThunk('podpiska/fetchPodpiska', async (params) => {
    const { data } = await axios.get('/podpiska', params);
    return data;
})




const initialState = {
    data: null, 
    status: 'loading',

};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: {

        [fetchPodpiska.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchPodpiska.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchPodpiska.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },

    }
})

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const podpiskaReducer = authSlice.reducer;

export const { logout } = authSlice.actions;