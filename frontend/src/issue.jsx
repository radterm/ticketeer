

import {useState, useEffect} from 'react';
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

  const issueListContent = issues===null ? <div></div> : issues.map(issue =>
        <div key={issue.id}>
          id : {issue.id}
          heading : {issue.heading}
          desc : {issue.desc}
          points : {issue.points}
        </div>
  );

  return (
    <div>
      {issueListContent}
    </div>
  );
}
