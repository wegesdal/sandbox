import React, { Component } from 'react';
import axios from 'axios';

import { withRouter } from 'react-router-dom'

import { Controlled as CodeMirror } from 'react-codemirror2';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faJs, faCss3Alt, faHtml5 } from '@fortawesome/free-brands-svg-icons';

import Button from './components/Button.js';
import NavL from './components/NavL';
import Header from './components/Header.js';

import Modal from './components/Modal.js';
import FormSave from './components/FormSave.js';

import styled from 'styled-components';

import './react-tabs.css';
import './snes.css';

require('codemirror/lib/codemirror.css');
require('codemirror/addon/edit/matchbrackets');
require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/lint/lint');
require('codemirror/addon/lint/javascript-lint');
require('codemirror/addon/lint/lint.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/css/css.js');
require('codemirror/mode/htmlmixed/htmlmixed.js')
require('codemirror/mode/javascript/javascript.js');

const W = styled.h1`color: white; font-family: Arcade`

class EditGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      htmlValue: '',
      cssValue: '',
      jsValue: '',
      password: '',
      showModal: false,
      modalContent: null
    }
  }

  componentDidMount() {
    axios.get('/games/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          htmlValue: decodeURI(response.data.html),
          cssValue: decodeURI(response.data.css),
          jsValue: decodeURI(response.data.js),
          password: response.data.password,
        })
      }
      ).then(() => { this.renderFrame() })
      .catch((error) => {
        console.log(error);
      })
  }

  updateGame = (pw) => {
    const game = {
      title: this.state.title,
      html: encodeURI(this.state.htmlValue),
      css: encodeURI(this.state.cssValue),
      js: encodeURI(this.state.jsValue),
      password: pw
    }
    axios.post('/games/update/' + this.props.match.params.id, game)
      .then(res => this.setState({ modalContent: <W>{res.data}</W> }));
  }

  cloneGame = (title, pw) => {
    const game = {
      title: title,
      html: encodeURI(this.state.htmlValue),
      css: encodeURI(this.state.cssValue),
      js: encodeURI(this.state.jsValue),
      password: pw
    }
    console.log(game)
    axios.post('/games/add', game)
      .then(res => this.props.history.push('/edit/' + res.data))
  }

  setupEditors = () => {
    const editors = document.getElementsByClassName("CodeMirror")
    for (let editor of editors) {
      editor.style = "height:500px"
    }
  }

  prepareSource = (html, css) => {
    let src = html;
    css = '<style>' + css + '</style>';
    src = src.replace('</head>', css + '</head>');
    return src;
  };

  renderFrame = () => {
    const oldFrame = document.getElementById("output");
    const outputParent = oldFrame.parentNode;

    outputParent.removeChild(oldFrame);
    const newFrame = document.createElement("iframe");
    newFrame.className = "embed-responsive-item";
    newFrame.id = "output";

    outputParent.appendChild(newFrame);

    const iframe_doc = newFrame.contentDocument;
    iframe_doc.open();
    iframe_doc.write(this.prepareSource(this.state.htmlValue, this.state.cssValue));
    iframe_doc.write(
      `<script>try { ${this.state.jsValue} } catch (error) {console.log(error)}; <` +
      "/script>"
    );
    iframe_doc.close();
  };

  saveModal = (e) => {
    this.setState({
      show: !this.state.show,
      modalContent: <FormSave onEnter={pw => { this.updateGame(pw) }} _id={this.props.match.params.id} />
    })
  }

  showModal = (e) => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    return (
      <div>
        <Header>{this.state.title}</Header>
        <Modal onClose={this.showModal} show={this.state.show}>
          {this.state.modalContent}
        </Modal>

        <Tabs defaultIndex={3} onSelect={(index, lastIndex, event) => { if (index === 3) { this.renderFrame() } }}>
          <TabList>
            <Tab><FontAwesomeIcon icon={faHtml5} size="2x" /></Tab>
            <Tab><FontAwesomeIcon icon={faCss3Alt} size="2x" /></Tab>
            <Tab><FontAwesomeIcon icon={faJs} size="2x" /></Tab>
            <Tab><FontAwesomeIcon icon={faPlay} size="2x" /></Tab>
          </TabList>

          <TabPanel>
            <CodeMirror
              value={this.state.htmlValue}
              options={{
                mode: 'htmlmixed',
                theme: 'snes',
                lineNumbers: true,
                viewportMargin: Infinity
              }}

              onBeforeChange={(editor, data, value) => {
                this.setState({ htmlValue: value });
              }}
            />
          </TabPanel>
          <TabPanel>
            <CodeMirror
              value={this.state.cssValue}
              options={{
                mode: 'css',
                theme: 'snes',
                lineNumbers: true,
                viewportMargin: Infinity
              }}
              onBeforeChange={(editor, data, value) => {
                this.setState({ cssValue: value });
              }}
            />
          </TabPanel>
          <TabPanel>
            <CodeMirror
              value={this.state.jsValue}
              options={{
                mode: 'javascript',
                theme: 'snes',
                lineNumbers: true,
                viewportMargin: Infinity,
                /* Addons */
                matchBrackets: true,
                autoCloseBrackets: true,
                gutters: ['CodeMirror-lint-markers'],
                lint: { esversion: 6 }

              }}
              onBeforeChange={(editor, data, value) => {
                this.setState({ jsValue: value });
              }}
              editorDidMount={this.setupEditors}
            />
          </TabPanel>
          <TabPanel forceRender={true}>
            <NavL>
              <Button id="updateButton" onClick={this.saveModal}><FontAwesomeIcon icon={faSave} size="2x" /></Button>
            </NavL>
            <div id="output-parent"><iframe id="output" title="output" /></div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(EditGame);