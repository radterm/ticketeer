import { createSlice } from '@reduxjs/toolkit';

export const epicSlice = createSlice({
  name: 'epic',
  initialState: {
    value: {}
  },
  reducers: {
    storeEpics: (state, action) => {
      action.payload.forEach((epic) => {
        state.value[epic.id.toString()] = epic;
      });
      // we would want to implement an LRU cache here eventually
    }
  },
});

// Action creators are generated for each case reducer function
export const { storeEpics } = epicSlice.actions; 

export default epicSlice.reducer;

