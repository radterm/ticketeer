
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';

import React from 'react';
// import ReactDOM from 'react-dom/client';

import Issue, {IssueView, IssueCreateView} from './issue/issue.jsx';
import Epic, {EpicView, EpicCreateUpdateView}  from './epic/epic.jsx';
import Login, {TicketeerNav} from './Home.jsx';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppComponent(props) {
  const elem = (
    <div className=" m-md-4 m-sm-2 m-xs-1">
      <div className="container-fluid">
        {props.children}
      </div>
    </div>
  );
  return (<div>
    <TicketeerNav></TicketeerNav>
    {elem}
  </div>);
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={
          <AppComponent>
            <Login />
          </AppComponent>
        } />
        <Route path="issues" element={
          <AppComponent>
            <Issue />
          </AppComponent>
        } />
        <Route path="issues/addIssue" element={
          <AppComponent>
            <IssueCreateView />
          </AppComponent>
        } />
        <Route path="issues/:issueId/edit" element={
          <AppComponent>
            <IssueCreateView />
          </AppComponent>
        } />
        <Route path="issues/:issueId" element={
          <AppComponent>
            <IssueView />
          </AppComponent>
        } />
        <Route path="epics"  element={
          <AppComponent>
            <Epic  />
          </AppComponent>
        } />
        <Route path="epics/addEpic" element={
          <AppComponent>
            <EpicCreateUpdateView />
          </AppComponent>
        } />
        <Route path="epics/:epicId/edit" element={
          <AppComponent>
            <EpicCreateUpdateView />
          </AppComponent>
        } />
        <Route path="epics/:epicId" element={
          <AppComponent>
            <EpicView />
          </AppComponent>
        } />
        <Route path="epics/:epicId/addIssue" element={
          <AppComponent>
            <IssueCreateView />
          </AppComponent>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
