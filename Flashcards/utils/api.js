import { AsyncStorage } from 'react-native'

export function saveDeckTitle (title) {
  const newDeck = { title: title, questions: []};
  return AsyncStorage.setItem(title, JSON.stringify(newDeck));
}
