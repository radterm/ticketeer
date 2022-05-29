import { configureStore } from '@reduxjs/toolkit';

import issueReducer from './issue/issueSlice.js';

export default configureStore({
  reducer: {
    issues: issueReducer
  }
});
