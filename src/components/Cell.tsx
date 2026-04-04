import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { Colors } from '../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentPositions } from '../redux/reducers/gameSelectors'
import { ArrowSpot, SafeSpots, StarSpots } from '../helpers/PlotData'
import { RFValue } from 'react-native-responsive-fontsize'
import { Star } from 'lucide-react-native'
import Pile from './Pile'
import { hanleForwardThunk } from '../redux/reducers/gameAction'

export default function Cell(props: any) {
    const { key, id, cell, color } = props

    const dispatch = useDispatch();
    const plottedPieces = useSelector(selectCurrentPositions);

    const isSafeSpot = useMemo(() => SafeSpots.includes(id), [id]);
    const isStarSpots = useMemo(() => StarSpots.includes(id), [id]);
    const isArrowSpot = useMemo(() => ArrowSpot.includes(id), [id]);
    console.log(isArrowSpot)


    const piecesAtPosition = useMemo(
        () => plottedPieces.filter((item) => item.pos == id)

        , [plottedPieces, id])

    const handlePress = useCallback((playerNo, pieceId)=>{
        dispatch(hanleForwardThunk(playerNo,pieceId,id))
    },[dispatch ,id])

    return (
        <View style={[
            styles.conatiner,
        {
            backgroundColor:isSafeSpot?color:"white"
        }
        ]}>
           
           {isStarSpots&&<Star color={'grey'} size={RFValue(13)} style={{zIndex:0}} />}
           {isArrowSpot && (
            <Text style={{
                fontSize: RFValue(10),
                transform: [
                  { rotate: id == 38 ? "180deg"
                    : id == 25 ? "90deg"
                    : id == 51 ? "-90deg" : "0deg" }
                ]
            }}>➡️</Text>
           )}
           {
            piecesAtPosition.map((piece,index)=>{
                const playerNo =
                piece.id.slice(0,1)=== "A"
                ?1
                :piece.id.slice(0, 1) === "B"
                ? 2
                : piece.id.slice(0, 1) === "C"
                ? 3
                : 4;

                const pieceColor =
                piece.id.slice(0, 1) === "A"
                ? Colors.red
                : piece.id.slice(0, 1) === "B"
                ? Colors.green
                : piece.id.slice(0, 1) === "C"
                ? Colors.yellow
                : Colors.blue;
                return <View 
               key={piece.id} 
                style={[styles.pieceContainer,{
                    transform: [
                        {scale:piecesAtPosition?.length==1 ? 1:0.7},
                        {translateX:piecesAtPosition.length==1? 0:index%2==0 ?-6:6 },
                        {translateY: piecesAtPosition.length==1? 0: index < 2 ?-6:6}
                    ]
                }]}>
                    <Pile
                    cell={true}
                    player={playerNo}
                    onPress={()=>handlePress(playerNo, piece.id)}
                    pieceId={piece.id}
                    color={pieceColor}
                    
                    ></Pile>
                </View>
            })
           }
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        borderWidth: 0.4,
        borderColor: Colors.borderColor,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    pieceContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99
    }
})