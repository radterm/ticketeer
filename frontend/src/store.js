import { configureStore } from '@reduxjs/toolkit';

import issueReducer from './issue/issueSlice.js';
import epicReducer  from './epic/epicSlice.js';

export default configureStore({
  reducer: {
    issues: issueReducer,
    epics: epicReducer
  }
});
