/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
  LogBox,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import uuid from 'react-native-uuid'

LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
  'Non-serializable values were found in the navigation state',
  'source.uri should not be an empty string'
])

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from'@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreen from 'react-native-splash-screen'

import Context from './components/Context'
import MyRecipesScreen from './screens/MyRecipesScreen'
import RecipeScreen from './screens/RecipeScreen'
import RecipeMakerScreen from './screens/RecipeMakerScreen'
import RecipeEditorScreen from './screens/RecipeEditorScreen'

import COLORS from './assets/colors/colors'

const Stack = createNativeStackNavigator();

const key = 'recipeData'

const loadData = async (setData) => {
  try {
    AsyncStorage.getItem(key).then(jsonValue => {
      if (jsonValue != null) {
        setData(JSON.parse(jsonValue))
      }
    })
  } catch(e) {
    alert(e)
  }
}

const saveData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    alert(e)
  }
}

const NAMESPACE = '58f8c3cd-58c4-4907-b11d-2f980c52cbb1'
const NAME = 'recipe'

const App = () => {
  StatusBar.setBackgroundColor(COLORS.white)
  StatusBar.setBarStyle('dark-content', true)

  const [recipeData, setRecipeData] = React.useState([])

  const addRecipe = (recipe) => {
    setRecipeData(prevData => {
      const id = uuid.v5(uuid.v4(), NAMESPACE+NAME)
      const newData = [...prevData, {...recipe, id: id}]
      saveData(newData)
      return newData
    })
  }
  
  const deleteRecipe = (id) => {
    setRecipeData(prevData => {
      const newData = prevData.filter((item) => (item.id != id))
      saveData(newData)
      return newData
    })
  }
  
  const editRecipe = (id, updatedRecipe) => {
    setRecipeData(prevData => {
      const newData = prevData.map((item) => (item.id === id ? {...updatedRecipe, id: id} : item))
      saveData(newData)
      return newData
    })
  }

  const restoreBackup = (backupRecipeData) => {
    setRecipeData(backupRecipeData)
    saveData(backupRecipeData)
  }

  React.useEffect(() => {
    loadData(setRecipeData)
    SplashScreen.hide()
  }, [])

  return (
    <Context.Provider value={recipeData}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator 
          initialRouteName="My Recipes"
          screenOptions={{
            headerTintColor: '#2B283A', 
            headerTitleStyle: styles.headerTitle,
            headerLeftContainerStyle: { margin: 100 },
            headerTitleAlign: {}
          }}
        >
          <Stack.Screen name="My Recipes">
            {
              (props) => 
              <MyRecipesScreen 
                addRecipe={addRecipe}
                editRecipe={editRecipe}
                deleteRecipe={deleteRecipe}
                restoreBackup={restoreBackup}
                navigation={props.navigation}
              />
            }
          </Stack.Screen>
          <Stack.Screen 
            name="Recipe" 
            component={RecipeScreen}
            options={({ route }) => ({ title: route.params.name })}
          />
          <Stack.Screen name="Create new recipe" component={RecipeMakerScreen}/>
          <Stack.Screen name="Edit recipe" component={RecipeEditorScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 19,
  }
});

export default App;
