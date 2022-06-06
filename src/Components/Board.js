
import Tile from "./Tile.js"
import './Board.css';
import React from 'react';
import { useState, useEffect, useRef } from "react";
import Rules from "../rules/Rules.js"

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const startingPos = new Map();



export const PieceType = {
    Pawn: 'Pawn',
    Rook: 'Rook',
    Horse: 'Horse',
    Bishop: 'Bishop',
    Queen: 'Queen',
    King: 'King'
};
export const Team = {
    Black: 'BLACK',
    White: 'WHITE',
    
};

const piece = {
    x: Number,
    y: Number,
    image: String,
    type: PieceType,
    team: Team
}


//list of pieces original position
const initialPieces = [];




export default function Board() {
    const [activePiece, setActivePiece] = useState(null);
    const [gridX, SetGridX] = useState(0);
    const [gridY, SetGridY] = useState(0);
    const [pieces, setPieces] = useState(initialPieces);
    const rules = new Rules();

    

    //function to pick up a piece from the board
    function grabPiece(e) {
        const element = e.target;
        if (element.classList.contains("chess-piece")) {
            
            

            SetGridX(Math.floor((e.clientX - boardRef.current.offsetLeft) / 65));
            SetGridY(Math.abs(Math.ceil(((e.clientY - boardRef.current.offsetTop) - 520) / 65)));

            const x = e.clientX - 32.5;
            const y = e.clientY - 32.5;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }

    //function to move a piece with mouse poisition
    function movePiece(e) {

        if (activePiece) {
            const minX = boardRef.current.offsetLeft - 15;
            const maxX = boardRef.current.offsetLeft + boardRef.current.clientWidth-55;
            const minY = boardRef.current.offsetTop - 10;
            const maxY = boardRef.current.offsetTop + boardRef.current.clientHeight-55;


            const x = e.clientX - 32.5;
            const y = e.clientY - 32.5;
            activePiece.style.position = "absolute";

            //if x is to left of board
            if (x < minX)
                activePiece.style.left = `${minX}px`;
            //if x is to right of board
            else if (x > maxX)
                activePiece.style.left = `${maxX}px`;
            //if x is on the board
            else
                activePiece.style.left = `${x}px`;

            //if y is above the board
            if (y < minY)
                activePiece.style.top = `${minY}px`;
            //if y is below the board
            else if (y > maxY)
                activePiece.style.top = `${maxY}px`;
            //if y is on the board
            else
                activePiece.style.top = `${y}px`;
        }
    }

    //function to drop a piece into a tile
    function dropPiece(e) {
        if (activePiece) {
            const x = Math.floor((e.clientX - boardRef.current.offsetLeft) / 65);
            const y = Math.abs(Math.ceil(((e.clientY - boardRef.current.offsetTop) - 520) / 65));

            


            //Grid Snap
            setPieces((value) => {
                const pieces = value.map((p) => {
                    if (p.x == gridX && p.y == gridY) {
                        if (rules.isMoveValid(gridX, gridY, x, y, p.type, p.team)) {
                            p.x = x;
                            p.y = y;
                        }
                        else {
                            activePiece.style.position = 'relative';
                            activePiece.style.removeProperty("top");
                            activePiece.style.removeProperty("left");
                        }
                        
                    }
                    return p;
                });
                return pieces;
            });
          
            setActivePiece(null);
        }
    }

    //reference to board
    const boardRef = useRef(null);

    //displayed board
    let board = []

    //loop through to create tiles and default pieces
    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            let image = undefined;

            pieces.forEach((p) => {
                if (p.x == i && p.y == j) {
                    image = p.image;
                }
            });

            board.push(<Tile key={i + "." + j} image={image} number={i + j} />);
        }
    }

    return <div onMouseMove={(e) => movePiece(e)} onMouseUp={(e) => dropPiece(e)} onMouseDown={(e) => grabPiece(e)} id="board" ref={boardRef} >{board}</div>
}




//white pawns
for (let i = 0; i <= 7; i++) {
    initialPieces.push({ x: i, y: 1, image: "Assets/pawn_w.png", type: PieceType.Pawn, team: Team.White });
}

//black pawns
for (let i = 0; i <= 7; i++) {
    initialPieces.push({ x: i, y: 6, image: "Assets/pawn_b.png", type: PieceType.Pawn, team: Team.Black });
}



for (let i = 0; i < 2; i++) {
    const type = (i == 0) ? "b" : "w";
    const y = (i == 0) ? 7 : 0;
    const team = (i == 0) ? Team.Black : Team.White;


    //other black & white pieces
    initialPieces.push({ x: 0, y, image: "Assets/rook_" + type + ".png", type: PieceType.Rook, team });
    initialPieces.push({ x: 1, y, image: "Assets/knight_" + type + ".png", type: PieceType.Horse, team });
    initialPieces.push({ x: 2, y, image: "Assets/bishop_" + type + ".png", type: PieceType.Bishop, team });
    initialPieces.push({ x: 3, y, image: "Assets/queen_" + type + ".png", type: PieceType.Queen, team });
    initialPieces.push({ x: 4, y, image: "Assets/king_" + type + ".png", type: PieceType.King, team });
    initialPieces.push({ x: 5, y, image: "Assets/bishop_" + type + ".png", type: PieceType.Bishop, team });
    initialPieces.push({ x: 6, y, image: "Assets/knight_" + type + ".png", type: PieceType.Horse, team });
    initialPieces.push({ x: 7, y, image: "Assets/rook_" + type + ".png", type: PieceType.Rook, team });
}