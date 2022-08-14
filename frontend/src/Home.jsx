
import axios from "axios";
import { useEffect, useState } from "react";
import { addUser, removeUser} from './userSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';

import TForm, {csrfMiddleware, isCsrfCookiePresent} from './TForm.jsx';

export default function Home() {
  return <div>
    <div className="row">
      <div className="col">
        <div className="card my-4 mx-md-4 mx-1 text-center">
          <div className="card-header">
            Welcome to Ticketeer! Where innovation meets planning!
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 ">
        <div className="card my-4 mx-md-4 mx-1">
          <div className="card-header">
            Features
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Track ideas and bugs with issues</li>
            <li className="list-group-item">Estimate efforts for issues</li>
            <li className="list-group-item">Group issues under epics for easier tracking</li>
          </ul>
        </div>
      </div>
      <div className="col-md-6 ">
        <div className="card my-4 mx-md-4 mx-1">
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>Planning is half the work.</p>
              <footer className="blockquote-footer">Me in <cite title="Source Title">Right Now</cite></footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export function LoginRequired(){
  const unauthenticated = useSelector((state) => {
    return state.user.unauthenticated;
  });
  const location = useLocation();
  const navigate = useNavigate();

  if(unauthenticated) navigate('/login', {state: {next: location.pathname}});

  return <span className="LoginRequired" />;
};

export function Auth(props) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // 0 -> Nothing
  // -1 -> show error msg
  // 1 -> success!
  const [authState, setAuthState] = useState(0);
  const username = useSelector((state) => {
    return state.user.value;
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(isCsrfCookiePresent){
      return
    }
    axios.get("/jwt-auth/csrf/").catch((error)=>{
      console.log(error);
    });
  }, []);

  useEffect(()=>{
    if(authState!==1) return;
    let redirectPath;
    if(location.state){
      redirectPath = location.state.next;
    } else {
      redirectPath = "/";
    }
    navigate(redirectPath);
  },[authState]);

  const auth = async (e) => {
    e.preventDefault();
    var formdata = new FormData(e.target);
    const username = formdata.get('username');
    const password = formdata.get('password');
    // only for use when promise resolves
    // setUsername(formdata.get('username'));
    
    const reqConfig = {
      transformRequest: [csrfMiddleware]
    };
    if(!props.signup) reqConfig['auth'] = {
      username: username,
      password: password
    };
    axios.post(
      "/jwt-auth/"+ (props.signup?"signup":"login") +"/",
      formdata,
      reqConfig
    ).then((res)=>{
      console.log(res.data.message);
      dispatch(addUser(res.data.username));
      setAuthState(1);
    }).catch((error)=>{
      setAuthState(-1);
    });
  };

  const errorMsg = (
    <div className="alert alert-danger" role="alert">
      Auth Failed!
    </div>
  );

  const successMsg = (
    <div className="alert alert-success" role="alert">
      Welcome {username}!
    </div>
  );

  var msgWidget = <span/>;
  if(authState===-1) msgWidget=errorMsg;
  else if(authState===1) msgWidget=successMsg;

  return (
    <div className="App">
      <TForm onSubmit={auth}>

        <div className="form-group">
          <label for="username">Username</label>
          <input type="text" className="form-control" id="username" name="username" placeholder="username" 
          />
        </div>

        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">Auth</button>
        <div className="pt-2">{msgWidget}</div>

      </TForm>
    </div>
  );
};

export function Login() {
  return <Auth />;
}

export function Signup() {
  return <Auth signup/>;
}

export function TicketeerNav() {
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
  },[user, unauthenticated]);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const navBrand = <NavbarBrand href="#">Ticketeer</NavbarBrand>;
  const nameWidget = <NavbarText>{user}</NavbarText>;

  const toggleButton = <NavbarToggler onClick={toggle} />;

  const logout = (e)=>{
    e.preventDefault();

    axios.post('/jwt-auth/logout/' , {}, {
      // baseURL: 'http://localhost:8000',
      responseType: 'json',
      transformRequest: [csrfMiddleware]
    }).then((response) => {
        dispatch(removeUser());
    }).catch((e)=>console.log(e));    
  };

  const logOutWidget = (
    <NavItem>
      <NavLink href="#" onClick={logout}>
        Logout
      </NavLink>
    </NavItem>
  );

  const logInWidget = (
    <NavItem>
      <NavLink href="/login">
        Login
      </NavLink>
    </NavItem>
  );

  const signUpWidget = (
    <NavItem>
      <NavLink href="/signup">
        SignUp
      </NavLink>
    </NavItem>
  );

  const collapsible = (
    <Collapse isOpen={isOpen} navbar>
      <Nav className="me-auto" navbar>
        <NavItem>
          <NavLink href="/">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/epics">
            Epics
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/issues">
            Issues
          </NavLink>
        </NavItem>
        {unauthenticated ? logInWidget : logOutWidget}
        {unauthenticated ? signUpWidget : null}
      </Nav>
    </Collapse>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        {toggleButton}
        {navBrand}
        {collapsible}
        {nameWidget}
      </Navbar>
    </div>
  );
};
