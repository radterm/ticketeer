
import axios from "axios";
import { useEffect, useState } from "react";
import { addUser, removeUser} from './userSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

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

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 0 -> Nothing
  // -1 -> show error msg
  // 1 -> success!
  const [loginState, setLoginState] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if(isCsrfCookiePresent){
      return
    }
    axios.get("/jwt-auth/csrf/").catch((error)=>{
      console.log(error);
    });
  }, []);

  const login = async (e) => {
    e.preventDefault();
    axios.post(
      "/jwt-auth/login/",
      {
        username,
        password,
      },
      { withCredentials: true }
    ).then((res)=>{
      console.log(res.data.message);
      dispatch(addUser(username));
      setLoginState(1);
    }).catch((error)=>{
      console.log(error);
      setLoginState(-1);
    });
  };

  const errorMsg = (
    <div class="alert alert-danger" role="alert">
      Login Failed!
    </div>
  );

  const successMsg = (
    <div class="alert alert-success" role="alert">
      Welcome {username}!
    </div>
  );

  var msgWidget = <span/>;
  if(loginState===-1) msgWidget=errorMsg;
  else if(loginState===1) msgWidget=successMsg;


  return (
    <div className="App">
      <TForm onSubmit={login}>

        <div className="form-group">
          <label for="username">Username</label>
          <input type="text" className="form-control" id="username" name="username" placeholder="username" 
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label for="password">Username</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="password" 
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
        <div className="pt-2">{msgWidget}</div>

      </TForm>
    </div>
  );
};

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
        Login or SignUp
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
