import { connect } from 'react-redux'

import { getDecks } from '../selectors'

import Details from '../screens/Details'

const mapStateToProps = state => ({
    decks: getDecks(state)
})

export default connect(mapStateToProps)(Details)
