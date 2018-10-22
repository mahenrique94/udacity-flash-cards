import { actions } from './constants';

const reducers = (state = {}, { payload, type }) => {

    switch (type) {
        case actions.DECKS_GET_ALL:
            return { ...state, ...payload }
        case actions.DECKS_SAVE:
            return { ...state, ...payload }
        case actions.DECKS_ADD_QUESTION:
            const { answer, questions, question, title } = payload
            const newQuestions = JSON.parse(JSON.stringify(questions)).concat([ { question, answer } ])
            return {
                ...state,
                [title]: { ...state[title], questions: newQuestions }
            }
        default:
            return state
    }

}

export { reducers }
