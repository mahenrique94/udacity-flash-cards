import React, { Component } from 'react'

import i18n from '../../_translate/i18n'

import { colors } from '../../helpers/colors'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const styles = StyleSheet.create({
    details: {
        flex: 1,
        paddingTop: 20
    },
    detailsActions: {
        margin: 24
    },
    detailsAdd: {
        backgroundColor: colors.default,
        borderRadius: 7,
        marginBottom: 16,
        padding: 10
    },
    detailsAddCardTitle: {
        color: colors.text,
        fontSize: 22,
        textAlign: 'center',
    },
    detailsCards: {
        color: colors.text,
        fontSize: 22,
        marginTop: 12,
        marginBottom: 32
    },
    detailsInfo: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    detailsQuizTitle: {
        color: colors.default,
        fontSize: 22,
        textAlign: 'center',
    },
    detailsStartQuiz: {
        backgroundColor: colors.text,
        borderRadius: 2,
        padding: 10,
    },
    detailsTitle: {
        color: colors.text,
        fontSize: 36
    }
})

class Details extends Component {

    render() {
        const { navigation, decks } = this.props
        const { title } = navigation.state.params
        const questions = decks[title] && decks[title].questions

        return (
            <View style={ styles.details }>
                <View style={ styles.detailsInfo }>
                    <Text style={ styles.detailsTitle }>{ title }</Text>
                    <Text style={ styles.detailsCards }>{ `${questions.length} ${i18n.t('labels.cards')}` }
                    </Text>
                </View>
                <View style={ styles.detailsActions }>
                    <TouchableOpacity
                        onPress={ () => navigation.navigate('Question', { title, questions }) }
                        style={ styles.detailsAdd }
                    >
                        <Text style={ styles.detailsAddCardTitle }>{ i18n.t('buttons.addCard') }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={ () => navigation.navigate('Quiz', { title, questions }) }
                        style={ styles.detailsStartQuiz }
                    >
                        <Text style={ styles.detailsQuizTitle }>{ i18n.t('buttons.startQuiz') }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Details
