import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faClone } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Button from './components/Button.js';
import SearchField from './components/SearchField.js';
import FormNew from './components/FormNew.js';
import FormClone from './components/FormClone.js';
import FormDelete from './components/FormDelete.js';
import Header from './components/Header.js';

import Modal from './components/Modal.js';

const primary = '#4f43ae'

const Th = styled.th`
text-align: left
`

const Td = styled.td`
border-bottom: 1px solid #0000;
text-align: left
`
const Tr = styled.tr`
color: ${primary}
background-color: #0000
`
const Table = styled.table`
  width: 70%
  margin-top:1rem
  margin-left:15%
  margin-right:15%
`;

const Game = props => (
    <Tr>
        <Td>
            <Link to={"/edit/" + props.game._id} style={{ textDecoration: 'none', color: primary }}>
                {props.game.title}
            </Link>
        </Td>
        <Td>
            <Button onClick={() => { props.cloneGame(props.game._id) }}>
                <FontAwesomeIcon icon={faClone} size="2x" />
            </Button>
        </Td>
        <Td>
            <Button onClick={() => { props.deleteGame(props.game._id) }}>
                <FontAwesomeIcon icon={faTrash} size="2x" />
            </Button>
        </Td>

    </Tr>
)

class GamesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            games: [],
            search: '',
            showModal: false,
            modalContent: null
        };
    }

    componentDidMount() {
        axios.get('/games/')
            .then(response => {
                this.setState({ games: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    onChange = (value, event) => {
        this.setState({
            search: value
        })
    }

    showModal = (e) => {
        this.setState({
            show: !this.state.show
        })
    }

    deleteGame = (id) => {
        this.setState({
            modalContent: <FormDelete onEnter={res => { if (res.data == '0') { this.setState({ games: this.state.games.filter(el => el._id !== id), show: false })}}}  _id={id}></FormDelete>,
            show: true
        })
    }

    newGame = () => {
        this.setState({
            modalContent: <FormNew onEnter={res => { this.props.history.push('/edit/' + res.data) }} />,
            show: true
        })
    }

    cloneGame = (id) => {
        this.setState({
            modalContent: <FormClone onEnter={res => { this.props.history.push('/edit/' + res.data) }} _id={id} />,
            show: true
        })
    }

    gameList() {
        const filteredGames = this.state.games.filter(el => el.title.indexOf(this.state.search) > -1)
        return filteredGames.map(currentgame => {
            return <Game game={currentgame} deleteGame={this.deleteGame} cloneGame={this.cloneGame} key={currentgame._id} />;
        })
    }

    render() {
        return (
            <div><Header>Index</Header>
                <Modal onClose={this.showModal} show={this.state.show}>
                    {this.state.modalContent}
                </Modal>
                <Table className="table">
                    <thead>
                        <Tr>
                            <Th>
                                <Button onClick={e => { this.newGame() }}><FontAwesomeIcon icon={faPlus} size="2x" /></Button>
                                <SearchField
                                    placeholder="Search..."
                                    onChange={this.onChange}
                                    searchText=""
                                    classNames="test-class"
                                />
                            </Th>
                            <Th>Clone</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {this.gameList()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default withRouter(GamesList);