import { actions } from './constants'

const getDecks = decks => ({ payload: decks, type: actions.DECKS_GET_ALL })

const addDeck = deck => ({ payload: deck, type: actions.DECKS_SAVE })

const addQuestion = params => ({ payload: params, type: actions.DECKS_ADD_QUESTION })

export { addDeck, addQuestion, getDecks }
