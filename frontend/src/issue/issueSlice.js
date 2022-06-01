import { createSlice } from '@reduxjs/toolkit';

export const issueSlice = createSlice({
  name: 'issue',
  initialState: {
    value: {},
  },
  reducers: {
    storeIssues: (state, action) => {
      action.payload.forEach(issue => state.value[issue.id.toString()] = issue);
      // we would want to implement an LRU cache here eventually
    }
  },
});

// Action creators are generated for each case reducer function
export const { storeIssues } = issueSlice.actions; 

export default issueSlice.reducer;

