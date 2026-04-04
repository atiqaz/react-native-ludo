import { View, Text, StyleSheet, Image, Alert, Animated } from 'react-native'
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
    const witchAnim = useRef(new Animated.Value(-deviceWidth * 0.3)).current
    const scaleXAnim = useRef(new Animated.Value(1)).current
    const isFocused = useNavigation()

    useEffect(() => {
        if (isFocused) {
            // playSound('home')
        }
    }, [isFocused])

    const startGame = (isNew = false) => {
        if (isNew) {
            dispatch(resetGame())
        }
        SoundPlayer.stop();
        navigate('LudoBoardScreen');
        playSound('game_start');
    };

    useEffect(() => {
        const anim = Animated.loop(
            Animated.sequence([
                Animated.timing(witchAnim, { toValue: deviceWidth * 0.3, duration: 3000, useNativeDriver: true }),
                Animated.delay(2000),
                Animated.timing(witchAnim, { toValue: deviceWidth * 1.2, duration: 3000, useNativeDriver: true }),
                Animated.timing(scaleXAnim, { toValue: -1, duration: 0, useNativeDriver: true }),
                Animated.timing(witchAnim, { toValue: deviceWidth * 0.3, duration: 3000, useNativeDriver: true }),
                Animated.delay(2000),
                Animated.timing(witchAnim, { toValue: -deviceWidth * 0.3, duration: 3000, useNativeDriver: true }),
                Animated.timing(scaleXAnim, { toValue: 1, duration: 0, useNativeDriver: true }),
            ])
        )
        anim.start()
        return () => anim.stop()
    }, [])

    const renderButton = useCallback((title, onPress) => <GradientButton title={title} onPress={onPress} />, [])

    const startgame = async (isNew = false) => { }
    const handleNewGamePress = useCallback(() => {

        startGame(true)
    }, [])

    const handlePressResume = useCallback(() => {
        startGame()
    }, [])
    return (
        <Wrapper style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image source={Logo} style={styles.img} />
            </View>
            {currentPosition.length !== 0 && renderButton("RESUME", handlePressResume)}
            {renderButton("New game", handleNewGamePress)}
            {renderButton("VS CPU", () => Alert.alert("Coming Soon"))}
            {renderButton("2 VS 2", () => Alert.alert("Coming Soon"))}

            <View style={styles.footer}>
                <Text style={styles.footerSub}>Developed by</Text>
                <Text style={styles.footerName}>MD ATIQUR RAHMAN</Text>
            </View>

            <Animated.View
                style={[
                    styles.witchContainer,
                    { transform: [{ translateX: witchAnim }, { scaleX: scaleXAnim }] }
                ]}
            >
                <Lottiew
                    hardwareAccelerationAndroid
                    source={Witch}
                    autoPlay
                    loop
                    speed={1}
                    style={styles.witch}
                />
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
    witchContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        zIndex: -1,
    },
    witch: {
        height: 200,
        width: 200,
        transform: [{ rotate: '25deg' }]
    },
    footer: {
        alignItems: 'center',
        marginTop: 18,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#d5be3e44',
        width: '60%',
        alignSelf: 'center',
    },
    footerSub: {
        color: '#888',
        fontSize: 11,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    footerName: {
        color: '#d5be3e',
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 1.5,
        marginTop: 2,
    },
})

export default HomeScreen