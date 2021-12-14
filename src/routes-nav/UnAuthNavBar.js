import React from "react";
import { NavLink } from "react-router-dom";


const UnAuthNavBar= () =>{

  return (
    <nav className="w-full bg-gray-800">
            <NavLink exact to="/" > Jobly </NavLink>
            <NavLink exact to="/login" > Login </NavLink>
            <NavLink exact to="/signup" > Signup </NavLink>
    </nav>
  );
}
export default UnAuthNavBar;