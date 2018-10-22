import React from 'react'

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import i18n from '../_translate/i18n'

import { colors } from '../helpers/colors'

import { FontAwesome, Ionicons } from '@expo/vector-icons'

import DecksDetails from '../decks/containers/Details'
import DecksForm from '../decks/containers/Form'
import DecksList from '../decks/containers/List'

import Question from '../quiz/containers/Question'
import Quiz from '../quiz/containers/Quiz'

const tabNavigationConfig = {
    tabBarOptions: {
        activeTintColor: colors.primary,
        style: {
            backgroundColor: colors.default,
            shadowColor: 'rgba(0, 0, 0, .1)',
            shadowOpacity: .75
        }
    }
}

const routeConfig = {
    List: {
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons color={ tintColor } name="ios-bookmarks" size={ 30 }/>,
            tabBarLabel: i18n.t('labels.allDecks')
        },
        screen: DecksList
    },
    Form: {
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <FontAwesome color={ tintColor } name="plus-square" size={ 30 }/>,
            tabBarLabel: i18n.t('labels.addNewDeck')
        },
        screen: DecksForm
    },
}

const Tabs = createBottomTabNavigator(routeConfig, tabNavigationConfig)

const Navigation = createStackNavigator({
    Home: { screen: Tabs },
    Details: {
        navigationOptions: { headerTintColor: colors.text },
        screen: DecksDetails
    },
    Question: {
        navigationOptions: { headerTintColor: colors.text },
        screen: Question
    },
    Quiz: {
        navigationOptions: { headerTintColor: colors.text },
        screen: Quiz
    },

})

export default Navigation
