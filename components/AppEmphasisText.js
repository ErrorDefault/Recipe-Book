import React from 'react'
import { Text, StyleSheet } from 'react-native'

import COLORS from '../assets/colors/colors'

export default function AppEmphasisText(props) {
    return (
        <Text style={[styles.defaultStyle, props.style]}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    defaultStyle: {
        fontSize: 15,
        fontFamily: 'Inter-Medium', 
        color: COLORS.red
    }
})