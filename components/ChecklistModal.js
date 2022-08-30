import React from 'react'
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native'

import AntIcon from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import AppText from './AppText'
import AppHeaderText from './AppHeaderText'
import IconContainer from './IconContainer'
import Button from './Button'

import COLORS from '../assets/colors/colors'

const windowHeight = Dimensions.get('window').height

export default function ChecklistModal(props) {
    const {visible, setVisible, data, selected, setSelected, title, buttonText = 'Save'} = props

    const [tempSelected, setTempSelected] = React.useState(selected)

    const compareIndexes = (a, b) => {
        return data.indexOf(a) - data.indexOf(b)
    }

    const dataList = data.map((item, index, list) => (
        <Pressable 
            key={index} 
            onPress={() => {
                if(tempSelected.includes(item))
                    setTempSelected(prevData => prevData.filter(tempItem => tempItem != item))
                else
                    setTempSelected(prevData => [...prevData, item].sort(compareIndexes))
            }}
            android_ripple={{
                color: COLORS.lightGrey
            }}
        >
            <View style={[styles.listItem, {
                marginHorizontal: '5%',
                borderBottomWidth: index === list.length - 1 ? 0 : 0.5, 
                borderColor: COLORS.lightBlue
            }]}>
                <AppText>{item}</AppText>
                {
                    tempSelected.includes(item)
                    ? <MaterialCommunityIcon
                        name={'checkbox-marked'}
                        size={20} 
                        color={COLORS.red}
                    />
                    : <MaterialCommunityIcon
                    name={'checkbox-blank-outline'}
                    size={20} 
                    color={COLORS.lightBlue}
                    />
                }
            </View>
        </Pressable>
    ))

    React.useEffect(() => {
        if(visible)
            setTempSelected(selected)
    }, [visible])

    return (
        <>
            <Modal
                animationType='slide'
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.container}>
                    <View style={{marginHorizontal: '5%'}}>
                        <View style={styles.titleContainer}>
                            <AppHeaderText style={styles.title}>{title}</AppHeaderText>
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
                    </View>
                        <ScrollView style={{height: windowHeight - 140}}>
                            {dataList}
                        </ScrollView>
                    <View style={{marginHorizontal: '5%'}}>
                        <View style={styles.buttonContainer}>
                            <Button 
                                style={styles.button}
                                action={() => {
                                    setSelected(tempSelected)
                                    setVisible(false)
                                }}
                                text={buttonText}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 'auto',
        height: '100%',
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
    listItem: {
        height: 50, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonContainer: {
        height: 85, 
        backgroundColor: COLORS.white,
        justifyContent: 'center'
    },
    button: {
        position: 'absolute',
        width: '100%',
    }
})