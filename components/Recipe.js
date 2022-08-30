import React from 'react'
import { StyleSheet, View } from 'react-native'

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
                        {formatTime(props.prepHours, props.prepMinutes, abbreviated=true)}
                    </AppEmphasisText>
                </View>
                <View style={styles.statsContainer}>
                    <AppHeaderText style={styles.centerText}>Cook Time</AppHeaderText>
                    <AppEmphasisText style={[styles.stats, styles.centerText]}>
                        {formatTime(props.cookHours, props.cookMinutes, abbreviated=true)}
                    </AppEmphasisText>
                </View>
            </Section>   

            {
                props.description
                ? <AppText style={styles.descriptionText}>{props.description}</AppText>
                : <></>
            }  

            <Section>
                <List data={props.ingredients} listTitle='Ingredients'/>
            </Section>

            <Section>
                <List data={props.steps} listTitle='Instructions' numbered={true}/>
            </Section>

            <Section>
                <List data={props.cookware} listTitle='Cookware'/>
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
