import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Epic() {
  // {
  //   "id": -1,
  //   "heading": "Issue -1",
  //   "desc": "Dummy desc 101",
  //   "points": 0
  // }
  const [epics, setIssues] = useState(null);
  console.log(epics);

  useEffect(()=>{
    axios.get('/epic/api/epics',{
      // baseURL: 'http://localhost:8000',
      responseType: 'json'
    }).then((response) => {
        console.log(response.data);
        setIssues(response.data);
      });
  },[]);

  const epicListContent = epics===null ? <div></div> : epics.map(epic =>
        <div key={epic.id}>
          id : {epic.id}
          name: {epic.name}
          desc : {epic.desc}
        </div>
  );

  return (
    <div>
      {epicListContent}
    </div>
  );
}

