import React from 'react'
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'

import BackButton from '../components/BackButton'
import CheckButton from '../components/CheckButton'
import Editor from '../components/Editor'
import PopupMenu from '../components/PopupMenu'

export default function RecipeEditorScreen({route, navigation}) {
    const {id, editRecipe} = route.params
    const [name, onChangeName] = React.useState(route.params.name)
    const [description,  onChangeDescription] = React.useState(route.params.description)
    const [imageUri, setImageUri] = React.useState(route.params.imageUri) 
    const [servings, setServings] = React.useState(route.params.servings)
    const [ingredients, setIngredients] = React.useState(route.params.ingredients)
    const [steps, setSteps] = React.useState(route.params.steps)
    const [cookware, setCookware] = React.useState(route.params.cookware)
    const [prepHours, setPrepHours] = React.useState(route.params.prepHours)
    const [prepMinutes, setPrepMinutes] = React.useState(route.params.prepMinutes)
    const [cookHours, setCookHours] = React.useState(route.params.cookHours)
    const [cookMinutes, setCookMinutes] = React.useState(route.params.cookMinutes)
    const [restrictions, setRestrictions] = React.useState(route.params.restrictions ? route.params.restrictions : [])

    const [alertVisible, setAlertVisible] = React.useState(false)

    const hasUnsavedChanges = () => (
        !(
            name.trim() === route.params.name &&
            description.trim() === route.params.description &&
            imageUri === route.params.imageUri &&
            servings === route.params.servings &&
            JSON.stringify(ingredients) === JSON.stringify(route.params.ingredients) &&
            JSON.stringify(steps) === JSON.stringify(route.params.steps) &&
            JSON.stringify(cookware) === JSON.stringify(route.params.cookware) &&
            prepHours === route.params.prepHours &&
            prepMinutes === route.params.prepMinutes &&
            cookHours === route.params.cookHours &&
            cookMinutes === route.params.cookMinutes &&
            JSON.stringify(restrictions) === JSON.stringify(route.params.restrictions ? route.params.restrictions : [])
        )
    )

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (hasUnsavedChanges()) {
                    setAlertVisible(true)
                    return true
                } else
                    return false
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress)

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress)
        }, [hasUnsavedChanges()])
    )

    const callback = () => {
        editRecipe(id, {
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
            headerLeft: () => (
                <BackButton
                    action={() => {
                        if (hasUnsavedChanges())
                            setAlertVisible(true)
                        else
                            navigation.goBack()
                    }}
                />
            )
        })
    }, [navigation, hasUnsavedChanges()])

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
                    callbackText="Save Changes"
                    scrollOffsetY={scrollOffsetY}
                />
            </View>
            <PopupMenu
                visible={alertVisible}
                setVisible={setAlertVisible}
                title='Leave this page?'
                message="You have unsaved changes."
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
    },
})

