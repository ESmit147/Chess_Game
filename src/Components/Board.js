
import Tile from "./Tile.js"
import './Board.css';
import React from 'react';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const startingPos = new Map();

const piece = {
    x: Number,
    y : Number,
    image : String
}

//list of pieces original position
const pieces = [];

//tracker for moving pieces
let activePiece = null;

//function to pick up a piece from the board
function grabPiece(e) {
    const element = e.target;
    if (element.classList.contains("chess-piece")) {
       
        const x = e.clientX - 32.5;
        const y = e.clientY-32.5;
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        activePiece = element;
    }
}

//function to move a piece with mouse poisition
function movePiece(e) {
    const element = e.target;

    if (activePiece) {
        const x = e.clientX - 32.5;
        const y = e.clientY - 32.5;
        activePiece.style.position = "absolute";
        activePiece.style.left = `${x}px`;
        activePiece.style.top = `${y}px`;
    }
}


function dropPiece(e) {
    if (activePiece)
        activePiece = null; 
}


export default function Board() {
    let board = []

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            let image = undefined;

            pieces.forEach((p) => {
                if (p.x == i && p.y == j) {
                    image = p.image;
                }
            });

            board.push(<Tile key={ i + "." + j} image={image} number = {i + j} />);

        }
    }
    return <div onMouseMove={(e) => movePiece(e)} onMouseUp={(e) => dropPiece(e)} onMouseDown={(e) => grabPiece(e)} id="board" >{board}</div>
}




//white pawns
for (let i = 0; i <= 7; i++) {
    pieces.push({ x: i, y: 1, image: "Assets/pawn_w.png" });
}

//black pawns
for (let i = 0; i <= 7; i++) {
    pieces.push({ x: i, y: 6, image: "Assets/pawn_b.png" });
}



for (let i = 0; i < 2; i++) {
    const type = (i == 0) ? "b" : "w";
    const y = (i == 0) ? 7 : 0;

    //other black & white pieces
    pieces.push({ x: 0, y, image: "Assets/rook_" + type + ".png" });
    pieces.push({ x: 1, y, image: "Assets/knight_" + type + ".png" });
    pieces.push({ x: 2, y, image: "Assets/bishop_" + type + ".png" });
    pieces.push({ x: 3, y, image: "Assets/queen_" + type + ".png" });
    pieces.push({ x: 4, y, image: "Assets/king_" + type + ".png" });
    pieces.push({ x: 5, y, image: "Assets/bishop_" + type + ".png" });
    pieces.push({ x: 6, y, image: "Assets/knight_" + type + ".png" });
    pieces.push({ x: 7, y, image: "Assets/rook_" + type + ".png" });
}