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

const LinkButton = styled.a`
font-family: 'IBM Plex Mono', monospace;

margin-top: 1px;
border-radius: 6px;
background: transparent;
color: ${primary};
border: 1px solid ${primary};
margin: 0 1em;
padding: 0.8rem 0.7rem 0.7rem 0.5rem;

font-size: 0.5rem;

&:hover {
  background: ${highlight};
  color: white;
  border: 1px solid ${highlight};
)
`

const Hero = styled.div`
  padding: 1rem 0rem 6rem 0rem;
  text-align: center;
`

const Navbar = styled.div`
  background: transparent;
  color: black;
  padding: 2rem 0rem 0.5rem 0rem;
  margin: 0;
`

function App() {
  
  return (
    <div className="App">
      <Navbar>
        <LinkButton href="/list"><FontAwesomeIcon icon={faList} size="2x" /></LinkButton>
        <NavR><LinkButton href="mailto:william.egesdal@gmail.com"><FontAwesomeIcon icon={faPaperPlane} size="2x" /></LinkButton></NavR>
      </Navbar>
      <Router history={history}>
        <Hero><Switch>
          <Route path="/list" component={Games} />
          <Route path="/edit/:id" component={EditGame} /></Switch></Hero>
      </Router>

      <center>
        <SMLink href="https://github.com/wegesdal">
          <FontAwesomeIcon className="brand-icon" icon={faGithubSquare} size="2x" />
        </SMLink>
        <SMLink href="https://www.linkedin.com/in/william-egesdal-732a7b69/">
          <FontAwesomeIcon className="brand-icon" icon={faLinkedin} size="2x" />
        </SMLink>

      </center>
    </div>
  );
}

export default App;
