import React, { Component } from 'react'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { View } from 'react-native'

import { reducers } from '../decks/reducers'

import Navigation from '../_config/routes.js'

import { init } from '../utils/notifications'

class Root extends Component {

    componentDidMount() {
        init()
    }

    render() {
        return (
            <Provider store={ createStore(reducers) }>
                <View style={ { flex: 1 } }>
                    <Navigation/>
                </View>
            </Provider>
        )
    }

}

export default Root
