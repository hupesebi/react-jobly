import React from 'react';
import JobList from '../jobs/JobList';
import HomePage from '../homepage/HomePage';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import CompanyList from '../companies/CompanyList';
import ProfileForm from '../profiles/ProfileForm';
import PrivateRoutes from "./PrivateRoutes";
import CompanyDetails from '../companies/CompanyDetails';
import { Route, Switch, Redirect } from 'react-router-dom';


function Routes({ signup, login, updateProfile }) {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>

      <Route exact path="/signup">
        <SignUpForm handleSignUp={signup} />
      </Route>

      <Route exact path="/login">
        <LoginForm handleLogin={login} />
      </Route>

      <PrivateRoutes exact path="/companies">
        <CompanyList />
      </PrivateRoutes>

      <PrivateRoutes exact path="/companies/:handle">
        <CompanyDetails />
      </PrivateRoutes>

      <PrivateRoutes exact path="/jobs">
        <JobList />
      </PrivateRoutes>

      <PrivateRoutes exact path="/profile">
        <ProfileForm handleUpdate={updateProfile} />
      </PrivateRoutes>

      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default Routes;