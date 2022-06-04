import React from 'react';
import "./game.css";
import Board from "./Components/Board.js"




class Game extends React.Component {
    render() {
        return (
            <div id = "chess">
                <Board />
            </div>
        );
    }
}

export default Game;
