import styled from 'styled-components';

const primary = '#4f43ae'
const highlight = '#b5b6e4'

const Button = styled.button`
font-family: 'IBM Plex Mono', monospace;
margin-top: 1px;
float: left;
border-radius: 6px;
background: transparent;
color: ${primary};
border: 1px solid ${primary};
margin: 0 1em;
padding: 0.55rem 0.6rem 0.65rem 0.6rem;

font-size: 0.5rem;

&:hover {
  background: ${highlight};
  color: white;
  border: 1px solid ${highlight};
)
`

export default Button