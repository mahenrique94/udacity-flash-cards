import { connect } from 'react-redux'

import { getDecks } from '../selectors'

import Form from '../screens/Form'

const mapStateToProps = state => ({
    decks: getDecks(state)
})

export default connect(mapStateToProps)(Form)
