import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import './App.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';

import NavR from './components/NavR';

import styled from 'styled-components'
import Games from './Games.js';
import EditGame from './EditGame.js';
import history from "./utils/history";

const primary = '#4f43ae'
const highlight = '#b5b6e4'

const SMLink = styled.a`
  align-items: center;
  padding: 1px 10px;
  color: ${primary};

  &:hover {
    color: ${highlight};
  }
`;

const Contact = styled.a`
font-family: 'IBM Plex Mono', monospace;

margin-top: 1px;
border-radius: 6px;
background: transparent;
color: ${primary};
border: 1px solid ${primary};
margin: 0 1em;
padding: 2.1em 1.4em 1.4em 1.4em;

font-size: 12px;

&:hover {
  background: ${highlight};
  color: white;
  border: 1px solid ${highlight};
)
`

const Hero = styled.div`
  padding: 1em 0em 6em 0em;
  text-align: center;
`

const Navbar = styled.div`
  background: transparent;
  color: black;
  padding: 2em 0em 0.5em 0em;
  margin: 0;
`

function App() {
  return (
    <div className="App">
      <Navbar>
        <Contact href="/list"><FontAwesomeIcon icon={faList} size="2x" /></Contact>
        <NavR><Contact href="mailto:william.egesdal@gmail.com"><FontAwesomeIcon icon={faPaperPlane} size="2x" /></Contact></NavR>
      </Navbar>

      <Router history={history}>
        <Hero><Switch>
          <Route path="/list" component={Games} />
          <Route path="/edit/:id" component={EditGame} /></Switch></Hero>
      </Router>

      <center>
        <SMLink href="https://github.com/wegesdal">
          <FontAwesomeIcon className="brand-icon" icon={faGithubSquare} size="4x" />
        </SMLink>
        <SMLink href="https://www.linkedin.com/in/william-egesdal-732a7b69/">
          <FontAwesomeIcon className="brand-icon" icon={faLinkedin} size="4x" />
        </SMLink>

      </center>
    </div>
  );
}

export default App;
