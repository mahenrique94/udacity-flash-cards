import { DB_NAME } from '../constants/storage'

import { AsyncStorage } from 'react-native'

const getAll = () => AsyncStorage.getItem(DB_NAME).then(results => JSON.parse(results))

const save = deck => AsyncStorage.mergeItem(DB_NAME, JSON.stringify(deck))

export { getAll, save }
