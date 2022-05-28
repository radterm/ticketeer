

import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Issue() {
  // {
  //   "id": -1,
  //   "heading": "Issue -1",
  //   "desc": "Dummy desc 101",
  //   "points": 0
  // }
  const [issues, setIssues] = useState(null);
  console.log(issues);

  useEffect(()=>{
    axios.get('/issue/api/issues',{
      // baseURL: 'http://localhost:8000',
      responseType: 'json'
    }).then((response) => {
        console.log(response.data);
        setIssues(response.data);
      });
  },[]);

  let navigate = useNavigate();

  const issueListContent = issues===null ? <div></div> : issues.map(issue =>   
    <div key={issue.id} className="my-2" onClick={()=>navigate("issues/"+issue.id)}>
    	<div className="card">
  			<div className="card-body">
  				<h6 className="card-title text-truncate">Issue-{issue.id} | {issue.heading}</h6>
  				<p className="card-text text-truncate text-muted">{issue.desc}</p>
  				<span class="badge badge-pill badge-dark">Issue Points: {issue.points}</span>
  			</div>
  		</div>
    </div>
  );

  return (
    <div>
      {issueListContent}
    </div>
    
  );
}
