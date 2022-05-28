
// import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
// import ReactDOM from 'react-dom/client';

import Issue from './issue.jsx';
import Epic  from './epic.jsx';

// import { Provider } from 'react-redux';
// import store from './store';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="issues" element={<Issue />} />
        <Route path="epics"  element={<Epic  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
