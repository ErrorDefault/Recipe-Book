import React from 'react'
import { StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import IconContainer from './IconContainer'

import COLORS from '../assets/colors/colors'

export default function ShareButton(props) {
    return (
        <IconContainer
            onPress={props.action}
            style={styles.iconContainer}
            size={30}
        >
            <Icon
                name={'share-social'}
                size={25} 
                color={COLORS.darkBlue}
            />
        </IconContainer>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: COLORS.transparent,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
})