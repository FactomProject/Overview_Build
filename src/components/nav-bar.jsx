import React from "react";
import SignIn from "./sign-in";

const NavBar = props => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <SignIn exact={true} isSignedIn={props.isSignedIn} />
  </nav>
);

export default NavBar;
