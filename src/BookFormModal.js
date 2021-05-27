import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


class BookFormModal extends React.Component{
  render(){
    return(
      <div>
        <Form >
          <Form.Group>
            <Form.Label>Title Of Book </Form.Label>
            <Form.Control type="text" onChange={this.props.newBookName}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Give A Brief Description Of The Book </Form.Label>
            <Form.Control type="text" onChange={this.props.newBookDescription}/>
          </Form.Group>


          <Form.Group>
            <Form.Label>Whats the Status of Book </Form.Label>
            <Form.Control type="text" onChange={this.props.newBookStatus}/>
          </Form.Group>

          <Button onSubmit={(e) => this.props.addBook(e)} type="submit">Add New Book</Button>
        </Form>
      </div>
  
    )
  }


}

export default BookFormModal;