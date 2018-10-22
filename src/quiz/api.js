import { DB_NAME } from '../constants/storage'

import { AsyncStorage } from 'react-native'

const addQuestion = ({card, deckName}) =>
    AsyncStorage.getItem(DB_NAME, (_, result) => {
        const decks = JSON.parse(result)
        const newQuestions = JSON.parse(JSON.stringify(decks[deckName].questions))
        const value = JSON.stringify({ [deckName]: { title: deckName, questions: newQuestions } })

        newQuestions[newQuestions.length] = card
        AsyncStorage.mergeItem(DB_NAME, value)
    })

export { addQuestion }
