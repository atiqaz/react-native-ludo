import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import Wrapper from '../components/Wrapper'
import { useNavigation } from '@react-navigation/native'
import startGame from '../assets/images/start.png'
import { useSelector } from 'react-redux'
import { selectDiceTouch, selectPlayer1, selectPlayer2, selectPlayer3, selectPlayer4 } from '../redux/reducers/gameSelectors'
import WinModal from '../components/WinModal'
import { Colors } from '../constants/Colors'
import Dice from '../components/Dice'
import Pocket from '../components/Pocket'
import VerticalPath from '../components/VerticalPath'
import { Plot1Data, Plot2Data, Plot3Data, Plot4Data } from '../helpers/PlotData'
import HorizantalPath from '../components/HorizantalPath'
import FourTriangles from '../components/FourTriangles'
import MenuModal from '../components/MenuModal'
import { Menu } from 'lucide-react-native'

export default function LudoBoardScreen() {
  const [showStartImage, setStartImage] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const opacity = useRef(new Animated.Value(1)).current
  const isFocused = useNavigation()

  const player1 = useSelector(selectPlayer1)
  const player2 = useSelector(selectPlayer2)
  const player3 = useSelector(selectPlayer3)
  const player4 = useSelector(selectPlayer4)
  const winner = useSelector((state: any) => state.game.winner)
  const isDiceTouch = useSelector(selectDiceTouch)

  useEffect(() => {
    if (isFocused) {
      setStartImage(true)
      const blinkingAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true })
        ])
      )
      blinkingAnimation.start()
      const timeOut = setTimeout(() => {
        blinkingAnimation.stop()
        setStartImage(false)
      }, 2500)
      return () => {
        blinkingAnimation.stop()
        clearTimeout(timeOut)
      }
    }
  }, [isFocused])

  return (
    <Wrapper>
      <TouchableOpacity style={styles.menuIcon} onPress={() => setMenuVisible(true)}>
        <Menu color='#d5be3e' size={28} />
      </TouchableOpacity>

      <View style={styles.container}>

        <View style={styles.flexRow} pointerEvents={isDiceTouch ? "none" : "auto"}>
          <Dice color={Colors.green} player={2} data={player2} />
          <Dice color={Colors.yellow} rotate player={3} data={player3} />
        </View>

        {/* =======================ludo Board======================= */}
        <View style={styles.ludoBoard}>

          {/* Row 1: Green (top-left) + vertical path + Yellow (top-right) */}
          <View style={styles.plotContainer}>
            <Pocket color={Colors.green} player={2} data={player2} />
            <VerticalPath cells={Plot2Data} color={Colors.yellow} />
            <Pocket color={Colors.yellow} player={3} data={player3} />
          </View>

          {/* Row 2: horizontal middle path */}
          <View style={styles.pathContainer}>
            <HorizantalPath cells={Plot1Data} color={Colors.green}/>
            {/* <View style={styles.centerSquare} /> */}
            <FourTriangles 
            player1={player1} player2={player2} player3={player3} player4={player4}
            />
            <HorizantalPath cells={Plot3Data} color={Colors.blue}/>
          </View>

          {/* Row 3: Red (bottom-left) + vertical path + Blue (bottom-right) */}
          <View style={styles.plotContainer}>
            <Pocket color={Colors.red} player={1} data={player1} />
            <VerticalPath cells={Plot4Data} color={Colors.red} />
            <Pocket color={Colors.blue} player={4} data={player4} />
          </View>

        </View>

        {/* =======================Dice======================== */}
        <View style={styles.flexRow} pointerEvents={isDiceTouch ? "none" : "auto"}>
          <Dice color={Colors.red} player={1} data={player1} />
          <Dice color={Colors.blue} rotate player={4} data={player4} />
        </View>

        <View></View>
      </View>

      {showStartImage && (
        <Animated.Image
          source={startGame}
          style={{
            width: deviceWidth * 0.5,
            height: deviceHeight * 0.2,
            position: "absolute",
            opacity
          }}
        />
      )}
      <>{winner !== null && <WinModal winner={winner} />}</>
      <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  menuIcon: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 100,
    padding: 6,
  },
  container: {
    alignSelf: "center",
    justifyContent: "center",
    height: deviceHeight * 0.5,
    width: deviceWidth
  },
  ludoBoard: {
    width: deviceWidth,
    height: deviceWidth,
    alignSelf: "center",
    padding: 10,
  },
  flexRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30
  },
  rowContainer: {
    flexDirection: "row",
    flex: 6,
  },
  middleRow: {
    flexDirection: "row",
    flex: 2,
  },
  colPath: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#000"
  },
  rowPath: {
    flex: 6,
    borderWidth: 1,
    borderColor: "#000"
  },
  centerSquare: {
    flex: 3,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff"
  },
  plotContainer:{
    flex: 6,
    flexDirection:"row",
  },
  pathContainer:{
    flexDirection:"row",
    flex: 3,
  },
})
