import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    user: null,
    isAuthenticated: false,
    
};
const authslice= createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userloggedin: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        userloggedout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});
export const { userloggedin, userloggedout } = authslice.actions;
export default authslice.reducer;