import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import { StyleSheet, Text, View } from 'react-native'

import i18n from '../../_translate/i18n'

import { not } from '../../utils/functions'

import { colors } from '../../helpers/colors'

import If from '../../components/If'

const styles = StyleSheet.create({
    deck: {
        alignItems: 'center',
        backgroundColor: colors.default,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 25,
        padding: 35
    },
    deckTitle: {
        fontSize: 24,
        marginBottom: 10
    },
    deckInfo: {
        color: colors.textAlt,
        fontSize: 15
    }
})

const Deck = ({ questions, title }) => (
    <View style={ styles.deck }>
        <Text style={ styles.deckTitle }>{ title }</Text>
        <Text style={ styles.deckInfo }>
            <If condition={ not(_.isEmpty(questions)) } el={ i18n.t('labels.noCards') }>
                { `${questions.length} ${i18n.t('labels.cards')}` }
            </If>
        </Text>
    </View>
)

Deck.propTypes = {
    questions: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
}

export default Deck
