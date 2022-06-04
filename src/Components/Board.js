
import Tile from "./Tile.js"
import './Board.css';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const startingPos = new Map();
    
startingPos.set([1, "a"], "Assets/rook_w.png");


export default function Board() {
    setStartPos();
    let board = []

    
    console.log(startingPos.get("1 + a"))

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {

            if (startingPos.has(verticalAxis[j] + " + " + horizontalAxis[i]))
                board.push(<Tile number={i + j} image={startingPos.get(verticalAxis[j] + " + " + horizontalAxis[i])} />)
            else
                board.push(<Tile number={i + j}/>)
        }
    }
    return <div id="board" >{board}</div>
}



function setStartPos() {
    startingPos.set("1 + a", "Assets/rook_w.png"); //rook w
    startingPos.set("1 + b", "Assets/knight_w.png"); //knight w
    startingPos.set("1 + c", "Assets/bishop_w.png"); //bishop w
    startingPos.set("1 + d", "Assets/king_w.png"); //king w
    startingPos.set("1 + e", "Assets/queen_w.png"); //queen w
    startingPos.set("1 + f", "Assets/bishop_w.png"); //bishop w
    startingPos.set("1 + g", "Assets/knight_w.png"); //knight w
    startingPos.set("1 + h", "Assets/rook_w.png"); //rook w

    startingPos.set("2 + a", "Assets/pawn_w.png"); //pawn w
    startingPos.set("2 + b", "Assets/pawn_w.png"); //pawn w
    startingPos.set("2 + c", "Assets/pawn_w.png"); //pawn w
    startingPos.set("2 + d", "Assets/pawn_w.png"); //pawn w
    startingPos.set("2 + e", "Assets/pawn_w.png"); //pawn w
    startingPos.set("2 + f", "Assets/pawn_w.png"); //pawn w
    startingPos.set("2 + g", "Assets/pawn_w.png"); //pawn w
    startingPos.set("2 + h", "Assets/pawn_w.png"); //pawn w


    startingPos.set("8 + a", "Assets/rook_b.png"); //rook b
    startingPos.set("8 + b", "Assets/knight_b.png"); //knight b
    startingPos.set("8 + c", "Assets/bishop_b.png"); //bishop b
    startingPos.set("8 + d", "Assets/king_b.png"); //king b
    startingPos.set("8 + e", "Assets/queen_b.png"); //queen b
    startingPos.set("8 + f", "Assets/bishop_b.png"); //bishop b
    startingPos.set("8 + g", "Assets/knight_b.png"); //knight b
    startingPos.set("8 + h", "Assets/rook_b.png"); //rook b

    startingPos.set("7 + a", "Assets/pawn_b.png"); //pawn b
    startingPos.set("7 + b", "Assets/pawn_b.png"); //pawn b
    startingPos.set("7 + c", "Assets/pawn_b.png"); //pawn b
    startingPos.set("7 + d", "Assets/pawn_b.png"); //pawn b
    startingPos.set("7 + e", "Assets/pawn_b.png"); //pawn b
    startingPos.set("7 + f", "Assets/pawn_b.png"); //pawn b
    startingPos.set("7 + g", "Assets/pawn_b.png"); //pawn b
    startingPos.set("7 + h", "Assets/pawn_b.png"); //pawn b







}