import  { BrowserRouter } from 'react-router-dom';
import NavBar from './routes-nav/NavBar';
import Routes from './routes-nav/Routes';
import React, { useState, useEffect } from 'react';
import UserContext from "./auth/UserContext";
import JoblyApi from './api/APIHelper';
import jwt from "jsonwebtoken";
import useLocalStorage from "./hooks/useLocalStorage";

export const TOKEN_STORAGE_ID = "jobly-token";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [appliedIds, setAppliedIds] = useState(new Set([]));
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  // change currUser whenever the token changes via effect with token as dependency

  useEffect(function makeApiRequestForUser() {
    async function fetchUser() {
      if (token) {
        try {
          const { username } = jwt.decode(token);
          // put token on API class so it can make the request
          JoblyApi.token = token;
          const currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setAppliedIds(new Set(currentUser.applications));
        } catch (e) {
          console.error("App fetchUser: problem loading", e);
          setCurrentUser(null);
        }
      }
    }
    fetchUser();
  }, [token]);


  async function login(loginData) {
    try {
      const userToken = await JoblyApi.login(loginData);
      setToken(userToken);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  };


  function logoutUser() {
    setToken(null);
    setCurrentUser(null);
  }

 
  async function signup(signupData) {
    try {
      const userToken = await JoblyApi.signup(signupData);
      setToken(userToken);
      return { success: true }
    } catch (errors) {
      return { success: false, errors }
    }
  }

  async function updateProfile(updateInfo) {
    try {
      const res = await JoblyApi.updateUser(currentUser.username, updateInfo);
      setCurrentUser(res);
      return {success: true}
    } catch (errors) {
      return {success: false, errors}
    }
  }


  function hasAppliedToJob(id) {
    return appliedIds.has(id);
  }


  function applyToJob(jobId) {
    if (hasAppliedToJob(jobId)) return;
    JoblyApi.applyToJob(currentUser.username, jobId);
    setAppliedIds(new Set([...appliedIds, jobId]));
  }


  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
          <NavBar logout={logoutUser} />
          <Routes
            signup={signup}
            login={login} 
            updateProfile={updateProfile}
          />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;