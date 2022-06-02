import {useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import {storeEpics} from './epicSlice.js';

function EpicCard(props) {
  let navigate = useNavigate();
  const epic = props.epic;

  if(props.type === "list")  return (
    <div className="my-2" onClick={()=>navigate("./"+epic.id)}>
      <div className="card">
        <div className="card-body">
          <h6 className="card-title text-truncate">
            <span>Epic-{epic.id} </span>
          </h6>
          <p className="card-text text-truncate text-muted">{epic.desc}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="my-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title"> <span>Epic-{epic.id} </span> </h5>
          <h6 className="card-title"> <span>{epic.heading}</span> </h6>
          <p className="card-text">{epic.desc}</p>
        </div>
      </div>
    </div>
  );
}

export function EpicView() {
  const {epicId} = useParams();

  const epic = useSelector((state) => {
    if(state.epics.value[epicId] === undefined) {
      return null;
    }
    return state.epics.value[epicId];
  });
  const dispatch = useDispatch();

  useEffect(()=>{
    if(epic!==null){
      return;
    }
    axios.get('/epic/api/epics/' + epicId,{
      // baseURL: 'http://localhost:8000',
      responseType: 'json'
    }).then((response) => {
        dispatch(storeEpics([response.data]));
      });
  },[]);

  if(epic===null){
    return (<div>
      Loading...
    </div>);
  }

  return (<div>
    <EpicCard epic={epic} type="single" />
  </div>);
}

export default function Epic() {
  // {
  //   "id": -1,
  //   "name: "Epic-1",
  //   "desc": "Dummy desc 101",
  // }
  const epics = useSelector((state) => {
    const entries = [];
    for (const entry in state.epics.value) {
      entries.push(state.epics.value[entry]);
    }
    return entries;
  });
  console.log(epics);

  const dispatch = useDispatch();

  useEffect(
    ()=>{
      if(epics.length === 0) {
        axios.get('/epic/api/epics',{
          // baseURL: 'http://localhost:8000',
          responseType: 'json'
        }).then((response) => {
          console.log(response.data);
          dispatch(storeEpics(response.data));
        });
      }   
    }
  ,[]);

  let epicListContent;
  if(epics === {}) {
    epicListContent = <div key="-1">No epics to show</div> ;
  }
  else{
    epicListContent = epics.map(
      epic =><EpicCard key={epic.id} epic={epic} type="list" />
    );
  }

  return (
    <div>
      {epicListContent}
    </div>
  );
}

