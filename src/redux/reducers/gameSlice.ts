import {createSlice} from '@reduxjs/toolkit'
import { initialState } from './initialState';

export const gameSlice =createSlice({
    name:"game",
    initialState:initialState,
    reducers:{
        resetGame:()=>initialState,
        announceWinner:(state:any, action:any)=>{
            state.winner=action.payload;

        },
        updateFireWorks:(state,action)=>{
            state.fireworks=action.payload

        },
        updateDiceNo:(state,action)=>{
            state.diceNo=action.payload.diceNo;
            state.isDiceRolled=true;
        }, 
        
        enablePileSelection:(state,action)=>{
           state.touchDiceBlock=true;
           state.pileSelectionPlayer=action.payload.playerNo;
        },

          updatePlayerChance:(state,action)=>{
           state.chancePlayer=action.payload.chancePlayer;
           state.touchDiceBlock=false;
           state.isDiceRolled=false
        },
        enableCellSelection:(state, action)=>{
            state.touchDiceBlock=true;
            state.cellSelectionPlayer=action.payload.playerNo;
        }
    }
})

export const {resetGame, announceWinner,updateDiceNo,enablePileSelection, enableCellSelection,updateFireWorks}=gameSlice.actions
export default gameSlice.reducer;