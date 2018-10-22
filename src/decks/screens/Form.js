import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import i18n from '../../_translate/i18n'

import { save } from '../api'

import { addDeck } from '../actions'

import { colors } from '../../helpers/colors'

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 20
    },
    input: {
        backgroundColor: colors.default,
        borderColor: colors.default,
        borderWidth: 1,
        height: 44,
        margin: 24,
        padding: 8,
        width: 300
    },
    submitButton: {
        backgroundColor: colors.text,
        height: 44,
        padding: 10
    },
    submitText: {
        color: colors.default,
        fontSize: 22,
        textAlign: 'center'
    }
})

class Form extends Component {

    static propTypes = {
        decks: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired
    }

    state = {
        text: ''
    }

    render() {
        return (
            <View style={ style.container }>
                <Text style={ { fontSize: 28 } }>{ i18n.t('titles.form') }</Text>
                <TextInput
                    onChangeText={ this.handleInputChange  }
                    style={ style.input }
                    value={ this.state.text }
                />
                <TouchableOpacity
                    onPress={ this.addNewDeck }
                    style={ style.submitButton }
                >
                    <Text style={ style.submitText }>{ i18n.t('buttons.save') }</Text>
                </TouchableOpacity>

            </View>
        )
    }

    handleInputChange = text => this.setState({ text })

    addNewDeck = () => {
        const entry = this.state;
        const { decks, navigation } = this.props;

        if (!entry.text) {
            Alert.alert(i18n.t('notifications.nameRequired'))
        } else {
            if (decks[entry.text]) {
                Alert.alert(i18n.t('notifications.nameExists'))
            } else {
                const newDeck = { [entry.text]: { title: entry.text, questions: [] } }

                this.props.dispatch(addDeck(newDeck))
                save(newDeck);

                Alert.alert(
                    'Done',
                    i18n.t('notifications.api.deck.saved'),
                    [ { text: i18n.t('buttons.ok'), onPress: () => navigation.navigate('List', { title: entry.text, questions: [] }) } ]
                )

                this.setState({ text: '' })
            }
        }
    }

}

export default Form
