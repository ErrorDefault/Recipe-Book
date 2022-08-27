import React from 'react'
import { Dimensions, Image, Modal, Pressable, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Menu, Provider } from 'react-native-paper'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

import AppEmphasisText from './AppEmphasisText'
import AppHeaderText from './AppHeaderText'
import IconContainer from './IconContainer'
import Counter from './Counter'
import TextInputList from './TextInputList'
import SetTimeModal from './SetTimeModal'
import Button from './Button'

import { formatTime } from '../functions/Utils'

import COLORS from '../assets/colors/colors'

const options = {
    mediaType: 'photo',
    saveToPhotos: true
}

const windowHeight = Dimensions.get('window').height

export default function Editor(props) {
    const {
        name, 
        onChangeName,
        description,
        onChangeDescription,
        imageUri, 
        setImageUri, 
        servings, 
        setServings, 
        ingredients,
        setIngredients,
        steps,
        setSteps,
        cookware,
        setCookware,
        prepMinutes,
        setPrepMinutes,
        prepHours,
        setPrepHours,
        cookMinutes,
        setCookMinutes,
        cookHours,
        setCookHours,
        callback,
        callbackText,
        scrollOffsetY=0
    } = props

    const [prepModalVisible, setPrepModalVisible] = React.useState(false)

    const [cookModalVisible, setCookModalVisible] = React.useState(false)

    const [showMenu, setShowMenu] = React.useState(false)
    const [menuAnchor, setMenuAnchor] = React.useState({ x: 0, y: 0 })

    const setImage = (action) => {
        action(options).then(response => {
            if(!(response.errorCode || response.didCancel)) {
                setImageUri(response.assets[0].uri)
            }
        })
    }

    const openMenu = () => setShowMenu(true)
    const closeMenu = () => setShowMenu(false)

    const anchorMenu = (event) => {
        const { nativeEvent } = event
        const anchor = {
            x: nativeEvent.pageX,
            y: nativeEvent.pageY + scrollOffsetY - windowHeight / 10
        }

        setMenuAnchor(anchor)
        openMenu()
    }

    return(
        <Provider>
            <>
                <AppHeaderText style={styles.text}>Recipe Name</AppHeaderText>
                <TextInput 
                    style={[styles.input, styles.sectionEnd]}
                    onChangeText={onChangeName}
                    value={name}
                    placeholder="Give your recipe a name"
                    placeholderTextColor={COLORS.lightBlue}
                    selectionColor={COLORS.darkBlue}
                />
                
                <AppHeaderText style={styles.text}>Description</AppHeaderText>
                <TextInput 
                    style={[styles.input, styles.sectionEnd, {height: 'auto'}]}
                    multiline={true}
                    onChangeText={onChangeDescription}
                    value={description}
                    placeholder="Write a brief description of your recipe"
                    placeholderTextColor={COLORS.lightBlue}
                    selectionColor={COLORS.darkBlue}
                />

                <AppHeaderText style={styles.text}>Add Photo</AppHeaderText>
                {
                    imageUri
                    ? <Pressable onPress={anchorMenu}>
                        <View style={[styles.imageContainer, styles.sectionEnd]}>
                            <Image 
                                style={styles.image}
                                source={{uri: imageUri}}
                            />
                            <IconContainer 
                                style={styles.edit}
                                onPress={anchorMenu}
                            >
                                <MaterialCommunityIcon 
                                    name={"pencil"}
                                    size={24}
                                    color={COLORS.white}
                                />
                            </IconContainer>
                            <IconContainer 
                                style={styles.trash} 
                                onPress={() => setImageUri("")}
                            >
                                <MaterialCommunityIcon 
                                    name={"trash-can"}
                                    size={24}
                                    color={COLORS.white}
                                />
                            </IconContainer>
                        </View>
                    </Pressable>
                    : <TouchableHighlight 
                        underlayColor={COLORS.white}
                        style={[styles.sectionEnd, styles.imagePromptContainer]}
                        onPress={anchorMenu}
                    >
                        <View style={[styles.imagePrompt, {borderRadius: 5}]}>
                            <MaterialIcon
                                name={"add-photo-alternate"} 
                                size={40} 
                                color={COLORS.red}
                            />
                        </View>
                    </TouchableHighlight>
                    
                }
                <Menu
                    visible={showMenu}
                    onDismiss={closeMenu}
                    anchor={menuAnchor}
                >
                    <Menu.Item 
                        icon="camera"
                        titleStyle={styles.menuText}
                        onPress={() => {
                            setImage(launchCamera)
                            closeMenu()
                        }}
                        title="Take a photo" 
                    />
                    <Menu.Item 
                        icon="image"
                        titleStyle={styles.menuText}
                        onPress={() => {
                            setImage(launchImageLibrary)
                            closeMenu()
                        }}
                        title="Choose from library"
                    />
                </Menu>

                <TextInputList 
                    style={[styles.list, styles.sectionEnd]} 
                    value={ingredients} setValue={setIngredients} 
                    placeholder="Add an ingredient here"
                    placeholderTextColor={COLORS.lightBlue}
                    selectionColor={COLORS.darkBlue}
                    title='Ingredients'
                />
                
                <TextInputList 
                    style={[styles.list, styles.sectionEnd]} 
                    value={steps} setValue={setSteps} 
                    placeholder="Add a step here" 
                    multiline={true}
                    placeholderTextColor={COLORS.lightBlue}
                    selectionColor={COLORS.darkBlue}
                    title='Instructions'
                />

                <TextInputList 
                    style={[styles.list, styles.sectionEnd]} 
                    value={cookware} 
                    setValue={setCookware} 
                    placeholder="Add cookware here"
                    placeholderTextColor={COLORS.lightBlue}
                    selectionColor={COLORS.darkBlue}
                    title='Cookware'
                />

                <AppHeaderText style={styles.text}>Servings</AppHeaderText>
                <Counter style={[styles.counter, styles.sectionEnd]} value={servings} setValue={setServings} min={0} max={99}/>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={prepModalVisible || cookModalVisible}
                >
                    <View style={{height: '100%', backgroundColor: COLORS.transparentLightGrey}}></View>
                </Modal>

                <AppHeaderText style={styles.text}>Prep Time</AppHeaderText>
                <TouchableOpacity 
                    style={[styles.sectionEnd, {marginTop: 0, alignSelf: 'flex-start'}]} 
                    onPress={() => setPrepModalVisible(true)}
                >
                    <AppEmphasisText>
                        {
                            prepHours > 0 || prepMinutes > 0 
                            ? formatTime(prepHours, prepMinutes)
                            : 'Set time'
                        }
                    </AppEmphasisText>
                </TouchableOpacity> 

                <SetTimeModal
                    visible={prepModalVisible}
                    setVisible={setPrepModalVisible}
                    hours={prepHours}
                    setHours={setPrepHours}
                    minutes={prepMinutes}
                    setMinutes={setPrepMinutes}
                    title="Set Prep Time"
                />

                <AppHeaderText style={styles.text}>Cook Time</AppHeaderText>
                <TouchableOpacity 
                    style={[styles.sectionEnd, {marginTop: 0, alignSelf: 'flex-start'}]} 
                    onPress={() => setCookModalVisible(true)}
                >
                    <AppEmphasisText>
                        {
                            cookHours > 0 || cookMinutes > 0 
                            ? formatTime(cookHours, cookMinutes)
                            : 'Set time'
                        }
                    </AppEmphasisText>
                </TouchableOpacity> 

                <SetTimeModal
                    visible={cookModalVisible}
                    setVisible={setCookModalVisible}
                    hours={cookHours}
                    setHours={setCookHours}
                    minutes={cookMinutes}
                    setMinutes={setCookMinutes}
                    title="Set Cook Time"
                /> 

                <Button style={{marginVertical: 5}} action={callback} text={callbackText}/>
                
            </>
        </Provider>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 5,
    },
    sectionEnd: {
        marginTop: 5,
        marginBottom: 15
    },
    input: {
        height: 'auto',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.lightBlue,
        backgroundColor: COLORS.transparent,
        padding: 8,
        color: COLORS.darkBlue,
        fontSize: 15,
        fontFamily: 'Inter-Regular'
    },
    counter: {
    }, 
    list: {
    },
    imageContainer: {
        borderRadius: 5,
        height: 175
    },
    edit: {
        position: 'absolute',
        bottom: 5,
        left: 5
    },
    trash: {
        position: 'absolute',
        bottom: 5,
        right: 5
    }, 
    imagePromptContainer: {
        borderWidth: 1, 
        borderRadius: 5, 
        borderColor: COLORS.lightBlue, 
        backgroundColor: COLORS.lightGrey
    },
    imagePrompt: {
        height: 100,
        borderRadius: 5,
        backgroundColor: COLORS.transparent,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 175,
        borderRadius: 5,
        resizeMode: 'cover'
    },
    menuText: {
        fontSize: 15,
        fontFamily: 'Inter-Regular',
        color: COLORS.darkBlue
    }
})
