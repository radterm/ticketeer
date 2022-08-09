
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
// import ReactDOM from 'react-dom/client';

import Issue, {IssueView, IssueCreateView} from './issue/issue.jsx';
import Epic, {EpicView}  from './epic/epic.jsx';

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
        <Route path="issues/addIssue" element={AppComponent(<IssueCreateView />)} />
        <Route path="issues/:issueId/edit" element={AppComponent(<IssueCreateView />)} />
        <Route path="issues/:issueId" element={AppComponent(<IssueView />)} />
        <Route path="epics"  element={AppComponent(<Epic  />)} />
        <Route path="epics/:epicId" element={AppComponent(<EpicView />)} />
        <Route path="epics/:epicId/addIssue" element={AppComponent(<IssueCreateView />)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
