import React from 'react'
import { Dimensions, FlatList, Modal, StyleSheet, TextInput, ToastAndroid, TouchableHighlight, TouchableOpacity, View } from 'react-native'

import EntypoIcon from 'react-native-vector-icons/Entypo'
import FeatherIcon from 'react-native-vector-icons/Feather'
import IonIcon from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker'
import { Menu, Provider } from 'react-native-paper'
import { useHeaderHeight } from '@react-navigation/elements'
import Share from 'react-native-share'
import base64 from 'react-native-base64'
import { pickSingle } from 'react-native-document-picker'

import BackupButton from '../components/BackupButton'
import Context from '../components/Context'
import AppText from '../components/AppText'
import RecipeCard from '../components/RecipeCard'
import IconContainer from '../components/IconContainer'
import BackupModal from '../components/BackupModal'
import PopupMenu from '../components/PopupMenu'
import ChecklistModal from '../components/ChecklistModal'

import COLORS from '../assets/colors/colors'
import RESTRICTIONS from '../assets/values/restrictions'

const isValidRecipeData = (recipeData) => (
    Array.isArray(recipeData) &&
    recipeData.every(recipe => (
        recipe.hasOwnProperty('name') && typeof recipe.name === 'string' &&
        recipe.hasOwnProperty('description') && typeof recipe.description === 'string' &&
        recipe.hasOwnProperty('servings') && typeof recipe.servings === 'number' && 0 <= recipe.servings && recipe.servings <= 99 &&
        recipe.hasOwnProperty('imageUri') && typeof recipe.imageUri === 'string' &&
        recipe.hasOwnProperty('ingredients') && Array.isArray(recipe.ingredients) && recipe.ingredients.every(ingredient => (typeof ingredient === 'string')) &&
        recipe.hasOwnProperty('steps') && Array.isArray(recipe.steps) && recipe.steps.every(step => (typeof step === 'string')) &&
        recipe.hasOwnProperty('cookware') && Array.isArray(recipe.cookware) && recipe.cookware.every(item => (typeof item === 'string')) &&
        recipe.hasOwnProperty('prepHours') && typeof recipe.prepHours === 'number' && 0 <= recipe.prepHours && recipe.prepHours <= 23 &&
        recipe.hasOwnProperty('prepMinutes') && typeof recipe.prepMinutes === 'number' && 0 <= recipe.prepMinutes && recipe.prepMinutes <= 59 &&
        recipe.hasOwnProperty('cookHours') && typeof recipe.cookHours === 'number' && 0 <= recipe.cookHours && recipe.cookHours <= 23 &&
        recipe.hasOwnProperty('cookMinutes') && typeof recipe.cookMinutes === 'number' && 0 <= recipe.cookMinutes && recipe.cookMinutes <= 59 &&
        recipe.hasOwnProperty('restrictions') ? (Array.isArray(recipe.restrictions) && recipe.restrictions.every(restriction => (typeof restriction === 'string'))) : true
    ))
)

