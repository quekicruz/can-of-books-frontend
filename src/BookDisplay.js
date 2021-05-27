import React from 'react';
import Card from 'react-bootstrap/Card'

class RenderBook extends React.Component {
  render() {
    return (
      <Card>
        <Card.Text>Book Name: {this.props.name}</Card.Text>
        <Card.Text>Book Description: {this.props.description}</Card.Text>
        <Card.Text>Status Of Book: {this.props.status}</Card.Text>
      </Card>
    )
  }
}

export default RenderBook;
