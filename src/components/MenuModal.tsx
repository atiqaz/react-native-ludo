import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Modal from 'react-native-modal'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch } from 'react-redux'
import { resetGame } from '../redux/reducers/gameSlice'
import { navigate, resetAndNavigate } from '../helpers/NavigationUtil'
import { playSound } from '../helpers/SoundUtility'
import { RFValue } from 'react-native-responsive-fontsize'
import { CirclePlay, House, Play } from 'lucide-react-native'
import { deviceWidth } from '../constants/Scaling'

interface MenuModalProps {
    visible: boolean
    onClose: () => void
}

export default function MenuModal({ visible, onClose }: MenuModalProps) {
    const dispatch = useDispatch()
    const scaleAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (visible) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                tension: 70,
                useNativeDriver: true,
            }).start()
        } else {
            scaleAnim.setValue(0)
        }
    }, [visible])

    const handleResume = () => {
        playSound('ui')
        onClose()
    }

    const handleNewGame = () => {
        dispatch(resetGame())
        playSound('game_start')
        onClose()
    }

    const handleHome = () => {
        dispatch(resetGame())
        playSound('ui')
        onClose()
        resetAndNavigate('HomeScreen')
    }

    return (
        <Modal
            isVisible={visible}
            backdropColor='black'
            backdropOpacity={0.75}
            animationIn='fadeIn'
            animationOut='fadeOut'
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
        >
            <Animated.View style={[styles.center, { transform: [{ scale: scaleAnim }] }]}>
                <LinearGradient
                    colors={['#0f0c29', '#302b63', '#24243e']}
                    style={styles.card}
                >
                    {/* Header */}
                    <LinearGradient
                        colors={['#d5be3eaa', '#d5be3e', '#d5be3eaa']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.header}
                    >
                        <Text style={styles.headerText}>⚙️  MENU</Text>
                    </LinearGradient>

                    <View style={styles.divider} />

                    {/* Resume */}
                    <MenuItem
                        icon={<Play color='#d5be3e' size={RFValue(16)} />}
                        label='RESUME'
                        onPress={handleResume}
                        colors={['#1a1a2e', '#16213e']}
                    />

                    {/* New Game */}
                    <MenuItem
                        icon={<CirclePlay color='#4fc3f7' size={RFValue(16)} />}
                        label='NEW GAME'
                        onPress={handleNewGame}
                        colors={['#1a1a2e', '#16213e']}
                    />

                    {/* Home */}
                    <MenuItem
                        icon={<House color='#ef9a9a' size={RFValue(16)} />}
                        label='HOME'
                        onPress={handleHome}
                        colors={['#1a1a2e', '#16213e']}
                        last
                    />
                </LinearGradient>
            </Animated.View>
        </Modal>
    )
}

function MenuItem({ icon, label, onPress, colors, last = false }: any) {
    return (
        <>
            <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.menuItem}>
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.menuItemGradient}
                >
                    <View style={styles.iconBox}>{icon}</View>
                    <Text style={styles.menuLabel}>{label}</Text>
                    <Text style={styles.arrow}>›</Text>
                </LinearGradient>
            </TouchableOpacity>
            {!last && <View style={styles.itemDivider} />}
        </>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: deviceWidth * 0.78,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#d5be3e',
    },
    header: {
        paddingVertical: 14,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: RFValue(18),
        fontWeight: '900',
        letterSpacing: 3,
    },
    divider: {
        height: 2,
        backgroundColor: '#d5be3e',
        opacity: 0.4,
    },
    menuItem: {
        width: '100%',
    },
    menuItemGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        gap: 16,
    },
    iconBox: {
        width: 32,
        alignItems: 'center',
    },
    menuLabel: {
        flex: 1,
        color: '#fff',
        fontSize: RFValue(15),
        fontWeight: '700',
        letterSpacing: 1.5,
    },
    arrow: {
        color: '#d5be3e',
        fontSize: RFValue(22),
        fontWeight: '300',
    },
    itemDivider: {
        height: 1,
        backgroundColor: '#ffffff15',
        marginHorizontal: 20,
    },
})
