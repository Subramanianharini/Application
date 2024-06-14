import Head from 'next/head';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './login';
import SignupPage  from './signup';



function HomePage({ user }) {
  if (!user) return <div>Loading...</div>;

  return (
    <><div>
      <Head>
        <title>Home Page
        </title>
      </Head>
      <h1>Welcome, {user.username}!</h1>
      <p>Your email is {user.email}</p>
    </div><Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router></>
  );
}

export default HomePage;