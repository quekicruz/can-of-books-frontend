import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import BestBooks from './BestBooks';
import Profile from './Profile'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import Content from './Content'



class App extends React.Component {

  render() {
    console.log('app', this.props);
    return(
      <>
      <div>
      <LoginButton />
        <LogoutButton /> 
         {this.props.auth0.isAuthenticated
          ? <Content />
          : null}
      </div>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/BestBooks">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                <BestBooks />
              </Route>
              <Route exact path="/Profile">
              <Profile />
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
