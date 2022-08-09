import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
    unauthenticated: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload;
      state.unauthenticated = false;
    },
    removeUser: (state, action) => {
      state.value = null;
      state.unauthenticated = true;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser} = userSlice.actions; 

export default userSlice.reducer;

