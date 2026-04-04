const player1initalState = [
    { id: "A1", pos: 0, travelCount: 0 },
    { id: "A2", pos: 0, travelCount: 0 },
    { id: "A3", pos: 0, travelCount: 0 },
    { id: "A4", pos: 0, travelCount: 0 },
]
const player2initalState = [
    { id: "B1", pos: 0, travelCount: 0 },
    { id: "B2", pos: 0, travelCount: 0 },
    { id: "B3", pos: 0, travelCount: 0 },
    { id: "B4", pos: 0, travelCount: 0 },
]
const player3initalState = [
    { id: "C1", pos: 0, travelCount: 0 },
    { id: "C2", pos: 0, travelCount: 0 },
    { id: "C3", pos: 0, travelCount: 0 },
    { id: "C4", pos: 0, travelCount: 0 },
]
const player4initalState = [
    { id: "D1", pos: 0, travelCount: 0 },
    { id: "D2", pos: 0, travelCount: 0 },
    { id: "D3", pos: 0, travelCount: 0 },
    { id: "D4", pos: 0, travelCount: 0 },
]

export const initialState ={
    player1:player1initalState,
    player2:player2initalState,
    player3:player3initalState,
    player4:player4initalState,

    chancePlayer:1,
    diceNo:1,
    isDiceRolled:false,
    pileSelectionPlayer:-1,
    cellSelectionPlayer:-1,
    touchDiceBlock:false,
    currentPositions:[],
    fireworks:false,
    winner:null,
    gameMode: 'pvp4'

}