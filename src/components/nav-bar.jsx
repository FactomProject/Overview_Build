import React from "react";
import { NavLink } from "react-router-dom";
import SignIn from "./sign-in";

const NavBar = props => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <SignIn exact={true} isSignedIn={props.isSignedIn} />
  </nav>
);

export default NavBar;
