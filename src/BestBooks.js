
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios'
import { withAuth0 } from '@auth0/auth0-react';
// import BookFormModal from './BookFormModal';
// import { Carousel } from 'bootstrap';
import Form from 'react-bootstrap/Form';
import BookDisplay from './BookDisplay';
import Button from 'react-bootstrap/Button';
import { FormGroup, FormLabel } from 'react-bootstrap';


class MyFavoriteBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      search: ' ',
      name: '',
      description: ' ',
      status: ' ',
      deleteBook: ' ',
      books: 0,
      updatedBook: ' ',
      newName: ' ',
      newDescription: ' ',
      newStatus: ' ',
    }
  }


 retrieveBook = async () => {
    if(this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
      .then(res => {
        const jwt = res.__raw;

        const config = {
          headers: {"Authorization" : `Bearer ${jwt}`},
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/books'
        }
        axios(config)
          .then(response => {
            this.setState({books: response.data}, () => console.log(response.data))
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    }
  }


  addBookData = async () => {
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        console.log(process.env.REACT_APP_SERVER)
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'post',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/books',
          params: {nameOfBook: this.state.name, descriptionOfBook: this.state.description, statusOfBook: this.state.status}
        }
        axios(requestConfig)
          .then(response => {
            // console.log(response.data)
            this.setState({ books: response.data }, () => console.log(response.data));
          })
          .catch(err => console.error(err));
      })
  }

  deleteBookData = async () => {
    const bookTitle = this.state.deleteBook;
    let indexHere;
    for (let i = 0; i < this.state.books.length; i++) {
      if (bookTitle === this.state.books[i].name) {
        indexHere = i;
      }
    }
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'delete',
          baseURL: process.env.REACT_APP_SERVER,
          url: `/books/${indexHere}`
        }
        axios(requestConfig)
          .then(response => {
            console.log(response.data)
          })
          .catch(err => console.error(err));
      })
  }

  updateBook = async () => {
    const updatedBookEntry = this.state.deleteBook;
    let indexHere;
    if(updatedBookEntry < this.state.books.length) {
      indexHere = updatedBookEntry
    }
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'put',
          baseURL: process.env.REACT_APP_SERVER,
          url: `/books/${indexHere}?updateName=${this.state.newName}&updateDescription=${this.state.newDescription}&updateStatus=${this.state.newStatus}`,
        }
        axios(requestConfig)
          .then(response => {
            console.log(response.data)
          })
          .catch(err => console.error(err));
      })
  }

  newBookName = (e) => {this.setState({name: e.target.value})};
  newBookDescription = (e) => {this.setState({description: e.target.value})}
  newBookStatus = (e) => {this.setState({status: e.target.value })}
  newDelete = (e) => {this.setState({deleteBook: e.target.value})}
  updatedNameOfBook = (e) => {this.setState({newName: e.target.value})}
  updatedBookDescription = (e) => {this.setState({newDescription: e.target.value})}
  updatedBookStatus = (e) => {this.setState({newStatus: e.target.value})}
  // newUpdate = (e) => {this.setState({updatedBook: e.target.value})}

  
  
  render() {
    return(
      <div>
      <Jumbotron style={{background:"url('https://data.whicdn.com/images/295847954/original.gif')", backgroundSize:'fill'}} id="jumbo">
        <h1 id='title' style={{color: 'white'}}>My Favorite Books</h1>
        </Jumbotron>
        <Form id="lookbooks"> 
        <Button variant="info" onClick={this.retrieveBook}>Take A Look At My Books</Button>
          <FormGroup>
        {this.state.books.length > 0
          ? this.state.books.map(item => {
            return (
              <BookDisplay
                name={item.name}
                description={item.description}
                status={item.status}
              />
            )
          })
          : null}
          </FormGroup>
          </Form>
        <Form id="formGroups" >
          <FormGroup style={{margin: '10px'}}>
          <Form.Label style={{marginBottom: '10px'}}> <h4>Enter A New Book</h4> </Form.Label>
          <Form.Control placeholder="Name Of Book" onChange={this.newBookName}></Form.Control>
          <Form.Control placeholder="Description Of Book" onChange={this.newBookDescription}></Form.Control>
          <Form.Control placeholder="Status Of Book" onChange={this.newBookStatus}></Form.Control>
          <Button variant='success' style={{margin: '10px'}} onClick={this.addBookData}>Add Book</Button>
          </FormGroup>

          <FormGroup style={{margin: '10px'}}>
          <FormLabel> <h4>Update A Book</h4> </FormLabel>
          <Form.Control placeholder="Update Book Name" onChange={this.updatedNameOfBook}></Form.Control>
          <Form.Control placeholder="Update Book Description" onChange={this.updatedBookDescription}></Form.Control>
          <Form.Control placeholder="Update Book Status" onChange={this.updatedBookStatus}></Form.Control>
          <Button variant='warning' style={{margin: '10px'}} onClick={this.updateBook}>Update Specific Book </Button>
          </FormGroup>

          
          <FormGroup style={{margin: '10px'}}>
            <FormLabel> <h4>Remove A Book</h4> </FormLabel>
          <Form.Control placeholder="Book Title to delete" onChange={this.newDelete}></Form.Control>
          <Button variant='danger' style={{margin: '10px'}} onClick={this.deleteBookData}>Remove Undesired Book</Button>
          </FormGroup>
         </Form>
          </div>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
