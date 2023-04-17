import React from "react";
import "../style/futbol.css"
import axios from "axios";
import TeamsData from '../resources/Teams.js'
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function Futbol() {

    const { width, height } = useWindowSize();
    const teamsArray = TeamsData.map(team => {
        const { shortName, crest, website } = team;
        return { shortName, crest, website };
    });

    function getInitialPlayerState() {
        return {
            "00": false,
            "01": false,
            "02": false,
            "10": false,
            "11": false,
            "12": false,
            "20": false,
            "21": false,
            "22": false
        };
    }

    function checkWinningCondition(board) {
        for (let i = 0; i < 3; i++) {
            if (board[`${i}0`] && board[`${i}1`] && board[`${i}2`]) {
                return true;
            }
        }

        for (let i = 0; i < 3; i++) {
            if (board[`0${i}`] && board[`1${i}`] && board[`2${i}`]) {
                return true;
            }
        }

        if (board['00'] && board['11'] && board['22']) {
            return true;
        }
        if (board['02'] && board['11'] && board['20']) {
            return true;
        }
        return false;
    }


    const [playersState, setPlayersState] = React.useState({
        "player1": getInitialPlayerState(),
        "player2": getInitialPlayerState()
    });

    const [completed, setCompleted] = React.useState(false);

    const [playerSelected, setPlayerSelected] = React.useState("player1");

    function getRandomTeams() {
        let shuffledTeams = teamsArray.sort(() => 0.5 - Math.random());
        return shuffledTeams.slice(0, 6);
    }

    const [shuffled, setShuffled] = React.useState(() => getRandomTeams());

    function getTeamsData() {
        var myHeaders = new Headers();
        myHeaders.append("X-Auth-Token", "eb73dc20c241490ebc767d18b6cdaa90");
        myHeaders.append('X-Requested-With', 'XMLHttpRequest');

        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = 'https://api.football-data.org/v2/competitions/PL/teams';

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(proxyUrl + apiUrl, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const selectedPlayerButton = {
        "backgroundColor": "green"
    }

    const nonSelectedPlayerButton = {
        "backgroundColor": "green"
    }

    function toggleCurrentPlayer(event) {
        setPlayerSelected(event.target.id)
    }

    function updatePlayerStreak(event) {
        console.log("enetered setplayersstate")
        event.target.value && setPlayersState((prev) => {
            return {
                ...prev,
                [playerSelected]: {
                    ...prev[playerSelected],
                    [event.target.id]: true
                }
            }
        })
        console.log(JSON.stringify(playersState));
    }

    React.useEffect(() => {
        checkWinningCondition(playersState[playerSelected]) && setCompleted(true)
    }, [playersState])

    // getTeamsData();

    return (
        <div className="main">
            {completed && <Confetti display="none" width={width} height={height} />}
            <div className="container">
                <h1 className="title">Futbol OX Juego</h1>
                {shuffled.length &&
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th><img src={shuffled[0].crest} alt="Logo" /></th>
                                <th><img src={shuffled[1].crest} alt="Logo" /></th>
                                <th><img src={shuffled[2].crest} alt="Logo" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th><img src={shuffled[3].crest} alt="Logo" /></th>
                                <td><input type="text" id="00" className="input-field" style={playersState[playerSelected]["00"] ? selectedPlayerButton : {}} onBlur={updatePlayerStreak} /></td>
                                <td><input type="text" id="01" className="input-field" style={playersState[playerSelected]["01"] ? selectedPlayerButton : {}} onBlur={updatePlayerStreak} /></td>
                                <td><input type="text" id="02" className="input-field" style={playersState[playerSelected]["02"] ? selectedPlayerButton : {}} onBlur={updatePlayerStreak} /></td>
                            </tr>
                            <tr>
                                <th><img src={shuffled[4].crest} alt="Logo" /></th>
                                <td><input type="text" id="10" className="input-field" style={playersState[playerSelected]["10"] ? selectedPlayerButton : {}} onBlur={updatePlayerStreak} /></td>
                                <td><input type="text" id="11" className="input-field" style={playersState[playerSelected]["11"] ? selectedPlayerButton : {}} onBlur={updatePlayerStreak} /></td>
                                <td><input type="text" id="12" className="input-field" style={playersState[playerSelected]["12"] ? selectedPlayerButton : {}} onBlur={updatePlayerStreak} /></td>
                            </tr>
                            <tr>
                                <th><img src={shuffled[5].crest} alt="Logo" /></th>
                                <td><input type="text" id="20" className="input-field" style={playersState[playerSelected]["20"] ? selectedPlayerButton : {}} onBlur={updatePlayerStreak} /></td>
                                <td><input type="text" id="21" className="input-field" style={playersState[playerSelected]["21"] ? selectedPlayerButton : {}} onBlur={updatePlayerStreak} /></td>
                                <td><input type="text" id="22" className="input-field" style={playersState[playerSelected]["22"] ? selectedPlayerButton : {}} onBlur={updatePlayerStreak} /></td>
                            </tr>
                        </tbody>
                    </table>
                }


                {completed ? <div><h2>{playerSelected == "player1" ? "Player 1" : "Player 2"} has won</h2><h3>Please refresh the page</h3></div> :
                    <div className="buttons">
                        <button className="player-1-button" id="player1" style={playerSelected === "player1" ? selectedPlayerButton : {}} onClick={toggleCurrentPlayer}>Player 1</button>
                        <button className="player-2-button" id="player2" style={playerSelected === "player2" ? selectedPlayerButton : {}} onClick={toggleCurrentPlayer}>Player 2</button>
                    </div>
                }

            </div>
        </div>
    )
}