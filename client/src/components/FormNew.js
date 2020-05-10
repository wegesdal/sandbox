import React from 'react';
import axios from 'axios';
import EnterButton from './EnterButton.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight }  from '@fortawesome/free-solid-svg-icons';


class MyForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { title: '', password: ''};
    }

    ;

    mySubmitHandler = (event) => {
        event.preventDefault();

        const game = {
            title: this.state.title,
            html: '',
            css: '',
            js: '',
            password: this.state.password
        }
        axios.post('/games/add', game)
            .then(res => this.props.onEnter(res))
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
        <p>Title:</p>
        <input
        autoFocus
          type='text'
          onChange={this.changeTitle}
        />
        <p>Password:</p>
        <input
          type='text'
          onChange={this.changePassword}
        />
        <EnterButton onClick={this.mySubmitHandler}><FontAwesomeIcon icon={faArrowRight} size="2x" /></EnterButton>

        </form>
      );
    }
  }

  export default MyForm