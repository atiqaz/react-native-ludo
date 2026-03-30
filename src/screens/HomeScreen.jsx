import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import React, { useCallback } from 'react'
import Wrapper from '../components/Wrapper'
import Logo from '../assets/images/logo.png'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import GradientButton from '../components/GradientButton'

const HomeScreen = () => {
const renderButton = useCallback((title , onPress)=><GradientButton title={title} onPress={onPress} />,[])

const startgame = async (isNew =false)=>{}
const handleNewGamePress =useCallback(()=>{
startGame(true)
},[])
    return (
        <Wrapper style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image source={Logo} style={styles.img} />
            </View>
            {renderButton("New game",handleNewGamePress)}
            {renderButton("VS CPU",()=>Alert.alert("Coming Soon"))}
            {renderButton("2 VS 2",()=>Alert.alert("Coming Soon"))}
       
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
    }
})

export default HomeScreen