
import {useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import {storeIssues, storeIssuesByEpic } from './issueSlice.js';


function IssueCard(props) {
	let navigate = useNavigate();
	const issue = props.issue;

	if(props.type === "list")  return (
		<div className="my-2" onClick={()=>navigate("/issues/"+issue.id)}>
    	<div className="card">
  			<div className="card-body">
  				<h6 className="card-title text-truncate">
  					<span>Issue-{issue.id} </span>
  					<span>  | </span>
  					<span>{issue.heading}</span>
  				</h6>
  				<p className="card-text text-truncate text-muted">{issue.desc}</p>
  				<span className="badge badge-pill badge-dark mr-2">Issue Points: {issue.points}</span>
          <button type="button" className="btn btn-outline-dark" onClick={(event)=>{
            navigate("/epics/"+issue.epic);
            event.stopPropagation();
          }}>Epic: {issue.epic}</button>
  			</div>
  		</div>
    </div>
  );

	return (
		<div className="my-2">
    	<div className="card">
  			<div className="card-body">
  				<h5 className="card-title"> <span>Issue-{issue.id} </span> </h5>
  				<h6 className="card-title"> <span>{issue.heading}</span> </h6>
  				<p className="card-text">{issue.desc}</p>
  				<span className="badge badge-pill badge-dark mr-2">Issue Points: {issue.points}</span>
          <button type="button" className="btn btn-outline-dark" onClick={(event)=>{
            navigate("/epics/"+issue.epic);
            event.stopPropagation();
          }}>Epic: {issue.epic}</button>
  			</div>
  		</div>
    </div>
  );
}

export function IssueView() {
	const {issueId} = useParams();

  const issue = useSelector((state) => {
    if(state.issues.value[issueId] === undefined) {
      return null;
    }
    return state.issues.value[issueId];
  });
  const dispatch = useDispatch();

  useEffect(()=>{
    if(issue!==null){
      return;
    }
    axios.get('/issue/api/issues/' + issueId,{
      // baseURL: 'http://localhost:8000',
      responseType: 'json'
    }).then((response) => {
        dispatch(storeIssues([response.data]));
      });
  },[]);

  if(issue===null){
  	return (<div>
  		Loading...
  	</div>);
  }

  return (<div>
  	<IssueCard issue={issue} type="single" />
  </div>);
}

export function IssueCreateView(){
  const {epicId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [apiState, setApiState] = useState("initial");
  const [issue, setIssue] = useState(-1);

  const handleSubmit = (event)=>{

    var formdata = new FormData(event.target);
    console.log("formdata is:", formdata);
    // this.postData(this.props.tokenUrl, formdata.get("username"), formdata.get("password"))
    setApiState("creating");
    

    axios.post("/issue/api/issues/" , formdata
    ).then((response) => {
      console.log(response.data);
      // if (props.epic===undefined) dispatch(storeIssues(response.data));
      // else dispatch(storeIssuesByEpic({
      //   issues: response.data,
      //   epicId: props.epic
      // }));
      dispatch(storeIssues([response.data]));
      setIssue(response.data.id);
      setApiState("created");
    }).catch((error) => {
      console.log(error);
      setApiState("failed");
    });

    event.preventDefault();

  };

  if(apiState==="created") navigate("/issues/"+ issue);

  const formInputs = (<div>
    <div className="form-group">
      <label for="issue-heading">The heading of the issue</label>
      <input type="text" className="form-control" id="issue-heading" name="heading" placeholder="Heading" />
    </div>
    <div className="form-group">
      <label for="issue-decsription">The description of the issue</label>
      <textarea className="form-control" id="issue-decsription" name="desc" placeholder="Description" />
    </div>
    <div className="form-group">
      <label for="points">Issue Points</label>
      <input type="number" className="form-control" id="points" name="points" />
    </div>
    <div className="form-group">
      <label for="epicId">The Id of the Epic</label>
      <input type="number" className="form-control" id="epicId" name="epic" value={epicId===undefined ? 1 : epicId} />
    </div>
    <button type="submit" className="btn btn-primary">Create Issue</button>
  </div>);

  var fieldset;
  if(apiState==="creating") {
    fieldset = <fieldset disabled>{formInputs}</fieldset>;
  } else {
    fieldset = <fieldset>{formInputs}</fieldset>;
  }

  return (<div>
    <form onSubmit={handleSubmit}>
      {fieldset}
    </form>
    {apiState==="failed" ? "Failed" : ""}
  </div>);
}

export default function Issue(props) {
  const issues = useSelector((state) => {
    const entries = [];
    if (props.epic===undefined) {
      for (const entry in state.issues.value) {
        entries.push(state.issues.value[entry]);
      }
    } else if (state.issues.byEpics[props.epic]!==undefined) {
      for (const entry in state.issues.byEpics[props.epic]) {
        entries.push(state.issues.byEpics[props.epic][entry]);
      }
    }    
    return entries;
  });
  const dispatch = useDispatch();

  useEffect(
    ()=>{
      if(issues.length === 0) {
        const url = props.epic===undefined ? '/issue/api/issues': '/issue/api/issues/epic/'+ props.epic ;
        axios.get(url , {
          // baseURL: 'http://localhost:8000',
          responseType: 'json'
        }).then((response) => {
          console.log(response.data);
          if (props.epic===undefined) dispatch(storeIssues(response.data));
          else dispatch(storeIssuesByEpic({
            issues: response.data,
            epicId: props.epic
          }));
        });
      }   
    }
  ,[]);

  let issueListContent;
  if(issues === {}) {
    issueListContent = <div key="-1">Nothing to show</div> ;
  }
  else{
    issueListContent = issues.map(
    	issue =><IssueCard key={issue.id} issue={issue} type="list" />
    );
  }

  return (
    <div>
      {issueListContent}
    </div>
    
  );
}
