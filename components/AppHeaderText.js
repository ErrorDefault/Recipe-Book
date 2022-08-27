import React from 'react'
import { Text, StyleSheet } from 'react-native'

import AppText from './AppText'

import COLORS from '../assets/colors/colors'

export default function AppHeaderText(props) {
    return (
        <AppText>
            <Text style={[styles.defaultStyle, props.style]}>
                {props.children}
            </Text>
        </AppText>
    )
}

const styles = StyleSheet.create({
    defaultStyle: {
        fontSize: 19,
        fontFamily: 'Inter-SemiBold',
        color: COLORS.darkBlue
    }
})