import { PieceType, Team, piece } from "../Components/Board.js";

export default class Rules {

    pathBlocked(x, y, boardState){
        const piece = boardState.find(p => p.x === x && p.y === y);

        if (piece)
            return true;
        return false;
    }


    isEnemyTile(x, y, boardState, team) {
        const piece = boardState.find((p) => p.x === x && p.y === y && p.team != team);


        if (piece) {
            return true;
        }
            
         return false;
    }

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

        
        
        return false;
    }
}