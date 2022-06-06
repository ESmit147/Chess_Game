import { PieceType, Team } from "../Components/Board.js";

export default class Rules {
    isMoveValid(px, py, cx, cy, type, team) {

        
        if (type === PieceType.Pawn) {
            if (team === Team.White) {
                if (py === 1) {
                    if (px === cx && (cy - py === 1 || cy - py === 2)) {
                        return true;
                    }
                }
                else if (px === cx && cy - py === 1) {
                    return true;
                }
            }
        }
        return false;
    }
}