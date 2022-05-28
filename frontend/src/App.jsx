
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
// import ReactDOM from 'react-dom/client';

import Issue, {IssueView} from './issue.jsx';
import Epic  from './epic.jsx';

// import { Provider } from 'react-redux';
// import store from './store';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppComponent(element) {
  const elem = (
    <div className="container-fluid">
      {element}
    </div>
  );
  return elem;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="issues" element={AppComponent(<Issue />)} />
        <Route path="issues/:issueId" element={AppComponent(<IssueView />)} />
        <Route path="epics"  element={AppComponent(<Epic  />)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
