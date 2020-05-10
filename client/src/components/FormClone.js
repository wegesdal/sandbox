import React from 'react';
import axios from 'axios';
import EnterButton from './EnterButton.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight }  from '@fortawesome/free-solid-svg-icons';

class FormClone extends React.Component {
    constructor(props) {
      super(props);
      this.state = { title: '', password: ''};
    };

    mySubmitHandler = (event) => {
        event.preventDefault();
        axios.get('/games/' + this.props._id)
            .then(res => {
              console.log(res.data.title)
              const game = {
                title: this.state.title,
                html: res.data.html,
                css: res.data.css,
                js: res.data.js,
                password: this.state.password
              }
              axios.post('/games/add', game)
                .then(res => this.props.onEnter(res))
              })
      }
    changeTitle = (event) => {
      this.setState({title: event.target.value});
    }
    changePassword = (event) => {
        this.setState({password: event.target.value});
      }

    render() {
      return (
        <form onSubmit={this.mySubmitHandler}>
        <p>Save As:</p>
        <input
        autoFocus
          type='text'
          onChange={this.changeTitle}
        />
        <p>Password:</p>
        <input
          type='password'
          onChange={this.changePassword}
        />
        <EnterButton onClick={this.mySubmitHandler}><FontAwesomeIcon icon={faArrowRight} size="2x" /></EnterButton>
        </form>
      );
    }
  }

  export default FormClone