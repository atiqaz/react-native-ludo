import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import LinearGradient from 'react-native-linear-gradient'


const iconSize = RFValue()
const GradientButton = ({ title, onPress, iconColor = "#d5be3e" }: any) => {

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.btnContainer}
                activeOpacity={0.5}
                onPress={() => { }}
            >
                <LinearGradient
                    colors={["#4c669f", "#3b5998", "#192f6a"]}
                    style={styles.button}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.buttonText}>{title}</Text>
                </LinearGradient>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        marginVertical: 10
    },
    btnContainer: {
        borderWidth: 5,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: "white",
        shadowColor: "#d5be3e",
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 1, height: 1
        },
        shadowRadius: 10,
        borderColor: "#d5be3e",
        width: 220
    },
    buttonText: {
        color: 'white',
        fontSize: RFValue(16),
        width: "70%",
        textAlign: "left",
        fontFamily: "Philospher-Bold"

    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#000",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20
    }
})
export default GradientButton