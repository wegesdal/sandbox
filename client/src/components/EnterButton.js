import styled from 'styled-components';

const primary = '#4f43ae'
const highlight = '#b5b6e4'

const ModalButton = styled.button`
position: absolute;
bottom: 0px !important;
right: 0px !important;
padding: 0.2rem 0.2rem 0.2rem 0.2rem;
margin: 0 0 0 0;
border-radius: 8px;
border: 1px solid #0000;
color: #fff;
background-color: ${highlight};

&:hover {
    background: ${highlight};
    color: ${primary};
    border: 1px solid ${primary};
  )
`
export default ModalButton