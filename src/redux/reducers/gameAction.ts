import { SafeSpots, StarSpots, startingPoints, turningPoints, victoryStart } from "../../helpers/PlotData"
import { playSound } from "../../helpers/SoundUtility"
import { selectCurrentPositions, selectDiceNo } from "./gameSelectors"
import { announceWinner, disableTouch, unfreezeDice, updateFireWorks, updatePlayerChance, updatePlayerPieceValue } from "./gameSlice"

const delay = (ms) => new Promise(resolve => setTimeout(() => {
    resolve(null)
}, ms))

const checkWinningCriteria = (pieces) => {
    for (let piece of pieces) {
        if (piece.travelCount < 57) {
            return false
        }
    }
    return true
}

export const hanleForwardThunk = (playerNo, id, pos) => async (dispatch, getState) => {
    const state = getState()
    const plottedPieces = selectCurrentPositions(state)
    const diceNo = selectDiceNo(state)

    let alpha = playerNo == 1 ? "A" : playerNo == 2 ? "B" : playerNo == 3 ? "C" : "D";

    dispatch(disableTouch())

    let finalPath = pos;

    const beforePlayerPiece = state.game[`player${playerNo}`].find(item => item.id === id);
    let travelCount = beforePlayerPiece.travelCount;
    for (let i = 0; i < diceNo; i++) {
        const updatedPosition = getState();
        const playerPiece = updatedPosition.game[`player${playerNo}`].find((item: any) => item.id == id);
        let path = playerPiece.pos + 1;
        if (turningPoints.includes(path) && turningPoints[playerNo - 1] == path) {
            path = victoryStart[playerNo - 1]
        }
        if (path == 53) {
            path = 1;
        }
        finalPath = path;
        travelCount += 1;

        dispatch(updatePlayerPieceValue({
            playerNo: `player${playerNo}`,
            pieceId: playerPiece.id,
            pos: path,
            travelCount
        }));
        playSound('pile_move');
        await delay(300)


    }

    const updatedState = getState();
    const updatedPlottedPieces = selectCurrentPositions(updatedState);

    // check colliding
    const finalPlot = updatedPlottedPieces.filter(item => item.pos === finalPath);
    const ids = finalPlot.map(item => item.id[0]);
    const uniqueIds = new Set(ids)
    const areDifferentIds = uniqueIds.size > 1;

    if (SafeSpots.includes(finalPath) || StarSpots.includes(finalPath)) {
        playSound('safe_sound');
    }


    if (areDifferentIds &&
        !SafeSpots.includes(finalPath)
        && !StarSpots.includes(finalPath)) {
        const enemyPiece = finalPlot.find(p => p.id[0] !== id[0]);
        const enemyId = enemyPiece.id[0];

        let no = enemyId == "A" ? 1 : enemyId == "B" ? 2 : enemyId == "C" ? 3 : 4;
        let backWardPath = startingPoints[no - 1];
        let i = enemyPiece.pos;
        playSound('collide');
        while (i !== backWardPath) {
            dispatch(updatePlayerPieceValue({
                playerNo: `player${no}`,
                pieceId: enemyPiece.id,
                pos: i,
                travelCount: 0
            }))
            await delay(0.4);
            i--;

            if (i == 0) {
                i = 52
            }
        }

        dispatch(updatePlayerPieceValue({
            playerNo: `player${no}`,
            pieceId: enemyPiece.id,
            pos: 0,
            travelCount: 0
        }))
        dispatch(unfreezeDice());
        return

    }

    //check six dice

    if (diceNo == 6 || travelCount == 57) {
        dispatch(updatePlayerChance({chancePlayer: playerNo}));
        if (travelCount == 57) {
            playSound('home_win')
            const finalPlayerState = getState();
            const allPlayerPieces = finalPlayerState.game[`player${playerNo}`];


            if (checkWinningCriteria(allPlayerPieces)) {
                dispatch(announceWinner(playerNo))
                playSound('cheer', true)
                return
            }
            dispatch(unfreezeDice())
            dispatch(updateFireWorks(true))
            return
        }


    }else{
        let chancePlayer=playerNo+1;
        if(chancePlayer>4){
            chancePlayer=1
        }
        dispatch(updatePlayerChance({chancePlayer}))

    }

  
}