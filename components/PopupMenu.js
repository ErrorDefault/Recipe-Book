import React from 'react'
import { Dimensions, Modal, Pressable, StyleSheet, TouchableHighlight, View } from 'react-native'

import AppText from './AppText'
import AppHeaderText from './AppHeaderText'

import COLORS from '../assets/colors/colors'

export default function PopupMenu(props) {
    const {visible, setVisible, title, message, cancelText = 'Cancel', cancelAction, confirmText = 'Confirm', confirmAction} = props
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <Pressable 
                style={{height: '100%', backgroundColor: COLORS.transparentLightGrey}}
                onPress={() => setVisible(false)}
            >
            </Pressable>
            <View style={styles.alertBox}>
                <View style={styles.alertBoxTextContainer}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <AppHeaderText>{title}</AppHeaderText>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <AppText style={{color: COLORS.darkBlue}}>{message}</AppText>
                    </View>
                    <View style={{width: '100%', flex: 1, flexDirection: 'row-reverse'}}>
                        <TouchableHighlight 
                            style={styles.buttonContainer}
                            underlayColor={COLORS.white}
                            onPress={confirmAction}
                        >
                            <View style={styles.button}>
                                <AppText style={styles.buttonText}>{confirmText}</AppText>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight 
                            style={[styles.buttonContainer, {marginRight: windowWidth/20}]}
                            underlayColor={COLORS.white}
                            onPress={cancelAction}
                        >
                            <View style={[styles.button, {backgroundColor: COLORS.lighterGrey}]}>
                                <AppText style={[styles.buttonText, {color: COLORS.darkBlue}]}>{cancelText}</AppText>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    alertBox: {
        position: 'absolute',
        top: windowHeight / 2 - 85,
        marginHorizontal: '5%',
        width: '90%',
        height: 170,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        elevation: 5
    },
    alertBoxTextContainer: {
        position: 'absolute',
        marginHorizontal: windowWidth / 20,
        marginVertical: 20,
        width: windowWidth * 0.8,
        height: 130,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        borderRadius: 25,
    },
    button: {
        borderRadius: 25,
        backgroundColor: COLORS.red,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        padding: 10,
        fontFamily: 'Inter-SemiBold',
        color: COLORS.white
    }
})