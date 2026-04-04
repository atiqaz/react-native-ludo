import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux'
import { announceWinner, resetGame } from '../redux/reducers/gameSlice'
import { playSound } from '../helpers/SoundUtility'
import { resetAndNavigate } from '../helpers/NavigationUtil'
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from './GradientButton';
import { colorPlayer } from '../helpers/PlotData';
import { deviceWidth } from '../constants/Scaling';
import { RFValue } from 'react-native-responsive-fontsize';

const playerNames = ['', 'Red', 'Green', 'Yellow', 'Blue'];
const pileImages = [
    null,
    require('../assets/images/piles/red.png'),
    require('../assets/images/piles/green.png'),
    require('../assets/images/piles/yellow.png'),
    require('../assets/images/piles/blue.png'),
];

export default function WinModal(props: any) {
    const { winner } = props
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(!!winner)
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const bounceAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setVisible(!!winner)
        if (winner) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 60,
                useNativeDriver: true,
            }).start();
            Animated.loop(
                Animated.sequence([
                    Animated.timing(bounceAnim, { toValue: -10, duration: 500, useNativeDriver: true }),
                    Animated.timing(bounceAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
                ])
            ).start();
        }
    }, [winner])

    const startNewGame = () => {
        dispatch(resetGame())
        dispatch(announceWinner(null))
        playSound('game_start')
    }

    const handleHome = () => {
        dispatch(resetGame())
        dispatch(announceWinner(null))
        resetAndNavigate('HomeScreen')
    }

    const winnerColor = colorPlayer[winner - 1];

    return (
        <Modal
            isVisible={visible}
            backdropColor='black'
            backdropOpacity={0.85}
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            onBackdropPress={() => { }}
            onBackButtonPress={() => { }}
        >
            <Animated.View style={[styles.center, { transform: [{ scale: scaleAnim }] }]}>
                <LinearGradient
                    colors={["#0f0c29", "#302b63", "#24243e"]}
                    style={[styles.card, { borderColor: winnerColor }]}
                >
                    {/* Crown / Trophy */}
                    <Text style={styles.trophy}>🏆</Text>

                    {/* Winner Banner */}
                    <LinearGradient
                        colors={[winnerColor + 'aa', winnerColor, winnerColor + 'aa']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.banner}
                    >
                        <Text style={styles.bannerText}>WINNER!</Text>
                    </LinearGradient>

                    {/* Pile Image bouncing */}
                    <Animated.Image
                        source={pileImages[winner]}
                        style={[styles.pileImage, { transform: [{ translateY: bounceAnim }] }]}
                    />

                    {/* Player Name */}
                    <Text style={[styles.playerName, { color: winnerColor }]}>
                        PLAYER {winner}
                    </Text>
                    <Text style={styles.subtitle}>
                        {playerNames[winner]} wins the game! 🎉
                    </Text>

                    {/* Divider */}
                    <View style={[styles.divider, { backgroundColor: winnerColor }]} />

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <GradientButton title="NEW GAME" onPress={startNewGame} />
                        <GradientButton title="HOME" onPress={handleHome} />
                    </View>
                </LinearGradient>
            </Animated.View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: deviceWidth * 0.85,
        borderRadius: 24,
        paddingVertical: 30,
        paddingHorizontal: 24,
        alignItems: 'center',
        borderWidth: 3,
    },
    trophy: {
        fontSize: RFValue(48),
        marginBottom: 8,
    },
    banner: {
        width: '100%',
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    bannerText: {
        fontSize: RFValue(22),
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 4,
    },
    pileImage: {
        width: 70,
        height: 70,
        marginBottom: 16,
    },
    playerName: {
        fontSize: RFValue(26),
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: RFValue(13),
        color: '#ccc',
        marginBottom: 16,
    },
    divider: {
        width: '80%',
        height: 2,
        borderRadius: 2,
        marginBottom: 20,
        opacity: 0.6,
    },
    buttonContainer: {
        width: '100%',
        gap: 4,
    },
})
