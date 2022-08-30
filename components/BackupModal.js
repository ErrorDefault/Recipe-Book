import React from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'

import AntIcon from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import AppText from './AppText'
import AppHeaderText from './AppHeaderText'
import IconContainer from './IconContainer'

import COLORS from '../assets/colors/colors'

export default function BackupModal(props) {
    const {visible, setVisible, exportAction, importAction} = props

    return (
        <>
            <Modal
                animationType='slide'
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <Pressable 
                    style={styles.topView}
                    onPress={() => setVisible(false)}
                >
                </Pressable>
                <View style={styles.bottomView}>
                    <>
                        <View style={styles.titleContainer}>
                            <AppHeaderText style={styles.title}>Export/Import Backup</AppHeaderText>
                            <IconContainer 
                                style={{backgroundColor: COLORS.transparent}} 
                                size={20}
                                onPress={() => setVisible(false)}
                            >
                                <AntIcon
                                    name={'close'}
                                    size={20} 
                                    color={COLORS.lightBlue}
                                />
                            </IconContainer>
                        </View>
                        <Pressable
                            onPress={exportAction}
                            android_ripple={{
                                color: COLORS.lightGrey,
                            }}
                        >
                            <View style={styles.section}> 
                                <IconContainer 
                                    style={{backgroundColor: COLORS.transparent, marginRight: 15}} 
                                    size={20}
                                >
                                    <MaterialCommunityIcon
                                        name={'upload'}
                                        size={20} 
                                        color={COLORS.lightBlue}
                                    />
                                </IconContainer>
                                <AppText>Export backup</AppText>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={importAction}
                            android_ripple={{
                                color: COLORS.lightGrey,
                            }}
                        >
                            <View style={styles.section}> 
                                <IconContainer 
                                    style={{backgroundColor: COLORS.transparent, marginRight: 15}} 
                                    size={20}
                                >
                                    <MaterialCommunityIcon
                                        name={'download'}
                                        size={20} 
                                        color={COLORS.lightBlue}
                                    />
                                </IconContainer>
                                <AppText>Import backup</AppText>
                            </View>
                        </Pressable>
                    </>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    topView: {
        height: '100%',
        backgroundColor: COLORS.transparent
    },
    bottomView: {
        marginTop: 'auto',
        height: 180,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: COLORS.white
    },
    titleContainer: {
        marginHorizontal: '5%',
        marginTop: 5,
        height: 50, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    title: {
        marginTop: 5,
        flex: 1
    },
    section: {
        marginHorizontal: '5%',
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        color: COLORS.lightBlue
    }
})