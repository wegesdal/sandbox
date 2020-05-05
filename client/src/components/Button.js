import styled from 'styled-components';

const primary = '#4f43ae'
const highlight = '#b5b6e4'

const Button = styled.button`
font-family: 'IBM Plex Mono', monospace;

margin-top: 1px;
border-radius: 32px;
background: transparent;
color: ${primary};
border: 1px solid ${primary};
margin: 0 1em;
padding: 1.6em 1.7em 1.4em 1.4em;

font-size: 12px;

&:hover {
  background: ${highlight};
  color: white;
  border: 1px solid ${highlight};
)
`

export default Button