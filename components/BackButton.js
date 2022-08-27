import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import IconContainer from './IconContainer'

import COLORS from '../assets/colors/colors'

export default function BackButton(props) {
    return (
        <IconContainer
            onPress={props.backAction}
            style={styles.iconContainer}
            size={30}
        >
            <Icon
                name={'arrow-back-sharp'}
                size={25} 
                color={COLORS.darkBlue}
            />
        </IconContainer>
    )
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    iconContainer: {
        marginRight: windowWidth / 20 - 10,
        backgroundColor: COLORS.transparent,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
})