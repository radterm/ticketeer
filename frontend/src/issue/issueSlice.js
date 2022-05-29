import { createSlice } from '@reduxjs/toolkit';

import {getIssueById} from './common.js';

export const issueSlice = createSlice({
  name: 'issue',
  initialState: {
    value: null,
  },
  reducers: {
    storeIssue: (state, action) => {
      state.value = action.payload;
    },
    addIssue: (state, action) => {
      if(state.value===null){
        state.value = [action.payload];
        return;
      }
      if(getIssueById(state.value, action.payload.id) === null){
        console.log("pushing", action.payload)
        state.value.push(action.payload);
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { storeIssue, addIssue } = issueSlice.actions;

export default issueSlice.reducer;

