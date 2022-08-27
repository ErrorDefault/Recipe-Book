import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'

import IconContainer from './IconContainer'
import AppEmphasisText from './AppEmphasisText'
import AppHeaderText from './AppHeaderText'

import COLORS from '../assets/colors/colors'

export default function TextInputList(props) {
    const {value, setValue, placeholder = "", multiline = false, title = '' } = props 
    const [newItem, onChangeNewItem] = React.useState("")
    const [reorderMode, setReorderMode] = React.useState(false)

    React.useEffect(() => {
        if(value.length === 0)
            setReorderMode(false)
    }, [value.length === 0])
    
    const moveItemUp = (index) => {
        if (index > 0)
            setValue(prevList => (
                [...prevList.slice(0, index-1), 
                    prevList[index], 
                    prevList[index-1], 
                    ...prevList.slice(index+1)]
            ))
    }

    const moveItemDown = (index) => {
        if (index < (value.length - 1))
            setValue(prevList => (
                [...prevList.slice(0, index),
                    prevList[index+1],
                    prevList[index],
                    ...prevList.slice(index+2)]
            ))
    }

    const inputList = value.map((item, index, list) => (
        <View style={styles.inputContainer} key={index}>
            <TextInput
                style={[styles.input, styles.listInput, 
                    index < (list.length - 1) ? {borderBottomWidth: 1} : null, 
                    index === 0 ? {borderTopLeftRadius: 5, borderTopRightRadius: 5} : null,
                    index === (list.length - 1) ? {borderBottomLeftRadius: 5, borderBottomRightRadius: 5} : null,
                    reorderMode ? {paddingRight: 76} : null
                ]}
                blurOnSubmit={true}
                multiline={multiline}
                placeholderTextColor={COLORS.lightBlue}
                selectionColor={COLORS.darkBlue}
                onChangeText={(text) => {
                    setValue(prevList => (
                        [...prevList.slice(0, index), text, ...prevList.slice(index+1)]
                    ))
                }}
                onEndEditing={(event) => {
                    if (event.nativeEvent.text.trim().length === 0) 
                        setValue(prevList => [...prevList.slice(0, index), ...prevList.slice(index+1)])
                }}
                value={item}
            />
            {
                reorderMode
                ? <>
                    <IconContainer 
                        style={[styles.iconContainer, styles.downIconContainer]} 
                        size={35}
                        onPress={() => moveItemDown(index)}
                    >
                        <Icon
                            name={"downcircle"}
                            size={20} 
                            color={COLORS.lightBlue}
                        />
                    </IconContainer>

                    <IconContainer 
                        style={[styles.iconContainer, styles.upIconContainer]} 
                        size={35}
                        onPress={() => moveItemUp(index)}
                    >
                        <Icon
                            name={"upcircle"}
                            size={20} 
                            color={COLORS.lightBlue}
                        />
                    </IconContainer>
                </>
                : <IconContainer 
                    style={[styles.iconContainer, styles.removeIconContainer]} 
                    size={35}
                    onPress={() => setValue(prevList => [...prevList.slice(0, index), ...prevList.slice(index+1)])}
                >
                    <Icon
                        name={"closecircle"}
                        size={20} 
                        color={COLORS.lightBlue}
                    />
                </IconContainer>
            }
        </View>
    ))
    
    return (
        <View style={[styles.container, props.style]}>
            <View style={{marginBottom: 5, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <AppHeaderText>
                        {title}
                    </AppHeaderText>
                {
                    value.length > 0
                    ? <TouchableOpacity 
                        style={styles.toggleModeTextContainer}
                        onPress={reorderMode
                            ? () => setReorderMode(false)
                            : () => setReorderMode(true)
                        }
                    >
                        <AppEmphasisText>{reorderMode ? 'Done' : 'Reorder'}</AppEmphasisText>
                    </TouchableOpacity>
                    : null
                }
            </View>
            {   value.length > 0
                ? <View style={styles.list}>
                    {inputList}
                </View>
                : null
            }
            <View>
                <TextInput 
                    style={[styles.input, styles.newInput]}
                    blurOnSubmit={true}
                    multiline={multiline}
                    onChangeText={onChangeNewItem}
                    value={newItem}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.lightBlue}
                    selectionColor={COLORS.darkBlue}
                    /*onSubmitEditing={(event) => {
                        event.persist()
                        setValue(prevList => (
                            event.nativeEvent.text.length === 0
                            ? prevList
                            : [...prevList, event.nativeEvent.text]
                        ))
                        onChangeNewItem('')
                    }}*/
                />
                {
                    newItem.trim().length > 0
                    ? <IconContainer 
                        style={[styles.iconContainer, styles.addIconContainer]} 
                        size={35}
                        onPress={() => {
                            setValue(prevList => [...prevList, newItem])
                            onChangeNewItem('')
                        }}
                    >
                        <Icon
                            name={"pluscircle"}
                            size={20} 
                            color={COLORS.red}
                        />
                    </IconContainer>
                    : null
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    list: {
        borderRadius: 5,
        borderColor: COLORS.lightBlue,
        marginBottom: 10, 
        borderWidth: 1
    },
    inputContainer: {
        width: '100%',
        height: 'auto'
    },
    input: {
        height: 'auto',
        borderColor: COLORS.lightBlue,
        backgroundColor: COLORS.transparent,
        padding: 8,
        paddingRight: 43.5,
        color: COLORS.darkBlue,
        fontSize: 15,
        fontFamily: 'Inter-Regular'
    }, 
    listInput: {
        borderWidth: 0
    },
    iconContainer: {
        position: 'absolute',
        backgroundColor: COLORS.transparent
    },
    addIconContainer: {
        top: 5.5, right: 5
    },
    removeIconContainer: {
        top: 4, right: 4,
    },
    downIconContainer: {
        top: 4, right: 4,
    },
    upIconContainer: {
        top: 4, right: 36.5,
    },
    toggleModeTextContainer: {
        fontFamily: 'Inter-Medium'
    },
    newInput: {
        borderWidth: 1,
        borderRadius: 5,
    }
})