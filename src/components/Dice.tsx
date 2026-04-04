import { Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentPlayerChance, selectDiceNo, selectDiceRolled } from '../redux/reducers/gameSelectors'
import { BackgroundImage } from '../helpers/GetIcons'
import LinearGradient from 'react-native-linear-gradient'
import LottieView from 'lottie-react-native'
import Arrow from "../assets/images/arrow.png"
import DiceRoll from "../assets/animation/diceroll.json"
import { playSound } from '../helpers/SoundUtility'
import { enableCellSelection, enablePileSelection, updateDiceNo, updatePlayerChance } from '../redux/reducers/gameSlice'




function Dice(props: any) {
    const { color, player, data, rotate } = props
    const dispatch = useDispatch()
    const currentPlayerChance = useSelector(selectCurrentPlayerChance)
    const isDiceRolled = useSelector(selectDiceRolled)
    const diceNo = useSelector(selectDiceNo)
    const playerPieces = useSelector((state: any) => state.game[`player${currentPlayerChance}`])
    const pileIcon = BackgroundImage.GetImage(color)
    const diceIcon = BackgroundImage.GetImage(diceNo)
    const delay = (ms: any) => new Promise((resolve: any) => setTimeout(resolve, ms))

    const arrowAnim = useRef(new Animated.Value(0)).current
    const [diceRolling, setDiceRolling] = useState(false)

    useEffect(() => {
        arrowAnim.setValue(0)
        const animateArrow = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(arrowAnim, {
                        toValue: 10,
                        duration: 600,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true
                    }),
                    Animated.timing(arrowAnim, {
                        toValue: 0,
                        duration: 400,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true
                    })
                ])  
            ).start()
        }
        animateArrow()

    }, [currentPlayerChance, isDiceRolled])


    const handleDicePress = async () => {
        // const newDiceNo = Math.floor(Math.random() * 6) + 1;
        const newDiceNo = 6
        playSound("dice_roll")
        setDiceRolling(true)
        await delay(800)
        dispatch(updateDiceNo({ diceNo: newDiceNo }));
        setDiceRolling(false)


        const isAnyPieceAlive = data.some((piece: any) => piece.pos != 0 && piece.pos !== 57);
        const isAnyPieceLocked = data.some((i: any) => i.pos == 0);

        if (isAnyPieceAlive) {
            const canMove = data.some(
                (pile: any) => pile.travelCount + newDiceNo <= 57 && pile.pos != 0
            );
            if (!canMove) {
                let chancePlayer = player + 1;
                if (chancePlayer > 4) chancePlayer = 1;
                await delay(600);
                dispatch(updatePlayerChance({ chancePlayer }));
                return;
            }
            if (newDiceNo == 6 && isAnyPieceLocked) {
                dispatch(enablePileSelection({ playerNo: player }));
            }
            dispatch(enableCellSelection({ playerNo: player }));
        } else {
            if (newDiceNo == 6) {
                dispatch(enablePileSelection({ playerNo: player }));
            } else {
                let chancePlayer = player + 1;
                if (chancePlayer > 4) chancePlayer = 1;
                await delay(600);
                dispatch(updatePlayerChance({ chancePlayer }));
            }
        }


    }
    return (
        <View style={[styles.flexRow, { transform: [{ scaleX: rotate ? -1 : 1 }] }]}>
            <View style={styles.border1}>
                <LinearGradient
                    style={styles.linearGradient}
                    colors={["#0052be", "#5f9fcb", "#97c6c9"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0.5 }}
                >
                    {" "}

                    <View>
                        <Image source={pileIcon} style={styles.pileIcon} />
                    </View>
                </LinearGradient>
            </View>
            <View style={styles.border2}>
                <LinearGradient
                    style={styles.diceGradient}
                    colors={["#aac8ab", "#aac8ab", "#aac8ab"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                >
                    <View style={styles.diceContainer}>
                        {
                            currentPlayerChance == player ? (
                                <>
                                    <TouchableOpacity
                                        disabled={isDiceRolled}
                                        activeOpacity={0.4}
                                        onPress={handleDicePress}

                                    >
                                        <Image source={diceIcon} style={styles.dice} />

                                    </TouchableOpacity>
                                </>
                            ) : null
                        }
                    </View>
                </LinearGradient>
            </View>

            {currentPlayerChance == player && !isDiceRolled ? (

                <Animated.View style={{
                    transform: [{
                        translateX: arrowAnim
                    }]
                }}>
                    <Image source={Arrow} style={{ width: 40, height: 30 }} />
                </Animated.View>
            ) : null}


            {currentPlayerChance == player && diceRolling ? (

                <>
                    <LottieView
                        source={DiceRoll}
                        style={styles.rollingDice}
                        loop={false}
                        autoPlay
                        cacheComposition={true}
                        hardwareAccelerationAndroid


                    />

                </>
            ) : null}

        </View>
    )
}

export default memo(Dice)

const styles = StyleSheet.create({
    flexRow: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    pileIcon: {
        width: 35,
        height: 35
    },
    dice: {
        width: 35,
        height: 35
    },
    diceContainer: {
        backgroundColor: "#e8c0c1",
        borderWidth: 1,
        borderRadius: 5,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    pileContainer: {
        paddingHorizontal: 3,
        paddingVertical: 10
    },
    linearGradient: {
        padding: 1,
        borderWidth: 3,
        borderRightWidth: 0,
        borderColor: "#f0ce2c",
        justifyContent: "center",
        alignItems: "center"
    },
    rollingDice: {
        height: 80,
        width: 80,
        zIndex: 99,
        top: -25,
        position: "absolute"
    },
    diceGradient: {
        borderWidth: 3,
        borderLeftWidth: 3,
        borderColor: "#f0ce2c",
        justifyContent: "center",
        alignItems: "center"
    },
    border1: {
        borderWidth: 1,
        borderRightWidth: 0,
        borderColor: "#f0ce2c"
    },
    border2: {
        borderWidth: 3,
        padding: 0,
        backgroundColor: "#aac8ab",
        borderRadius: 10,
        borderLeftWidth: 3,
        borderColor: "#aac8ab",
    },

})