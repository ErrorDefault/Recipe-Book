import React from 'react'
import { StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import IconContainer from './IconContainer'

import COLORS from '../assets/colors/colors'

export default function CheckButton(props) {
    return (
        <IconContainer
            onPress={props.action}
            style={styles.iconContainer}
            size={30}
        >
            <Icon
                name={'check'}
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