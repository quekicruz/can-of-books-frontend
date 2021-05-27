import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios'
import { withAuth0 } from '@auth0/auth0-react';
import BookFormModal from './BookFormModal';
// import BookDisplay from './BookDisplay';


class MyFavoriteBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      search: ' ',
      name: '',
      description: ' ',
      status: ' ',
      newbook: {},
    }
  }


  componentDidMount = () => {
    if(this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
      .then(res => {
        const jwt = res.__raw;

        const config = {
          header: {"Authorization" : `Bearer ${jwt}`},
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/books'
        }
        axios(config)
          .then(axiosResults => console.log(axiosResults.data))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    }
  }


  addBookData = async () => {
    this.props.auth0.getIdTokenClaims()
      .then(tokenData => {
        const jwt = tokenData.__raw;
        const requestConfig = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'post',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/books',
        }
        axios(requestConfig)
          .then(response => {
            // console.log(response.data)
            this.setState({ books: response.data }, () => console.log(response.data));
          })
          .catch(err => console.error(err));
      })
  }

  newBookName = (e) => this.setState({name: e.target.value});
  newBookDescription = (e) => this.setState({description: e.target.value})
  newBookStatus = (e) => this.setState({status: e.target.value })

  addANewBook = async (e) => {
    e.prevenDefault();

    const bodyData = {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status, 
    }
    let bookResponse = await axios.get('http://localhost:3000/books', bodyData);

    this.setState({newbook: bookResponse.data})
  }


  render() {
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <BookFormModal
        newBookName={this.newBookName} 
        newBookDescription={this.newBookDescription}
        newBookStatus={this.newBookStatus}
        />
        {/* <BookDisplay /> */}
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
