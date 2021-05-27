// import React from 'react'
// import Button from 'react-bootstrap/Button'
// import axios from 'axios'
// import { withAuth0 } from '@auth0/auth0-react';


// class AddBook extends React.Component {
//   constructor(){
//     super();
//       this.state = {
//         book: null,
//         displayNewBook: false,
//       }

//       }

//       componentDidMount() {
//         if (this.props.auth0.isAuthenticated) {
//           this.props.auth0.getIdTokenClaims()
//             .then(tokenData => {
//               const token = tokenData.__raw;
//               const requestOptions = {
//                 headers: { "Authorization": `Bearer ${token}` },
//                 method: 'GET',
//                 // baseUrl: 'http://localhost:3001',
//                 url: 'http://localhost:3000/books'
//               }
//               axios(requestOptions).then(response => console.log(response.data));
//             });
//         }
//       }

//       createNewBook = () => {
//         this.props.auth0.getIdTokenClaims()
//           .then(tokenData => {
//             const token = tokenData.__raw;
//             const requestOptions = {
//               headers: { "Authorization": `Bearer ${token}` },
//               method: 'POST',
//               url: 'http://localhost:3000/books',
//               data: {
//                 name: 'Title Of Books',
//                 description: 'Description of Books',
//                 status: 'Skateboard',
//               }
//             }
//             axios(requestOptions).then(response => console.log(response.data));
//           });
//       }


//   render(){
//     return(
//       <div>
//         <Button onClick={() => this.setState({disp})}>Add Book</Button>
//       </div>

//     )
//   }
// }

// export default withAuth0(AddBook);