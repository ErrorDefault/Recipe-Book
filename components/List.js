import React from 'react'
import { View, StyleSheet } from 'react-native'

import AppText from './AppText'
import AppHeaderText from './AppHeaderText'

export default function List(props) {
    const {data = [], numbered = false} = props
    const dataList = data.map((item, index) => {
        return (
            numbered
            ? <AppText key={index} style={index === data.length - 1 ? null : styles.text}>{`${index+1}.   ${item}`}</AppText>
            : <AppText key={index} style={index === data.length - 1 ? null : styles.text}>•    {item}</AppText>
        )
    })
    return (
        <View style={[styles.container, props.style]}>
            <View style={styles.list}>
                {dataList}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    list: {
        
    },
    title: {
        lineHeight: 40
    },
    text: {
        marginBottom: 5
    }
})