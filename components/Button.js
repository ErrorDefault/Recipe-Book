import React from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'

import AppText from './AppText'

import COLORS from '../assets/colors/colors'

export default function Button(props) {
    return (
        <TouchableHighlight 
            style={[styles.buttonContainer, props.style]}
            underlayColor='#FFFFFF'
            onPress={props.action}
        >
            <View style={styles.button}>
                <AppText style={[styles.buttonText, props.textStyle]}>{props.text}</AppText>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 5,
        elevation: 8,
        shadowColor: COLORS.red
    },
    button: {
        borderRadius: 5,
        backgroundColor: COLORS.red,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        padding: 10,
        fontFamily: 'Inter-SemiBold',
        color: COLORS.white,
    }
})
