import React from 'react'
import {withAuth0} from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';

class Profile extends React.Component{

  render() {
    return(
      <div>
        <Card>
          <Card.Body>
          <Card.Title>Username: {this.props.auth0.user.nickname}</Card.Title>
            <Card.Img variant="top" src={this.props.auth0.user.picture} />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

 

export default withAuth0(Profile);