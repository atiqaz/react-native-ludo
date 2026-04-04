export const selectCurrentPositions =(state :any) =>state.game.currentPositions;
export const selectCurrentPlayerChance =(state :any) =>state.game.chancePlayer;
export const selectDiceRolled =(state :any) =>state.game.isDiceRolled;
export const selectDiceNo =(state :any) =>state.game.diceNo;


export const selectPlayer1 =(state:any)=>state.game.player1;
export const selectPlayer2 =(state:any)=>state.game.player2;
export const selectPlayer3 =(state:any)=>state.game.player3;
export const selectPlayer4 =(state:any)=>state.game.player4;


export const selectPocketPileSelection = (state:any)=>state.game.pileSelectionPlayer
export const selectCellSelection = (state:any)=>state.game.cellSelectionPlayer
export const selectDiceTouch = (state:any)=>state.game.touchDiceBlock
export const selectFireWorks = (state:any)=>state.game.fireworks
export const selectGameMode = (state:any)=>state.game.gameMode
