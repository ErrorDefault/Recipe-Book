import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Share from 'react-native-share';

import BackButton from '../components/BackButton'
import ShareButton from '../components/ShareButton'
import Context from '../components/Context'
import Recipe from '../components/Recipe'

import { formatTime } from '../functions/Utils'

import COLORS from '../assets/colors/colors'

export default function RecipeScreen({route, navigation}) {
    const recipeData = React.useContext(Context)
    const recipe = recipeData[recipeData.findIndex(item => (item.id === route.params.id))]
    const message = 
`
--- ${recipe.name} ---

${recipe.description}

Servings: ${recipe.servings === 0 ? '-' : recipe.servings}
Prep Time: ${formatTime(recipe.prepHours, recipe.prepMinutes)}
Cook time: ${formatTime(recipe.cookHours, recipe.cookMinutes)}

--- Ingredients ---
${recipe.ingredients.map((element) => (`•   ${element}`)).join(`
`)}

--- Instructions ---
${recipe.steps.map((element, index) => (`${index+1}.  ${element}`)).join(`
`)}

--- Cookware ---
${recipe.cookware.map((element) => (`•   ${element}`)).join(`
`)}

Made with Recipe Book
`

    React.useEffect(() => {
        navigation.setOptions({ title: recipe.name })
        navigation.setOptions({
            headerLeft: () => (
                <BackButton
                    action={() => navigation.goBack()}
                />
            ),
            headerRight: () => (
                <ShareButton
                    action={() => {
                        
                        Share.open(
                            recipe.imageUri
                            ? {
                                message: message,
                                url: recipe.imageUri
                            }
                            : {
                                message: message
                            }
                        ).then((res) => {
                            
                        })
                        .catch((err) => {
                            
                        })
                    }}
                />
            )
        })
    }, [navigation, recipeData])

    return (
        <>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{uri: recipe.imageUri}}
                    />
                </View> 
                <View style={styles.container}>
                    <Recipe {...recipe}/>
                </View>
            </ScrollView>
            <TouchableHighlight 
                style={styles.editButtonContainer} 
                underlayColor={COLORS.white}
                onPress={() => {
                    navigation.navigate('Edit recipe', {
                        ...recipe,
                        editRecipe: route.params.editRecipe
                    })
                }}
            >
                <View style={styles.editButton}>
                    <Icon 
                        name={'pencil'} 
                        size={30} 
                        color={COLORS.white}
                    />
                </View>
            </TouchableHighlight>
        </>
                
    )
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 250,
        backgroundColor: COLORS.lightGrey
    },
    iconContainer: {
        marginHorizontal: '5%',
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover'
    },
    container: {
        marginHorizontal: '5%',
        marginBottom: windowWidth * .24
    },
    editButtonContainer: {
        position: 'absolute',
        bottom: windowWidth / 20,
        right: '5%',
        width: windowWidth * .14,
        height: windowWidth * .14,
        borderRadius: 50,
        elevation: 8,
        shadowColor: COLORS.red
    },
    editButton: {
        borderRadius: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.red
    },
})