import {useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import {storeEpics} from './epicSlice.js';

import Issue from '../issue/issue.jsx';

function EpicCard(props) {
  let navigate = useNavigate();
  const epic = props.epic;

  const editWidget = <button type="button" className="btn btn-light btn-sm" onClick={(event)=>{
            navigate("/epics/"+epic.id+"/edit");
            event.stopPropagation();
          }}>Edit Epic</button>;

  if(props.type === "list")  return (
    <div className="my-2" onClick={()=>navigate("./"+epic.id)}>
      <div className="card">
        <div className="card-body">
          <h6 className="card-title text-truncate">
            <span>Epic-{epic.id} </span>
          </h6>
          <p className="card-text text-truncate text-muted">{epic.desc}</p>
          {editWidget}
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
          {editWidget}
        </div>
      </div>
    </div>
  );
}

export function EpicCreateUpdateView(){
  const {epicId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const epicParam = useSelector((state) => {
    return state.epics.value[epicId];
  });

  useEffect(()=>{
    if(epicId===undefined){
      return;
    }
    axios.get('/epic/api/epics/' + epicId,{
      // baseURL: 'http://localhost:8000',
      responseType: 'json'
    }).then((response) => {
        dispatch(storeEpics([response.data]));
      });
  },[epicId]);

  const [apiState, setApiState] = useState("initial");
  const [epic, setEpic] = useState(-1);

  const handleSubmit = (event)=>{

    var formdata = new FormData(event.target);
    console.log("formdata is:", formdata);
    setApiState("creating");

    const method = (epicParam===undefined?"post":"patch");
    const url = (epicParam===undefined?"/epic/api/epics/":"/epic/api/epics/"+epicParam.id+"/");    

    axios({
      method: method, 
      url: url , 
      data: formdata
    }).then((response) => {
      console.log(response.data);
      dispatch(storeEpics([response.data]));
      setEpic(response.data.id);
      setApiState("created");
    }).catch((error) => {
      console.log(error);
      setApiState("failed");
    });

    event.preventDefault();

  };

  if(apiState==="created") navigate("/epics/"+ epic);

  var formInputs;
  if (epicId===undefined) {
    formInputs = (<div>
      <div className="form-group">
        <label for="epic-heading">The heading of the epic</label>
        <input type="text" className="form-control" id="epic-heading" name="name" placeholder="Heading" />
      </div>
      <div className="form-group">
        <label for="epic-decsription">The description of the epic</label>
        <textarea className="form-control" id="epic-decsription" name="desc" placeholder="Description" />
      </div>
      <button type="submit" className="btn btn-primary">Create Epic</button>
    </div>) ;
  } else if (epicParam===undefined) {
    return (<div>
      Loading...
    </div>);
  } else {
    formInputs = (<div>
      <div className="form-group">
        <label for="epic-heading">The heading of the epic</label>
        <input type="text" className="form-control" id="epic-heading" name="name" defaultValue={epicParam.name} />
      </div>
      <div className="form-group">
        <label for="epic-decsription">The description of the epic</label>
        <textarea className="form-control" id="epic-decsription" name="desc" defaultValue={epicParam.desc} />
      </div>
      <button type="submit" className="btn btn-primary">Edit Epic</button>
    </div>);
  }

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
  },[epicId]);

  if(epic===null){
    return (<div>
      Loading...
    </div>);
  }

  return (<div>
    <EpicCard epic={epic} type="single" />
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Issues</h5>
        <hr/>
        <Issue epic={epic.id}></Issue>
      </div>
    </div>
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

