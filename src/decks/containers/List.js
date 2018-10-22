import { connect } from 'react-redux'

import { getDecks as getDecksAction } from '../actions'

import { getDecks } from '../selectors'

import List from '../screens/List'

const mapStateToProps = state => ({
    decks: getDecks(state)
})

const mapDispatchToProps = dispatch => ({
    getDecks: () => dispatch(getDecksAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
