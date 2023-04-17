import React from "react";
import "../style/futbol.css"
import axios from "axios";

export default function Futbol() {

    function getTeamsData() {
        var myHeaders = new Headers();
        myHeaders.append("X-Auth-Token", "eb73dc20c241490ebc767d18b6cdaa90");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://api.football-data.org//v4/competitions/PL/teams", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    getTeamsData();

    return (
        <div className="main">
            <div className="container">
                <h1 className="title">Futbol OX Juego</h1>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th><img src="https://via.placeholder.com/30" alt="Logo" /></th>
                            <th><img src="https://via.placeholder.com/30" alt="Logo" /></th>
                            <th><img src="https://via.placeholder.com/30" alt="Logo" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th><img src="https://via.placeholder.com/30" alt="Logo" /></th>
                            <td><input type="text" className="input-field" /></td>
                            <td><input type="text" className="input-field" /></td>
                            <td><input type="text" className="input-field" /></td>
                        </tr>
                        <tr>
                            <th><img src="https://via.placeholder.com/30" alt="Logo" /></th>
                            <td><input type="text" className="input-field" /></td>
                            <td><input type="text" className="input-field" /></td>
                            <td><input type="text" className="input-field" /></td>
                        </tr>
                        <tr>
                            <th><img src="https://via.placeholder.com/30" alt="Logo" /></th>
                            <td><input type="text" className="input-field" /></td>
                            <td><input type="text" className="input-field" /></td>
                            <td><input type="text" className="input-field" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="buttons">
                    <button className="player-1-button">Player 1</button>
                    <button className="player-2-button ">Player 2</button>
                </div>
            </div>
        </div>
    )
}