import { StyleSheet, View } from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Colors } from '../constants/Colors'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import { useDispatch, useSelector } from 'react-redux'
import { selectFireWorks } from '../redux/reducers/gameSelectors'
import { updateFireWorks } from '../redux/reducers/gameSlice'
import Pile from './Pile'
import FireWorks from '../assets/animation/firework.json'
import LottieView from 'lottie-react-native'
import Svg, { Polygon } from 'react-native-svg'

function FourTriangles(props: any) {
    const { player1, player2, player3, player4 } = props
    const size = 300;
    const half = size / 2;
    const isFrameWork = useSelector(selectFireWorks);
    const [blast, setBlast] = useState(false);
    const distpatch = useDispatch()

    useEffect(() => {
        if (isFrameWork) {
            setBlast(true)
            const timer = setTimeout(() => {
                setBlast(false)
                distpatch(updateFireWorks(false))
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [isFrameWork, distpatch])

    const playerData = useMemo(() => {
        return [
            { color: Colors.red, player: player1, playerNo: 1, position: { left: 15, top: 55 }, transalete: "translateX" },
            { color: Colors.green, player: player2, playerNo: 2, position: { left: -2, top: 20 }, transalete: "translateY" },
            { color: Colors.yellow, player: player3, playerNo: 3, position: { left: 15, bottom: 52 }, transalete: "translateX" },
            { color: Colors.blue, player: player4, playerNo: 4, position: { right: -2, top: 20 }, transalete: "translateY" },
        ]
    }, [player1, player2, player3, player4])

    const renderPlayerPieces = useCallback((data: any, index: number) => {
        return (
            <PlayerPieces
                key={index}
                player={data.player.filter((item: any) => item.travelCount == 57)}
                playerNo={data.playerNo}
                style={data.position}
                pieceColor={data.color}
                transalate={data.transalete}
            />
        )
    }, [])

    return (
        <View style={styles.mainConatiner}>
            {blast && <LottieView
                source={FireWorks}
                autoPlay loop
                style={styles.LottieView}
                speed={1}
                hardwareAccelerationAndroid
            />}

            <Svg height={size} width={size - 1}>
                {/* top triangle - yellow */}
                <Polygon
                    points={`0,0 ${half},${half} ${size},0`}
                    fill={Colors.yellow}
                />
                {/* left triangle - green */}
                <Polygon
                    points={`0,0 ${half},${half} 0,${size}`}
                    fill={Colors.green}
                />
                {/* bottom triangle - red */}
                <Polygon
                    points={`0,${size} ${half},${half} ${size},${size}`}
                    fill={Colors.red}
                />
                {/* right triangle - blue */}
                <Polygon
                    points={`${size},0 ${half},${half} ${size},${size}`}
                    fill={Colors.blue}
                />
            </Svg>

            {playerData.map(renderPlayerPieces)}
        </View>
    )
}

const PlayerPieces = (props: any) => {
    const { player, playerNo, style, pieceColor, transalate } = props
    return (
        <View style={[styles.container, style]}>
            {player.map((piece: any, index: number) => (
                <View
                    key={index}
                    style={{
                        top: 0,
                        zIndex: 99,
                        position: "absolute",
                        bottom: 0,
                        transform: [
                            { scale: 0.5 },
                            { [transalate]: 14 * index }
                        ]
                    }}
                >
                    <Pile
                        cell={true}
                        player={playerNo}
                        onPress={() => { }}
                        pieceId={piece.id}
                        color={pieceColor}
                    />
                </View>
            ))}
        </View>
    )
}

export default memo(FourTriangles)

const styles = StyleSheet.create({
    mainConatiner: {
        // position:"relative",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.8,

        width: '20%',
        height: '100%',
        overflow: "hidden",
        backgroundColor: "white",
        borderColor: Colors.borderColor
    },
    LottieView: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1
    },
    container: {
        width: deviceWidth * 0.063,
        height: deviceHeight * 0.032,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute"
    }
})
