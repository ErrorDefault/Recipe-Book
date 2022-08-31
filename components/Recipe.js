import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import AppText from './AppText'
import AppHeaderText from './AppHeaderText'
import AppEmphasisText from './AppEmphasisText'
import List from './List'

import { formatTime } from '../functions/Utils'

import COLORS from '../assets/colors/colors'

const Section = (props) => (
    <View style={[styles.section, props.style]}>
        {props.children}
    </View>
)



export default function Recipe(props) {
    // enum('ingredients', 'instructions', 'cookware')
    const [selectedSection, setSelectedSection] = React.useState('ingredients')

    return (
        <View style={[styles.container, props.style]}>    
            <Section style={styles.recipeInfo}>
                <View style={styles.statsContainer}>
                    <AppHeaderText style={styles.centerText}>Servings</AppHeaderText>
                    <AppEmphasisText style={[styles.stats, styles.centerText]}>{props.servings === 0 ? '-' : props.servings}</AppEmphasisText>
                </View>
                <View style={styles.statsContainer}>
                    <AppHeaderText style={styles.centerText}>Prep Time</AppHeaderText>
                    <AppEmphasisText style={[styles.stats, styles.centerText]}>
                        {formatTime(props.prepHours, props.prepMinutes, true)}
                    </AppEmphasisText>
                </View>
                <View style={styles.statsContainer}>
                    <AppHeaderText style={styles.centerText}>Cook Time</AppHeaderText>
                    <AppEmphasisText style={[styles.stats, styles.centerText]}>
                        {formatTime(props.cookHours, props.cookMinutes, true)}
                    </AppEmphasisText>
                </View>
            </Section>   

            {
                props.description
                ? <View style={{paddingBottom: 20, borderBottomWidth: 0.5, borderBottomColor: COLORS.lightBlue}}>
                    <AppText style={styles.descriptionText}>{props.description}</AppText>
                </View>  
                : <></>
            }  

            <Section style={{marginTop: 0}}>
                <View style={styles.sectionBar}>
                    <Pressable 
                        style={[styles.sectionBarHeader, 
                            selectedSection === 'ingredients' 
                            ? styles.sectionBarHeaderSelected 
                            : styles.sectionBarHeaderNotSelected
                        ]}
                        android_ripple={{
                            color: COLORS.lightGrey,
                        }}
                        onPress={() => setSelectedSection('ingredients')}
                    >
                        <AppEmphasisText 
                            style={{color: selectedSection === 'ingredients' ? COLORS.darkBlue : COLORS.lightBlue}}
                        >
                            Ingredients
                        </AppEmphasisText>
                    </Pressable>
                    <Pressable 
                        style={[styles.sectionBarHeader, 
                            selectedSection === 'instructions' 
                            ? styles.sectionBarHeaderSelected 
                            : styles.sectionBarHeaderNotSelected
                        ]}
                        android_ripple={{
                            color: COLORS.lightGrey,
                        }}
                        onPress={() => setSelectedSection('instructions')}
                    >
                        <AppEmphasisText 
                            style={{color: selectedSection === 'instructions' ? COLORS.darkBlue : COLORS.lightBlue}}
                        >
                            Instructions
                        </AppEmphasisText>
                    </Pressable>
                    <Pressable 
                        style={[styles.sectionBarHeader, 
                            selectedSection === 'cookware' 
                            ? styles.sectionBarHeaderSelected 
                            : styles.sectionBarHeaderNotSelected
                        ]}
                        android_ripple={{
                            color: COLORS.lightGrey,
                        }}
                        onPress={() => setSelectedSection('cookware')}
                    >
                        <AppEmphasisText 
                            style={{color: selectedSection === 'cookware' ? COLORS.darkBlue : COLORS.lightBlue}}
                        >
                            Cookware
                        </AppEmphasisText>
                    </Pressable>
                </View>
            </Section>
            
            <Section style={{marginTop: 20}}>
                {
                    selectedSection === 'ingredients'
                    ? <List data={props.ingredients}/>
                    : selectedSection === 'instructions' 
                        ? <List data={props.steps} numbered={true}/>
                        : <List data={props.cookware}/>
                }
            </Section>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    centerText: {
        textAlign: 'center'
    },
    recipeInfo: {
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderColor: COLORS.lightBlue,
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    statsContainer: {
        alignItems: 'center',
        maxWidth: '33.33%'
    },
    stats: {
        color: COLORS.darkBlue
    },
    sectionBar: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    sectionBarHeader: {
        paddingTop: 10,
        paddingBottom: 10,
        maxWidth: '33.33%',
        flex: 1,
        borderBottomWidth: 0.5,
        alignItems: 'center'
    },
    sectionBarHeaderSelected: {
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.red
    },
    sectionBarHeaderNotSelected: {
        borderBottomColor: COLORS.lightBlue
    },
    sectionBarHeaderTitle: {
        color: COLORS.darkBlue
    },
    section: {
        marginTop: 10,
    },
    sectionTitle: {
        lineHeight: 40,
    },
    descriptionText: {
        marginTop: 20,
        color: COLORS.darkBlue
    },
})
