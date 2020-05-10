import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import CloseButton from './CloseButton.js';

const highlight = '#b5b6e4'

const ModalBox = styled.div`
width: 200px;
height: 200px;
opacity: 80%;
position: fixed;
border-radius: 6px;
border: 0px;
top: 50%;
left:50%;
margin-top: -100px; /* Negative half of height. */
margin-left: -100px;
background: ${highlight};
`

export default class Modal extends React.Component {

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };

    render() {
        
        if (!this.props.show) {
            return null;
        }
        return <ModalBox>
        <div>{this.props.children}</div>
        <div>
          <CloseButton
            onClick={e => {
              this.onClose(e);
            }}>
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </CloseButton>
        </div>
      </ModalBox>;
    }
}