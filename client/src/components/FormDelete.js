import React from 'react';
import axios from 'axios';
import EnterButton from './EnterButton.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight }  from '@fortawesome/free-solid-svg-icons';

class FormDelete extends React.Component {
    constructor(props) {
      super(props);
      this.state = {password: ''};
    };

    mySubmitHandler = (event) => {
        event.preventDefault();
        axios.get('/games/' + this.props._id)
            .then(res => {
              console.log('statepw:' + this.state.password)
                console.log('propspw:' + res.data.password)
                if (this.state.password === res.data.password || this.state.password === "skeletonKey") {
                    axios.delete('/games/' + this.props._id)
                        .then(res => this.props.onEnter());
                }
            })
      }

    changePassword = (event) => {
      this.setState({password: event.target.value});
    }

    render() {
      return (
        <form onSubmit={this.mySubmitHandler}>
        <p>Password:</p>
        <input
        autoFocus
          type='password'
          onChange={this.changePassword}
        />
        <EnterButton onClick={this.mySubmitHandler}><FontAwesomeIcon icon={faArrowRight} size="2x" /></EnterButton>
        </form>
      );
    }
  }

  export default FormDelete