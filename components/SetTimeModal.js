import React from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'
import ScrollPicker from 'react-native-wheel-scrollview-picker'

import Icon from 'react-native-vector-icons/AntDesign'

import AppText from './AppText'
import AppHeaderText from './AppHeaderText'
import Button from './Button'
import IconContainer from './IconContainer'

import { formatHours, formatMinutes } from '../functions/Utils'

import COLORS from '../assets/colors/colors'

export default function SetTimeModal(props) {
    const {visible, setVisible, hours, setHours, minutes, setMinutes, title = "Set Time"} = props

    const [tempHours, setTempHours] = React.useState(hours)
    const [tempMinutes, setTempMinutes] = React.useState(minutes)

    React.useEffect(() => {
        setTempHours(hours)
        setTempMinutes(minutes)
    }, [visible])

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
                ></Pressable>
                <View style={styles.bottomView}>
                    <View style={{marginHorizontal: '5%'}}>
                        <View style={styles.titleContainer}>
                            <AppHeaderText style={styles.title}>{title}</AppHeaderText>
                            <IconContainer 
                                style={{backgroundColor: COLORS.transparent}} 
                                size={20}
                                onPress={() => setVisible(false)}
                            >
                                <Icon
                                    name={'close'}
                                    size={20} 
                                    color={COLORS.lightBlue}
                                />
                            </IconContainer>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <ScrollPicker
                                style={{flex: 1}}
                                dataSource={Array.from(Array(24).keys())}
                                selectedIndex={tempHours}
                                itemHeight={50}
                                wrapperHeight={150}
                                wrapperColor={COLORS.white}
                                highlightColor={COLORS.lightBlue}
                                renderItem={(data, index, isSelected) => {
                                    return(
                                        <View>
                                            <AppText style={{color: isSelected ? COLORS.darkBlue : COLORS.lightBlue}}>
                                                {formatHours(data)}
                                            </AppText>
                                        </View>
                                    )
                                }}
                                onValueChange={(data, selectedIndex) => {
                                    setTempHours(selectedIndex)
                                }}
                            />
                            <ScrollPicker
                                style={{flex: 1}}
                                dataSource={Array.from(Array(60).keys())}
                                selectedIndex={tempMinutes}
                                itemHeight={50}
                                wrapperHeight={150}
                                wrapperColor={COLORS.white}
                                highlightColor={COLORS.lightBlue}
                                renderItem={(data, index, isSelected) => {
                                    return(
                                        <View>
                                            <AppText 
                                                style={{color: isSelected ? COLORS.darkBlue : COLORS.lightBlue}}
                                            >
                                                {formatMinutes(data)}
                                            </AppText>
                                        </View>
                                    )
                                }}
                                onValueChange={(data, selectedIndex) => {
                                    setTempMinutes(selectedIndex)
                                }}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button 
                                style={styles.button}
                                action={() => {
                                    setHours(tempHours)
                                    setMinutes(tempMinutes)
                                    setVisible(false)
                                }}
                                text="Save"
                            />
                        </View>
                    </View>
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
        height: 285,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: COLORS.white
    },
    titleContainer: {
        marginTop: 5,
        height: 50, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },  
    title: {
        marginTop: 5,
        flex: 1
    },
    buttonContainer: {
        height: 75, 
        backgroundColor: COLORS.white,
        justifyContent: 'center'
    },
    button: {
        position: 'absolute',
        width: '100%',
        flex: 1
    }
})