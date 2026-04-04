import { StyleSheet, Text, TouchableOpacity, View, Animated, Image, Alert } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectCellSelection, selectDiceNo, selectPocketPileSelection } from '../redux/reducers/gameSelectors'
import { Colors } from '../constants/Colors'
import PileGreen from '../assets/images/piles/green.png'
import PileRed from '../assets/images/piles/red.png'
import PileBlue from '../assets/images/piles/blue.png'
import Pileyellow from '../assets/images/piles/yellow.png'
import { Circle, Svg } from 'react-native-svg'

export default function Pile(props: any) {
  const { player, color, onPress, cell, pieceId } = props
  // console.log(props)

  const rotation = useRef(new Animated.Value(0)).current;
  const currentPlayerPileSelection = useSelector(selectPocketPileSelection);
  const currentPlayerCellSelection = useSelector(selectCellSelection);
  const diceNo = useSelector(selectDiceNo);
  const playerPieces = useSelector((state: any) => state.game[`player${player}`]);

  const isPileEnabled = useMemo(
    () => player === currentPlayerPileSelection && diceNo === 6, [player, currentPlayerPileSelection, diceNo]
  )
  const isCellEnabled = useMemo(
    () => player === currentPlayerCellSelection, [player, currentPlayerCellSelection]
  )

  const isForwardable = useCallback(() => {
    const piece = playerPieces?.find((p: any) => p.id === pieceId);
    return piece && piece.travelCount + diceNo <= 57;
  }, [playerPieces, pieceId, diceNo])

  const getPileImage = useMemo(() => {
    switch (color) {
      case Colors.green: return PileGreen;
      case Colors.red: return PileRed;
      case Colors.blue: return PileBlue;
      case Colors.yellow: return Pileyellow;
      default: return PileGreen
    }
  }, [color])

  const isActive = cell ? (isCellEnabled && isForwardable()) : isPileEnabled

  useEffect(() => {
    if (!isActive) {
      rotation.setValue(0)
      return
    }
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
    )
    rotateAnimation.start()
    return () => rotateAnimation.stop()
  }, [isActive])


  const rotateInterPolate = useMemo(() => {
    return rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
  }, [rotation])

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,

      ]}
      activeOpacity={0.5}
      disabled={!isActive}
    >
      <View style={styles.hollowCircle}>
        {isActive && (
          <View style={styles.dashedContainerCircle}>
            <Animated.View
              style={[
                styles.dashedCircle,
                {
                  transform: [{ rotate: rotateInterPolate }]
                }
              ]}
            >
              <Svg width="25" height="25">
                <Circle
                 cx="11.5" 
                 cy="10.5"
                  r="11.5" 
                   stroke="white" 
                   strokeWidth="2"
                    strokeDasharray="4 4"
                    strokeDashoffset={0}
                    fill={'transparent'} 
                    />
              </Svg>

            </Animated.View>

          </View>

        )}
      </View>
      <Image source={getPileImage} style={{
        width: 32, height: 32, position: "absolute", top: -16
      }} />

    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    alignSelf: "stretch",
    width: "100%",
    height: "100%",
  },
  hollowCircle: {
    width: 25,
    height: 25,
    position: "absolute",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  dashedContainerCircle: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  dashedCircle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "black",
  }
})