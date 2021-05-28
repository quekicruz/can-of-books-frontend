import React from 'react';
import Card from 'react-bootstrap/Card'
import './BestBooks.css' 

class RenderBook extends React.Component {
  render() {
    return (
      <Card id="cardDisplay" style = {{height: '400px', width: '100px', display: 'inline-flex', marginTop: '10px', backgroundColor: 'maroon'}}>
        <Card.Title style={{color: 'white'}}>Book Name: {this.props.name}</Card.Title>
        <Card.Body> 
          <Card.Text>Book Description: {this.props.description}</Card.Text>
          <Card.Text>Status Of Book: {this.props.status}</Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default RenderBook;
