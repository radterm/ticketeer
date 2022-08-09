import { createSlice } from '@reduxjs/toolkit';

export const issueSlice = createSlice({
  name: 'issue',
  initialState: {
    value: {},
    byEpics: {},
  },
  reducers: {
    storeIssues: (state, action) => {
      action.payload.forEach((issue) => {
        state.value[issue.id.toString()] = issue;
      });
      // we would want to implement an LRU cache here eventually
    },
    storeIssuesByEpic: (state, action) => {
      state.byEpics[action.payload.epicId] = action.payload.issues;
    }
  },
});

// Action creators are generated for each case reducer function
export const { storeIssues , storeIssuesByEpic } = issueSlice.actions; 

export default issueSlice.reducer;

