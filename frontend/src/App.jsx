
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';

import React from 'react';
// import ReactDOM from 'react-dom/client';

import Issue, {IssueView, IssueCreateView} from './issue/issue.jsx';
import Epic, {EpicView, EpicCreateUpdateView}  from './epic/epic.jsx';
import Home, {Login, TicketeerNav} from './Home.jsx';

import { useLocation, useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";

function PathHeader(){
  const navigate = useNavigate();
  const location = useLocation();

  const pathNames = location.pathname.split("/");
  
  // home page
  if(pathNames[1]==="") return <span />;

  let paths = [];
  let i = 1; let redirectPath = "";
  for (; i < pathNames.length-1; i++) {
    redirectPath += "/" + pathNames[i] ;
    paths.push(
      <button type="button" onClick={(e)=>navigate(redirectPath)} className="btn btn-secondary btn-sm">
        {pathNames[i]}
      </button>);
    paths.push(<span className="p-1 m-1">></span>);
  }
  // the current active subpath
  paths.push(
    <button type="button" role="button" aria-disabled="true" className="btn btn-secondary btn-sm disabled">
      {pathNames[pathNames.length-1]}
    </button>
  );
  return(<div>{paths}</div>);
}

function AppComponent(props) {
  const elem = (
    <div className="m-md-4 m-sm-2 m-xs-1">
      <div className="container-fluid">
        <PathHeader />
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
        <Route path="" element={
          <AppComponent>
            <Home />
          </AppComponent>
        } />
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
