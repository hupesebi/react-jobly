import React, { useContext} from "react";
import UserContext from "../auth/UserContext";
import { Redirect, Route } from "react-router-dom";


function PrivateRoutes({exact, path, children}) {
  const {currentUser} = useContext(UserContext);

  if (!currentUser) 
  return <Redirect to="/login" />

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoutes;