import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { Colors } from '../constants/Colors'
import Pile from './Pile'

function Pocket(props: any) {
    const { color, player, data } = props

    const disptach = useDispatch()

    const handlePress = async (value: any) => {

    }

    return (
        <View style={[styles.Container, { backgroundColor: color }]}>
            <View style={styles.childFrame}>
                <View style={styles.flexRow}>
                    <Plot
                        pieceNo={0}
                        color={color}
                        player={player}
                        data={data}
                        handlePress={handlePress}
                    /> <Plot
                        pieceNo={1}
                        color={color}
                        player={player}
                        data={data}
                        handlePress={handlePress}
                    />
                </View>
                <View style={[styles.flexRow ,{
                    marginTop:20
                }]}>
                    <Plot
                        pieceNo={2}
                        color={color}
                        player={player}
                        data={data}
                        handlePress={handlePress}
                    /> <Plot
                        pieceNo={3}
                        color={color}
                        player={player}
                        data={data}
                        handlePress={handlePress}
                    />
                </View>
            </View>
        </View>
    )
}

export const Plot = (props: any) => {
    const { pieceNo, player, color, data, handlePress } = props
    return (
        <View style={[styles.plot, { backgroundColor: color }]}>
            {data && data[pieceNo]?.pos===0  && (
                <Pile
                player={player}
                color={color}
                handlePress={()=>{
                    handlePress(data[pieceNo]);
                }}
                />
            )}


        </View>
    )
}
export default memo(Pocket)

const styles = StyleSheet.create({
    Container: {
        borderWidth: 0.4,
        justifyContent: "center",
        alignItems: "center",
        flex: 6,
        borderColor: Colors.borderColor
    },
    childFrame: {
        backgroundColor: 'white',
        borderWidth: 0.4,
        padding: 15,
        width: "70%",
        height: "70%",
        // borderRadius:50,
        borderColor: Colors.borderColor
    },
    flexRow: {
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "40%",
        flexDirection: "row"

    },
    plot: {
        backgroundColor: Colors.green,
        height: "80%",
        width: "32%",
        borderRadius: 50,
        //  borderColor:Colors.borderColor,
        //  borderWidth:0.4
    }
})