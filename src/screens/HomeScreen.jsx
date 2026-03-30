import { View, Text, StyleSheet, Image, Alert, Animated, Pressable } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import Wrapper from '../components/Wrapper'
import Logo from '../assets/images/logo.png'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import GradientButton from '../components/GradientButton'
import Lottiew from 'lottie-react-native'
import Witch from '../assets/animation/witch.json'
import { useNavigation } from '@react-navigation/native'
import { playSound } from '../helpers/SoundUtility'
import SoundPlayer from 'react-native-sound-player'
import { navigate } from '../helpers/NavigationUtil'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentPositions } from '../redux/reducers/gameSelectors'
import { resetGame } from '../redux/reducers/gameSlice'

const HomeScreen = () => {

    const dispatch = useDispatch()
    const currentPosition = useSelector(selectCurrentPositions);
    console.log(currentPosition)
    const witchAnim = useRef(new Animated.Value(-deviceWidth)).current
    const scaleXAnim = useRef(new Animated.Value(-1)).current
    const isFocused = useNavigation()

    useEffect(() => {
        if (isFocused) {
            // playSound('home')
        }
    }, [isFocused])

    const startGame = (isNew = false) => {
        SoundPlayer.stop();
        navigate('LudoBoardScreen');
        playSound('game_start');
    };

    useEffect(() => {
        const loopAnimation = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.parallel([
                        Animated.timing(witchAnim, {
                            toValue: deviceWidth * 2,
                            duration: 2000,
                            useNativeDriver: true
                        }),
                        Animated.timing(scaleXAnim, {
                            toValue: -1,
                            duration: 0,
                            useNativeDriver: true
                        })
                    ]),
                    Animated.delay(3000),
                    Animated.parallel([
                        Animated.timing(witchAnim, {
                            toValue: deviceWidth * 2,
                            duration: 8000,
                            useNativeDriver: true
                        }),
                        Animated.timing(scaleXAnim, {
                            toValue: -1,
                            duration: 0,
                            useNativeDriver: true
                        })
                    ]),
                    Animated.parallel([
                        Animated.timing(witchAnim, {
                            toValue: deviceWidth * 0.05,
                            duration: 3000,
                            useNativeDriver: true
                        }),
                        Animated.timing(scaleXAnim, {
                            toValue: 1,
                            duration: 0,
                            useNativeDriver: true
                        })
                    ]),
                    Animated.delay(3000),
                    Animated.parallel([
                        Animated.timing(witchAnim, {
                            toValue: -deviceWidth * 2,
                            duration: 8000,
                            useNativeDriver: true
                        }),
                        Animated.timing(scaleXAnim, {
                            toValue: 1,
                            duration: 0,
                            useNativeDriver: true
                        })
                    ]),

                ])
            ).start()
        }
        const cleanupAnimation = () => {
            Animated.timing(witchAnim).stop()
            Animated.timing(scaleXAnim).stop()
        }
        loopAnimation()
        return cleanupAnimation;
    }, [witchAnim, scaleXAnim])

    const renderButton = useCallback((title, onPress) => <GradientButton title={title} onPress={onPress} />, [])

    const startgame = async (isNew = false) => { }
    const handleNewGamePress = useCallback(() => {
        if(isNew){
            dispatch(resetGame())
        }
        startGame(true)
    }, [])

    const handlePressResume =useCallback(()=>{
        startGame()
    },[])
    return (
        <Wrapper style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image source={Logo} style={styles.img} />
            </View>
            {currentPosition.length!==0  && renderButton("RESUME", handlePressResume)}
            {renderButton("New game", handleNewGamePress)}
            {renderButton("VS CPU", () => Alert.alert("Coming Soon"))}
            {renderButton("2 VS 2", () => Alert.alert("Coming Soon"))}

            <Animated.View
                style={[
                    styles.witchConatiner,
                    {
                        transform: [{ translateX: witchAnim }, { scale: scaleXAnim }]
                    }
                ]}
            >
                <Pressable>
                    <Lottiew
                        hardwareAccelerationAndroid
                        source={Witch}
                        autoPlay
                        speed={1}
                        style={styles.witch}
                    />

                </Pressable>

            </Animated.View>

        </Wrapper>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'flex-start'
    },
    imageContainer: {
        width: deviceWidth * 0.6,
        height: deviceHeight * 0.2,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 40,
        alignSelf: "center"
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    witch: {
        height: 250,
        width: 250,
        transform: [{
            rotate: "25deg"
        }]

    }
})

export default HomeScreen