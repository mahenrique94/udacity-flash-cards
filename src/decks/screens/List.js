import PropTypes from 'prop-types'
import React, { Component } from 'react'
import sortBy from 'sort-by'

import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'

import { getAll } from '../api'

import Deck from '../components/Deck'

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'row',
        height: Dimensions.get('window').height
    },
})

class List extends Component {

    static propTypes = {
        decks: PropTypes.PropTypes.object,
        getDecks: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired
    }

    componentDidMount() {
        const { getDecks } = this.props
        getDecks()

        getAll().then(decks => getDecks(decks))
    }

    render() {
        const { decks } = this.props
        return (
            <View style={ styles.deck }>
                <FlatList
                    data={ Object.values(decks).sort(sortBy('title')) }
                    keyExtractor={ (_, index) => `list-item-${index}` }
                    renderItem={ this.renderDeck }
                />
            </View>
        )
    }

    renderDeck = ({ item }) => {
        const { navigation } = this.props
        return  (
            <View style={ styles.item }>
                <TouchableOpacity onPress={ () => navigation.navigate('Details', item) }>
                    <Deck questions={ item.questions } title={ item.title }/>
                </TouchableOpacity>
            </View>
        )
    }


}

export default List
