import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux'
import { announceWinner, resetGame } from '../redux/reducers/gameSlice'
import { playSound } from '../helpers/SoundUtility'
import { resetAndNavigate } from '../helpers/NavigationUtil'
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from './GradientButton';
import Pile from './Pile';
import { colorPlayer } from '../helpers/PlotData';

export default function WinModal(props: any) {
    const { winner } = props

    const dispatch = useDispatch()
    const [visible, setVisible] = useState(!!winner)

    useEffect(() => {
        setVisible(!!winner)
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

    return (
        <Modal
            isVisible={visible}
            backdropColor='black'
            backdropOpacity={0.8}
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            onBackdropPress={() => { }}
            onBackButtonPress={() => { }}
        >
            <View style={styles.center}>
                <LinearGradient
                    colors={["#0f0c29", "#302b63", "#24243e"]}
                    style={styles.card}
                >
           
                    <Text style={styles.title}>🎉 WINNER 🎉</Text>
                    <View style={styles.pileContainer}>
                        <Pile player={winner} color={colorPlayer[winner-1]} />
                    </View>
                    <Text style={styles.title}>😊Congratulations PLAYER {winner} </Text>

                

                    <View style={styles.buttonContainer}>
                        <GradientButton
                            title="NEW GAME"
                            onPress={startNewGame}
                        />

                        <GradientButton
                            title="HOME"
                            onPress={handleHome}
                        />
                    </View>

                </LinearGradient>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: '100%',
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
        marginBottom: 10,
        letterSpacing: 1
    },
    winner: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 25
    },
    pileContainer:{},
    buttonContainer: {
        width: '100%',
        gap: 12
    }
})