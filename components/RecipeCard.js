import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'

import COLORS from '../assets/colors/colors';

export default function RecipeCard(props) {
    return (
        <View style={[styles.container, props.style]}>
            <View style={styles.imageBackground}>
                <Image 
                    style={styles.image}
                    source={{uri: props.imageUri}}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text} ellipsizeMode="tail" numberOfLines={2}>{props.name + '\n'}</Text>
            </View>
        </View>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: COLORS.white,
        overflow: 'hidden',
    },
    imageBackground: {
        width: '100%',
        height: 175,
        borderTopStartRadius: 10,
        backgroundColor: COLORS.lightGrey
    },
    image: {
        width: '100%',
        height: 175,
        resizeMode: 'cover'
    },
    textContainer: {
        height: 'auto',
        justifyContent: 'center'
    },
    text: {
        margin: '5%',
        fontSize: 17,
        fontFamily: 'Inter-SemiBold', 
        color: '#2B283A'
    },
    menu: {
        position: 'absolute',
    },
})