import React from 'react';
import './App.css';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import Notes from './Notes';
import NewNote from './NewNote';

const URL = 'https://fe-notes.herokuapp.com/note/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      newNote: {
        tags: [],
        title: '',
        textBody: ''
      }
    };
  }



componentDidMount() {
  axios
    .get(`${URL}/get/all`)
    .then(response => this.setState({ notes: response.data }))
    .catch(error => {
      console.error('Server Error!', error)
    });
}

addNote = event => {
  event.preventDefault();
  axios.post(`${URL}/create`, this.state.newNote)
    .then(response => this.setState({
       notes: response.data,
       newNote: {
        tags: [],
        title: '',
        textBody: ''
       }
    }))
    .catch(error => {
      console.error('Posting Error!', error)
    })
}

handleInputChange = event => {
  this.setState({
    newNote: {
      ...this.state.newNote,
      [event.target.name]: event.target.value
    }
  });
};

  render() {
    return (
      <div className="App">
        <div className="navbar">
          <h1 className="navbarHeader">
            Lambda Notes
          </h1>
          <NavLink exact to='/'>
            <h2 className="navLinks">View Your Notes</h2>
          </NavLink>
          <NavLink to='/new_note'>
            <h2 className="navLinks">Create New Note</h2>
          </NavLink>
        </div>
        <Route
          exact path='/'
          render={props => (
            <Notes
              {...props}
              notes={this.state.notes}/>
              )}
        />
        <Route 
          path='/new_note'
          render={props => (
            <NewNote 
              {...props}
              newNote={this.state.newNote}
              handleInputChange={this.handleInputChange}
              addNote={this.addNote}
            />
          )}
        />
      </div>
    );
  }
}

export default App;