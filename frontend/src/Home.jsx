
import axios from "axios";
import { useEffect, useState } from "react";
import { addUser, removeUser} from './userSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const getCsrfToken = () => {
      try {
        const res = axios.get("/jwt-auth/csrf/", {
          withCredentials: true,
        });
        const csrfToken = res.headers.get("X-CSRFToken");
      } catch (error) {
        console.log(error);
      }
    };
    getCsrfToken();
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/jwt-auth/login/",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log(res.data.message);
      dispatch(addUser(username));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={login}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export function Nav() {
  const [user, unauthenticated] = useSelector((state) => {
    return [state.user.value, state.user.unauthenticated];
  });
  const dispatch = useDispatch();

  useEffect(()=>{
    if(user!==null || unauthenticated){
      return;
    }
    axios.get('/jwt-auth/getUser/' ,{
      // baseURL: 'http://localhost:8000',
      responseType: 'json'
    }).then((response) => {
        dispatch(addUser(response.data.username));
    }).catch((e)=>dispatch(removeUser()));
  },[]);

  const navBrand = <a className="navbar-brand" href="#">Ticketeer</a>;
  const toggleButton = (
    <button className="navbar-toggler ml-2" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  );
  const logOutWidget = (
    <a className="nav-item nav-link" onClick={(e)=>{
      e.preventDefault();
      axios.get('/jwt-auth/logout/' ,{
        // baseURL: 'http://localhost:8000',
        responseType: 'json'
      }).then((response) => {
          dispatch(removeUser());
      }).catch((e)=>console.log(e));    
    }}>LogOut</a>
  );

  const collapsible = (
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-item nav-link active" to="/">Home <span className="sr-only">(current)</span></Link>
        <Link className="nav-item nav-link" to="/epics">Epics</Link>
        <Link className="nav-item nav-link" to="/issues">Issues</Link>
        {unauthenticated?<Link className="nav-item nav-link" to="/login">Login or SignUp</Link>:logOutWidget}
      </div>
    </div>
  );
  const nameWidget = (
    <span className="navbar-text ml-auto">
      {user}
    </span>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {navBrand}
      {collapsible}
      {nameWidget}
      {toggleButton}
    </nav>
  );
};
