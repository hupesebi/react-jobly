import UserContext from "../auth/UserContext";
import React, { useContext } from "react";
import AuthNavBar from "./AuthNavBar";
import UnAuthNavBar from "./UnAuthNavBar";

const NavBar = ( {logout}) => {
    const {currentUser} = useContext(UserContext)

    return (
        <div className="top-0 w-full">
          { currentUser
            ? <AuthNavBar logout={logout} />
            : <UnAuthNavBar />}
        </div>
      );
}

export default NavBar;