export default function MyRecipesScreen({navigation, addRecipe, editRecipe, deleteRecipe, restoreBackup}) {
    const recipeData = React.useContext(Context)

    const headerHeight = useHeaderHeight();

    const [searchKey, onChangeSearchKey] = React.useState('')

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('new')
    const [items, setItems] = React.useState([
        {label: 'Newest', value: 'new'},
        {label: 'Oldest', value: 'old'},
        {label: 'Alphabetical', value: 'alphabetical'}
    ])
    const [showMenu, setShowMenu] = React.useState(false);
    const [menuAnchor, setMenuAnchor] = React.useState({ x: 0, y: 0 })
    const [menuId, setMenuId] = React.useState(0);
    const [deleteAlertVisible, setDeleteAlertVisible] = React.useState(false)

    const openMenu = () => setShowMenu(true);
    const closeMenu = () => setShowMenu(false);

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <BackupButton
                    action={() => {
                        setOpen(false)
                        setBackupModalVisible(true)
                    }}
                />
            )
        })
    }, [navigation, recipeData])

    const [backupRecipeData, setBackupRecipeData] = React.useState([])
    const [backupModalVisible, setBackupModalVisible] = React.useState(false)
    const [backupAlertVisible, setBackupAlertVisible] = React.useState(false)

    const [restrictionsModalVisible, setRestrictionsModalVisible] = React.useState(false)
    const [filters, setFilters] = React.useState([])

    const filterSearch = (data) => (
        data.filter(recipe => 
            recipe.name.toLowerCase().includes(searchKey.trim().toLowerCase()) && filters.every(filter => (recipe.restrictions ? recipe.restrictions : []).includes(filter))
        )
    )

    const sortSearch = (data, sortBy) => (
        sortBy === 'old'
        ? data
        : value === 'new'
            ? data.reverse()
            : data.sort(compareRecipeNames)
    )

    const compareRecipeNames = (a, b) => {
        if(a.name.toLowerCase() < b.name.toLowerCase())
            return -1
        else if(b.name.toLowerCase() < a.name.toLowerCase())
            return 1
        return 0
    }

    const renderItem =  ({ item, index })  => {
        return ( 
            <View style={styles.item} key={index}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Recipe', {
                            ...item,
                            editRecipe: editRecipe
                        })
                        setOpen(false)
                    }}
                >
                    <RecipeCard
                        key={index}
                        {...item}
                    /> 
                </TouchableOpacity>
                <IconContainer
                    style={styles.dotsContainer}
                    onPress={(event) => {
                        const { nativeEvent } = event
                        const anchor = {
                            x: nativeEvent.pageX,
                            y: nativeEvent.pageY - windowHeight / 15
                        }
                        setOpen(false)
                        setMenuId(item.id)
                        setMenuAnchor(anchor)
                        openMenu()
                    }}
                >
                    <EntypoIcon
                        name={"dots-three-vertical"} 
                        size={24} 
                        color={COLORS.white}
                    />
                </IconContainer>
            </View>
        )
    }

    const AddButton = () => (
        <TouchableHighlight 
            style={styles.addButtonContainer} 
            underlayColor={COLORS.white}
            onPress={() => {
                navigation.navigate('Create new recipe', { addRecipe: addRecipe})
                setOpen(false)
            }}
        >
            <View style={styles.addButton}>
                <FeatherIcon 
                    name={"plus"} 
                    size={30} 
                    color={COLORS.white}
                />
            </View>
        </TouchableHighlight>
    )

    return (
        <Provider>
            <View style={[styles.container, {height: windowHeight - headerHeight}]}>
                {
                    recipeData.length > 0
                    ?
                    <View>
                        <TextInput 
                            style={[styles.input]}
                            onChangeText={onChangeSearchKey}
                            value={searchKey}
                            placeholder="Search recipes"
                            placeholderTextColor={COLORS.lightBlue}
                            selectionColor={COLORS.darkBlue}
                            onFocus={() => setOpen(false)}
                            onPressIn={() => setOpen(false)}
                        />
                        <IconContainer
                            style={styles.searchIcon}
                            size={45}
                        >
                            <IonIcon
                                name={'search'}
                                size={20}
                                color={COLORS.lightBlue}
                            />
                        </IconContainer>
                        <IconContainer
                            style={styles.filterIcon}
                            size={45}
                            onPress={() => {
                                setOpen(false)
                                setRestrictionsModalVisible(true)
                            }}
                        >
                            <IonIcon
                                name={'ios-filter'}
                                size={20}
                                color={filters.length > 0 ? COLORS.red : COLORS.lightBlue}
                            />
                        </IconContainer>
                        <View style={styles.dropDownContainer}>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                style={{borderWidth: 0}}
                                textStyle={{fontSize: 15, fontFamily: 'Inter-Regular', color: COLORS.darkBlue}}
                                disableBorderRadius={true}
                                closeOnBackPressed={true}
                                dropDownContainerStyle={{borderWidth: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, elevation: 5}}
                                arrowIconStyle={{tintColor: COLORS.darkBlue}}
                                tickIconStyle={{tintColor: COLORS.darkBlue}}
                                closeIconStyle={{tintColor: COLORS.darkBlue}}
                            />
                        </View>
                        <FlatList
                            style={styles.list}
                            data={sortSearch(filterSearch(recipeData), value)}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            horizontal={false}
                            numColumns={2}
                            contentContainerStyle={{ paddingTop: windowWidth / 20, paddingBottom: windowWidth * .24 + 95}}
                        />

                        <Menu
                            visible={showMenu}
                            onDismiss={closeMenu}
                            anchor={menuAnchor}
                        >
                            <Menu.Item 
                                icon="pencil"
                                titleStyle={styles.menuText}
                                onPress={() => {
                                    closeMenu()
                                    navigation.navigate('Edit recipe', {
                                        ...recipeData[recipeData.findIndex((item) => (item.id === menuId))], 
                                        id: menuId, 
                                        editRecipe: editRecipe
                                    })
                                }}
                                title="Edit recipe" 
                            />
                            <Menu.Item 
                                icon="trash-can"
                                titleStyle={styles.menuText}
                                onPress={() => {
                                    closeMenu()
                                    setDeleteAlertVisible(true)
                                }} 
                                title="Delete recipe"
                            />
                        </Menu>
                        <PopupMenu
                            visible={deleteAlertVisible}
                            setVisible={setDeleteAlertVisible}
                            title='Delete recipe?'
                            message='You cannot undo this action.'
                            cancelAction={() => setDeleteAlertVisible(false)}
                            confirmAction={() => {
                                deleteRecipe(menuId)
                                setDeleteAlertVisible(false)
                            }}
                        />
                    </View>
                    : 
                    <View style={[styles.container, styles.centerView]}>
                        <View style={{width: '90%'}}>
                            <AppText style={[styles.centerText, {fontSize: 17, fontFamily: 'Inter-SemiBold'}]}>
                                Looks like you don't have any recipes.
                            </AppText>
                            <AppText style={[styles.centerText, {color: COLORS.lightBlue}]}>
                                Tap the red button below to create a recipe!
                            </AppText>
                        </View>
                    </View>
                }

                <AddButton/>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={backupModalVisible}
                >
                    <View style={{height: '100%', backgroundColor: COLORS.transparentLightGrey}}></View>
                </Modal>

                <BackupModal
                    visible={backupModalVisible}
                    setVisible={setBackupModalVisible}
                    exportAction={() => {
                        Share.open({
                            url: `data:text/plain;base64,${base64.encode(JSON.stringify({recipeData: recipeData}))}`,
                            filename: `Recipe Book Backup - ${new Date().toDateString()}`
                        }).then((response) => {
                            setBackupModalVisible(false)
                        })
                        .catch((error) => {
                            
                        })
                    }}
                    importAction={() => {
                        pickSingle({
                            type: 'text/plain'
                        })
                        .then((response) => {
                            var RNFS = require('react-native-fs')
                            RNFS.readFile(response.uri, 'base64')
                            .then((data) => {
                                var readData = JSON.parse(base64.decode(data))
                                if(readData.hasOwnProperty('recipeData') && isValidRecipeData(readData.recipeData)) {
                                    setBackupRecipeData(readData.recipeData)
                                    setBackupAlertVisible(true)
                                } else {
                                    ToastAndroid.show('Invalid data.', ToastAndroid.SHORT)
                                }
                            })
                            setBackupModalVisible(false)
                        })
                        .catch((error) => {

                        })
                    }}
                />
                
                <PopupMenu
                    visible={backupAlertVisible}
                    setVisible={setBackupAlertVisible}
                    title='Restore backup?'
                    message='This will override all your current recipes.'
                    cancelAction={() => setBackupAlertVisible(false)}
                    confirmAction={() => {
                        restoreBackup(backupRecipeData)
                        closeMenu()
                        setBackupAlertVisible(false)
                    }}
                />

                <ChecklistModal
                    visible={restrictionsModalVisible}
                    setVisible={setRestrictionsModalVisible}
                    data={RESTRICTIONS}
                    selected={filters}
                    setSelected={setFilters}
                    title='Filters'
                    buttonText={'Apply'}
                />
            </View>
        </Provider>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: COLORS.white
    },
    input: {
        marginTop: windowWidth / 20,
        marginHorizontal: '5%',
        height: 45,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: COLORS.lightBlue,
        backgroundColor: COLORS.transparent,
        paddingVertical: 8,
        paddingHorizontal: 40,
        color: COLORS.darkBlue,
        fontSize: 15,
        fontFamily: 'Inter-Regular'
    },
    searchIcon: {
        position: 'absolute', 
        left: windowWidth / 20, 
        top: windowWidth / 20,
        backgroundColor: COLORS.transparent
    },
    filterIcon: {
        position: 'absolute', 
        right: windowWidth / 20, 
        top: windowWidth / 20,
        backgroundColor: COLORS.transparent
    },
    dropDownContainer: {
        marginHorizontal: '5%',
        height: 50
    },
    list: {
        height: '100%'
    },
    item: {
        width: '42.5%',
        marginLeft: '5%',
        marginBottom: '5%',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 5,
        shadowColor: COLORS.darkBlue
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: windowWidth / 20,
        right: '5%',
        width: windowWidth * .14,
        height: windowWidth * .14,
        borderRadius: 50,
        elevation: 8,
        shadowColor: COLORS.red
    },
    addButton: {
        borderRadius: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.red
    },
    dotsContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    menuText: {
        fontSize: 15,
        fontFamily: 'Inter-Regular',
        color: COLORS.darkBlue
    },
    centerView: {
        height: '100%', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    centerText: {
        textAlign: 'center'
    }
})