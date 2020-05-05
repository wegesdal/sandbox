import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Grid, GridCol } from 'griz';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import Button from './components/Button.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faClone } from '@fortawesome/free-solid-svg-icons';


import NavL from './components/NavL';
import { faJs } from '@fortawesome/free-brands-svg-icons';
import { faCss3Alt } from '@fortawesome/free-brands-svg-icons';
import { faHtml5 } from '@fortawesome/free-brands-svg-icons';
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

export default class EditGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      htmlValue: '',
      cssValue: '',
      jsValue: '',
      password: '',
    }
  }

  componentDidMount() {
    axios.get('games/' + this.props.match.params.id)
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

  updateGame = (e) => {
    e.preventDefault();
    const passwordInput = prompt("What is the password?")
    if (passwordInput === this.state.password || passwordInput === "skeletonKey") {
      const game = {
        title: this.state.title,
        html: encodeURI(this.state.htmlValue),
        css: encodeURI(this.state.cssValue),
        js: encodeURI(this.state.jsValue),
        password: this.state.password
      }
      axios.post('games/update/' + this.props.match.params.id, game)
        .then(res => console.log(res.data), alert("Save Successful."));
    } else {
      alert("Incorrect Password.")
    }
  }

  cloneGame = (e) => {
    e.preventDefault();
    const newTitle = prompt("Set Title", this.state.title + 'remix')
    const password = prompt("Set Password");
    const game = {
      title: newTitle,
      html: encodeURI(this.state.htmlValue),
      css: encodeURI(this.state.cssValue),
      js: encodeURI(this.state.jsValue),
      password: password
    }
    axios.post('games/add', game)
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
    const oldFrameParent = oldFrame.parentNode;
    oldFrameParent.removeChild(oldFrame);

    const newFrame = document.createElement("iframe");
    newFrame.className = "embed-responsive-item";
    newFrame.id = "output";

    oldFrameParent.appendChild(newFrame);

    const iframe_doc = newFrame.contentDocument;
    iframe_doc.open();
    iframe_doc.write(this.prepareSource(this.state.htmlValue, this.state.cssValue));
    iframe_doc.write(
      `<script>try { ${this.state.jsValue} } catch (error) {console.log(error)}; <` +
      "/script>"
    );
    iframe_doc.close();
  };

  render() {
    return (
      <div>
        <Grid gutterless>
          <GridCol column="50">

            <Tabs>
              <TabList>
                <Tab><FontAwesomeIcon icon={faHtml5} size="2x" /></Tab>
                <Tab><FontAwesomeIcon icon={faCss3Alt} size="2x" /></Tab>
                <Tab><FontAwesomeIcon icon={faJs} size="2x" /></Tab>
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
            </Tabs>
          </GridCol>
          <GridCol column="50">
            <NavL>
              <Button id="renderButton" onClick={this.renderFrame}><FontAwesomeIcon icon={faPlay} size="2x" /></Button>
              <Button id="updateButton" onClick={this.updateGame}><FontAwesomeIcon icon={faSave} size="2x" /></Button>
              <Button id="cloneButton" onClick={this.cloneGame}><FontAwesomeIcon icon={faClone} size="2x" /></Button>
            </NavL>
            <div><iframe id="output" title="output" /></div>



          </GridCol>
        </Grid>
      </div>
    );
  }
}
