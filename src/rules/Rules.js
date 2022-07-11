import { PieceType, Team, record, horizontalAxis, verticalAxis } from "../Components/Board.js";

export default class Rules {

   
    

    //checks which team's move it is
    isTurn(team, move) {
        if (team === Team.White && move % 2 === 0) {
            return true;
        }
        else if (team === Team.Black && move % 2 === 1) {
            return true;
        }

        return false;
    }


    //if there is a piece in the way of movement
    pathBlocked(x, y, boardState){
        const piece = boardState.find(p => p.x === x && p.y === y);

        if (piece)
            return true;
        return false;
    }

    //checks if tile has an opponent's piece
    isEnemyTile(x, y, boardState, team) {
        const piece = boardState.find((p) => p.x === x && p.y === y && p.team !== team);


        if (piece) {
            return true;
        }
            
         return false;
    }

    //checks the en Passant rule
    isEnPassant(x, y, boardState, team) {
        const direction = (team === Team.White) ? 1 : -1;
        const piece = boardState.find(p => p.x === x && p.y === y - direction);

        if (record[record.length - 1] === ("" + piece.team + "Pawn" + horizontalAxis[x] + "" + verticalAxis[y - direction] + "<-" + horizontalAxis[x] + "" + verticalAxis[y + direction])) {
            piece.x = null;
            piece.y = null;
            return true;
        }
    }

    //provides promotion
    isPromotion(x, y, boardState) {
        const piece = boardState.find(p => p.x === x && p.y === y);
        

        if (piece.type === "Pawn") {
            if (piece.team === "BLACK") {
                if (piece.y === 0) {
                    piece.type = PieceType.Queen;
                    piece.image = "Assets/queen_b.png";
                }
            }
            else if (piece.team === "WHITE") {
                if (piece.y === 7) {
                    piece.type = PieceType.Queen;
                    piece.image = "Assets/queen_w.png";
                }
            }
        }
    }



    isMoveValid(px, py, cx, cy, type, team, boardState) {


        //Pawn Logic
        if (type === PieceType.Pawn) {
            const startRow = (team === Team.White) ? 1 : 6;
            const direction = (team === Team.White) ? 1 : -1;

            if (py === startRow && cy - py === 2 * direction) {
                if (!this.pathBlocked(cx, cy, boardState) && !this.pathBlocked(cx, cy - direction, boardState)) {
                    return true;
                }
            }
            else if (px === cx && cy - py === direction) {
                if (!this.pathBlocked(cx, cy, boardState)) {
                    return true;
                }
            }
            else if ((cx - px === -1 || cx - px === 1) && cy - py === direction) {
                if (this.isEnemyTile(cx, cy, boardState, team)) {
                    return true;
                }
                else if (this.isEnPassant(cx, cy, boardState, team)) {
                    return true;
                }
                
            }
        }

        //Rook Logic
        else if (type === PieceType.Rook) {
            if (py === cy) {
                if (cx > px) {
                    for (let i = px + 1; i < cx; i++) {
                        if (this.pathBlocked(i, cy, boardState)) {
                            return false;
                        }
                    }
                }
                else if (cx < px) {
                    for (let i = px - 1; i > cx; i--) {
                        if (this.pathBlocked(i, cy, boardState)) {
                            return false;
                        }
                    }
                }
                if (this.isEnemyTile(cx, cy, boardState, team) || !this.pathBlocked(cx, cy, boardState)) {
                    return true;
                }
            }
            else if (px === cx) {
                if (cy > py) {
                    for (let i = py + 1; i < cy; i++) {
                        if (this.pathBlocked(cx, i, boardState)) {
                            return false;
                        }
                    }
                }
                else if (cy < py) {
                    for (let i = py - 1; i > cy; i--) {
                        if (this.isEnemyTile(cx, i, boardState)) {
                            return false;
                        }
                    }
                }
                if (this.isEnemyTile(cx, cy, boardState, team) || !this.pathBlocked(cx, cy, boardState)) {
                    return true;
                }
                
            }
        }


        //Bishop Logic
        else if (type === PieceType.Bishop) {
            if (Math.abs(cx - px) === Math.abs(cy - py)) {
                let ycheck = (cy > py) ? 1 : -1;
                let xcheck = (cx > px) ? 1 : -1;

                for (let i = 1; i < Math.abs(cx - px); i++) {
                    if (this.pathBlocked(px + (i * xcheck), py + (i * ycheck), boardState)) {
                        return false;
                    }
                }

                if (this.isEnemyTile(cx, cy, boardState, team) || !this.pathBlocked(cx, cy, boardState)) {
                    return true;
                }
            } 
        }

        //Horse Logic 
        if (type === PieceType.Horse) {
            if ((Math.abs(cx - px) === 1 && Math.abs(cy - py) === 2) || (Math.abs(cx - px) === 2 && Math.abs(cy - py) === 1)) {
                if (this.isEnemyTile(cx, cy, boardState, team) || !this.pathBlocked(cx, cy, boardState)) {
                    return true;
                }
            }
        }

        //King Logic
        if (type === PieceType.King) {
            if (Math.abs(cx - px) <= 1 && Math.abs(cy - py) <= 1) {
                if (this.isEnemyTile(cx, cy, boardState, team) || !this.pathBlocked(cx, cy, boardState)) {
                    return true;
                }
            }
        }

        //Queen Logic
        if (type === PieceType.Queen) {
            if (Math.abs(cx - px) === Math.abs(cy - py)) { //if move like bishop
                let ycheck = (cy > py) ? 1 : -1;
                let xcheck = (cx > px) ? 1 : -1;

                for (let i = 1; i < Math.abs(cx - px); i++) {
                    if (this.pathBlocked(px + (i * xcheck), py + (i * ycheck), boardState)) {
                        return false;
                    }
                }

                if (this.isEnemyTile(cx, cy, boardState, team) || !this.pathBlocked(cx, cy, boardState)) {
                    return true;
                }
            }

            else if (py === cy) { //if move like rook right/left
                if (cx > px) {
                    for (let i = px + 1; i < cx; i++) {
                        if (this.pathBlocked(i, cy, boardState)) {
                            return false;
                        }
                    }
                }
                else if (cx < px) {
                    for (let i = px - 1; i > cx; i--) {
                        if (this.pathBlocked(i, cy, boardState)) {
                            return false;
                        }
                    }
                }
                if (this.isEnemyTile(cx, cy, boardState, team) || !this.pathBlocked(cx, cy, boardState)) {
                    return true;
                }
            }

            else if (px === cx) { //if move like rook up/down
                if (cy > py) {
                    for (let i = py + 1; i < cy; i++) {
                        if (this.pathBlocked(cx, i, boardState)) {
                            return false;
                        }
                    }
                }
                else if (cy < py) {
                    for (let i = py - 1; i > cy; i--) {
                        if (this.isEnemyTile(cx, i, boardState)) {
                            return false;
                        }
                    }
                }
                if (this.isEnemyTile(cx, cy, boardState, team) || !this.pathBlocked(cx, cy, boardState)) {
                    return true;
                }

            }
        }


        return false;
    }
}