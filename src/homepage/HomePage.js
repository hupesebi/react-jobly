
import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from "../auth/UserContext";
import { useContext } from "react";



const HomePage = () => {
  const { currentUser } = useContext(UserContext);

  /* Renders view for current user */
  function renderLoggedInView() {
    return (
      <div>
        <h2> Welcome Back, {currentUser.firstName || currentUser.username}! </h2>
      </div>);
  }
  /* Renders view when there is no current user */
  function renderLoggedOutView() {
    return (
      <div >
        <Link to="/login" > Login </Link>
        <Link to="/signup"> Signup! </Link>
      </div>);
  }
  return (
    <div>
      <header>
      
          <h1>Jobly!
            <small><br />All the jobs in one convenient place!</small>
          </h1>
        
      </header>
      <main>
        <div>
          {currentUser ? renderLoggedInView() : renderLoggedOutView()}
        </div>
      </main>

    </div>
  );
}

export default HomePage;