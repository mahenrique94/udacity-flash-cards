import { connect } from 'react-redux'

import { getDecks } from '../../decks/selectors'

import Question from '../screens/Question'

const mapStateToProps = state => ({
    decks: getDecks(state)
})

export default connect(mapStateToProps)(Question)
