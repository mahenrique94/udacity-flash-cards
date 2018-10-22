import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'

import i18n from '../../_translate/i18n'

import { addQuestion } from '../../decks/actions'

import { addQuestion as addQuestionAPI } from '../api'

import { colors } from '../../helpers/colors'

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 20
    },
    input: {
        borderColor: '#7f7f7f',
        borderWidth: 1,
        height: 56,
        padding: 12,
        margin: 16,
        width: 300
    },
    submitButton: {
        backgroundColor: colors.text,
        height: 44,
        padding: 12
    },
    submitText: {
        color: colors.default,
        fontSize: 22,
        textAlign: 'center'
    },
});

class Question extends Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired
    }

    state = {
        answer: '',
        question: '',
    }

    render() {
        const {question, answer} = this.state;

        return (
            <KeyboardAvoidingView style={style.container}>
                <Text>{ i18n.t('labels.question') }</Text>
                <TextInput
                    onChangeText={ this.handleQuestionChange }
                    style={ style.input }
                    value={ question }
                />
                <Text>{ i18n.t('labels.answer') }</Text>
                <TextInput
                    onChangeText={ this.handleAnswerChange }
                    style={ style.input }
                    value={ answer }
                />
                <TouchableOpacity
                    onPress={ this.submitQuestion }
                    style={ style.submitButton }
                >
                    <Text style={ style.submitText }>{ i18n.t('buttons.save') }</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }

    handleQuestionChange = question => this.setState({ question })

    handleAnswerChange = answer => this.setState({ answer })

    submitQuestion = () => {
        const { navigation } = this.props
        const { answer, question } = this.state
        const { questions, title } = navigation.state.params
        const params = { title, questions, question, answer }

        if (question === '') {
            Alert.alert('Important', i18n.t('notifications.questionRequired'))
            return
        }

        if (answer === '') {
            Alert.alert('Important', i18n.t('notifications.answerRequired'))
            return
        }

        this.props.dispatch(addQuestion(params))
        addQuestionAPI({
            card: { question, answer },
            deckName: title
        })

        Alert.alert('Successful', i18n.t('notifications.api.question.saved'), [ { text: i18n.t('buttons.ok'), onPress: () => this.props.navigation.goBack() } ] )
    }

}

export default Question
