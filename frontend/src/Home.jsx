
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
    axios.get('/jwt-auth/logout/' ,{
      // baseURL: 'http://localhost:8000',
      responseType: 'json'
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
