import React from 'react'
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'

import BackButton from '../components/BackButton'
import CheckButton from '../components/CheckButton'
import Editor from '../components/Editor'
import PopupMenu from '../components/PopupMenu'

export default function RecipeMakerScreen({route, navigation}) {
    const {addRecipe} = route.params
    const [name, onChangeName] = React.useState("")
    const [description, onChangeDescription] = React.useState("")
    const [imageUri, setImageUri] = React.useState("") 
    const [servings, setServings] = React.useState(0)
    const [ingredients, setIngredients] = React.useState([])
    const [steps, setSteps] = React.useState([])
    const [cookware, setCookware] = React.useState([])
    const [prepHours, setPrepHours] = React.useState(0)
    const [prepMinutes, setPrepMinutes] = React.useState(0)
    const [cookHours, setCookHours] = React.useState(0)
    const [cookMinutes, setCookMinutes] = React.useState(0)
    const [restrictions, setRestrictions] = React.useState([])

    const [alertVisible, setAlertVisible] = React.useState(false)

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                setAlertVisible(true)
                return true
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress)

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress)
        }, [])
    )

    const callback = () => {
        addRecipe({
            name: name.trim(),
            description: description.trim(),
            servings: servings,
            imageUri: imageUri,
            ingredients: ingredients,
            steps: steps,
            cookware: cookware,
            prepHours: prepHours,
            prepMinutes: prepMinutes,
            cookHours: cookHours,
            cookMinutes: cookMinutes,
            restrictions: restrictions
        })
        navigation.goBack()
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (<BackButton action={() => setAlertVisible(true)}/>)
        })
    }, [navigation])

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (<CheckButton action={callback}/>)
        })
    }, [callback])

    const [scrollOffsetY, setScrollOffsetY] = React.useState(0)

    const handleScroll = (event) => {
        setScrollOffsetY(event.nativeEvent.contentOffset.y)
    }

    return (
        <ScrollView onScroll={handleScroll} keyboardShouldPersistTaps='handled'>
            <View style={styles.container}>
                <Editor
                    name={name}
                    onChangeName={onChangeName}
                    description={description}
                    onChangeDescription={onChangeDescription}
                    imageUri={imageUri}
                    setImageUri={setImageUri}
                    servings={servings}
                    setServings={setServings}
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                    steps={steps}
                    setSteps={setSteps}
                    cookware={cookware}
                    setCookware={setCookware}
                    prepHours={prepHours}
                    setPrepHours={setPrepHours}
                    prepMinutes={prepMinutes}
                    setPrepMinutes={setPrepMinutes}
                    cookHours={cookHours}
                    setCookHours={setCookHours}
                    cookMinutes={cookMinutes}
                    setCookMinutes={setCookMinutes}
                    restrictions={restrictions}
                    setRestrictions={setRestrictions}
                    callback={callback}
                    callbackText="Save Recipe"
                    scrollOffsetY={scrollOffsetY}
                />
            </View>
            <PopupMenu
                visible={alertVisible}
                setVisible={setAlertVisible}
                title='Leave this page?'
                message="Your recipe won't be saved."
                cancelAction={() => setAlertVisible(false)}
                confirmAction={() => {
                    setAlertVisible(false)
                    navigation.goBack()
                }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: '5%',
    }
})