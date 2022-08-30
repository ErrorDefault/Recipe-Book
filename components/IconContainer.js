import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'

import COLORS from '../assets/colors/colors'

export default function IconContainer(props) {
    const {onPress, size = 30} = props

    const styles = StyleSheet.create({
        iconContainer: {
            width: size,
            height: size,
            borderRadius: size,
            backgroundColor: COLORS.transparentDarkGrey,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    return (
        onPress
        ? <TouchableOpacity style={[styles.iconContainer, props.style]} onPress={onPress}>
            {props.children}
        </TouchableOpacity>
        : <View style={[styles.iconContainer, props.style]}>
            {props.children}
        </View>
    )
}