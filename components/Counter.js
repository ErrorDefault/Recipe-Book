import React from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import AppEmphasisText from './AppEmphasisText'

import COLORS from '../assets/colors/colors'

export default function Counter(props) {
    const {value, setValue, min = null, max = null} = props

    function increment() {
        setValue(prevNum => ((max != null && (prevNum + 1) > max) ? max : prevNum + 1))
    }

    function decrement() {
        setValue(prevNum => ((min != null && (prevNum - 1) < min) ? min : prevNum - 1))
    }

    const MinusButton = () => (
        <TouchableHighlight 
            style={[styles.change, styles.minus]}
            onPress={decrement}
            underlayColor={COLORS.white}
        >
            <Icon 
                name={'minus'} 
                size={20} 
                color={COLORS.red}
            />
        </TouchableHighlight>
    )

    const PlusButton = () => (
        <TouchableHighlight 
            style={[styles.change, styles.plus]}
            onPress={increment}
            underlayColor={COLORS.white}
        >
            <Icon 
                name={'plus'} 
                size={20} 
                color={COLORS.red}
            />
        </TouchableHighlight>
    )

    return (
        <View style={[styles.container, props.style]}>
            <MinusButton/>
            <View style={styles.number}>
                <AppEmphasisText style={styles.numberText}>{value}</AppEmphasisText>
            </View>
            <PlusButton/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: 138,
        height: 46,
        flex: 1,
        flexDirection: "row"
    },
    number: {
        flex: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.lightBlue,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberText: {
        color: COLORS.darkBlue
    },
    change: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.lightBlue,
        backgroundColor: COLORS.lighterGrey,
        justifyContent: 'center',
        alignItems: 'center'
    },
    minus: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    plus: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    }
})