import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";


function AuthNavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <nav className="w-full bg-gray-800">
            
              <NavLink exact to="/" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" > Jobly </NavLink>
              <NavLink exact to="/companies"> Companies </NavLink>
              <NavLink exact to="/jobs"> Jobs </NavLink>
              <NavLink exact to="/profile"> Profile </NavLink>
              <button onClick={logout}> Logout {currentUser.firstName} </button>
    </nav>
  );
}
export default AuthNavBar;