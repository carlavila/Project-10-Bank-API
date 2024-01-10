import { createSlice } from '@reduxjs/toolkit';

const storedToken = localStorage.getItem('userToken');

const authentificationSlice = createSlice({
  name: 'authentification',
  initialState: {
    isConnected: !!storedToken, // Check if token exists
    token: storedToken || null, // Set token if it exists
  },
  reducers: {
    signIn: (state, action) => {
      state.isConnected = true;
      state.token = action.payload;
      localStorage.setItem('userToken', action.payload); // Store token in localStorage
    },
    signOut: (state) => {
      state.isConnected = false;
      state.token = null;
      localStorage.removeItem('userToken'); // Remove token from localStorage on sign out
    },
  },
});

export const { signIn, signOut } = authentificationSlice.actions;
export default authentificationSlice.reducer;
