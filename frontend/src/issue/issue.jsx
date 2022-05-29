
import {useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import {storeIssue, addIssue} from './issueSlice.js';
import {getIssueById} from './common.js';


function IssueCard(props) {
	let navigate = useNavigate();
	const issue = props.issue;

	if(props.type === "list")  return (
		<div key={issue.id} className="my-2" onClick={()=>navigate("./"+issue.id)}>
    	<div className="card">
  			<div className="card-body">
  				<h6 className="card-title text-truncate">
  					<span>Issue-{issue.id} </span>
  					<span>  "|" </span>
  					<span>{issue.heading}</span>
  				</h6>
  				<p className="card-text text-truncate text-muted">{issue.desc}</p>
  				<span class="badge badge-pill badge-dark">Issue Points: {issue.points}</span>
  			</div>
  		</div>
    </div>
  );

	return (
		<div key={issue.id} className="my-2">
    	<div className="card">
  			<div className="card-body">
  				<h5 className="card-title"> <span>Issue-{issue.id} </span> </h5>
  				<h6 className="card-title"> <span>{issue.heading}</span> </h6>
  				<p className="card-text">{issue.desc}</p>
  				<span class="badge badge-pill badge-dark">Issue Points: {issue.points}</span>
  			</div>
  		</div>
    </div>
  );
}

export function IssueView() {
	const {issueId} = useParams();

  const issue = useSelector((state) => {
    return getIssueById(state.issues.value, issueId);
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
        dispatch(addIssue(response.data));
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

export default function Issue() {
  // {
  //   "id": -1,
  //   "heading": "Issue -1",
  //   "desc": "Dummy desc 101",
  //   "points": 0
  // }
  const issues = useSelector((state) => state.issues.value);
  const dispatch = useDispatch();

  console.log(issues);

  useEffect(()=>{
    if(issues!==null) {
      return;
    }
    axios.get('/issue/api/issues',{
      // baseURL: 'http://localhost:8000',
      responseType: 'json'
    }).then((response) => {
        console.log(response.data);
        dispatch(storeIssue(response.data));
      });
  },[]);

  const issueListContent = issues===null ? <div></div> : issues.map(
  	issue =><IssueCard issue={issue} type="list" />
  );

  return (
    <div>
      {issueListContent}
    </div>
    
  );
}
