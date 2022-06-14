import { PieceType, Team, piece } from "../Components/Board.js";

export default class Rules {


    //checks which team's move it is
    isTurn(team, move) {
        if (team === Team.White && move % 2 == 0) {
            return true;
        }
        else if (team === Team.Black && move % 2 == 1) {
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
        const piece = boardState.find((p) => p.x === x && p.y === y && p.team != team);


        if (piece) {
            return true;
        }
            
         return false;
    }

    //checks the en Passant rule
    isEnPassant(x, y, boardState, team) {
        const direction = (team === Team.White) ? 1 : -1;
        const piece = boardState.find(p => p.x === x && p.y === y - direction);

        if (piece) {
            console.log("Hello");
        }
    }



    isMoveValid(px, py, cx, cy, type, team, boardState) {


        //Pawn Logic
        if (type === PieceType.Pawn) {
            const startRow = (team === Team.White) ? 1 : 6;
            const direction = (team === Team.White) ? 1 : -1;

            if (py === startRow && cy - py == 2 * direction) {
                if (!this.pathBlocked(cx, cy, boardState) && !this.pathBlocked(cx, cy - direction, boardState)) {
                    return true;
                }
            }
            else if (px === cx && cy - py === direction) {
                if (!this.pathBlocked(cx, cy, boardState)) {
                    return true;
                }
            }
            else if (cx - px === -1 && cy - py == direction) {
                if (this.isEnemyTile(cx, cy, boardState, team)) {
                    return true;
                }
            }
            else if (cx - px === 1 && cy - py == direction) {
                if (this.isEnemyTile(cx, cy, boardState, team)) {
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
                return true;
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

                
            }
        }


        //Bishop Logic
        else if (type === PieceType.Bishop) {
            if (Math.abs(cx - px) === Math.abs(cy - py)) {
                console.log(px, py, cx, cy);
                if (cx > px && cy > py) { //up right
                    for (let i = 1; i < Math.abs(cx - px); i++) {
                        if (this.pathBlocked(px + i, py + i, boardState)) {
                            console.log("Blocked UR");
                            return false;
                        }
                    }
                    console.log("UR");
                }
                else if (cx > px && cy < py) { //down right
                    for (let i = 1; i < Math.abs(cx - px); i++) {
                        if (this.pathBlocked(px + i, py - i, boardState)) {
                            console.log("Blocked DR");
                            return false;
                        }
                    }
                    console.log("DR");
                }
                else if (cx < px && cy > py) { //up left
                    for (let i = 1; i < Math.abs(cx - px); i++) {
                        if (this.pathBlocked(px - i, py + i, boardState)) {
                            console.log("Blocked UL");
                            return false;
                        }
                    }
                    console.log("UL");
                }
                else if (cx < px && cy < py) { //down left
                    for (let i = 1; i < Math.abs(cx - px); i++) {
                        if (this.pathBlocked(px - i, py - i, boardState)) {
                            console.log("Blocked DL");
                            return false;
                        }
                    }
                    console.log("DL");
                }

                if (this.isEnemyTile(cx, cy, boardState, team) || !this.pathBlocked(cx, cy, boardState)) {
                    return true;
                }
            } 
        }


        return false;
    }
}