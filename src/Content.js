import React from 'react';
import axios from 'axios';
// wrapper that allows prop injection into child components
import { withAuth0 } from '@auth0/auth0-react';

class Content extends React.Component {
  componentDidMount = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
        .then(tokenData => {
          const jwt = tokenData.__raw;

          console.log(jwt);
          const requestConfig = {
            headers: { "Authorization": `Bearer ${jwt}` },
            method: 'get',
            baseURL: process.env.REACT_APP_SERVER || 'http://localhost:3000',
            url: '/books'
          }
          axios(requestConfig)
            .then(response => {
              console.log(response.data);
            })
            .catch(err => console.error(err));

        }).catch(err => console.log(err));
    }
  }

  render() {
    return (
      <h1>You are Authorized!!</h1>
    )
  }
}

export default withAuth0(Content);