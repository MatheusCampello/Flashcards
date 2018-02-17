import { AsyncStorage } from 'react-native'

export const flashcards = 'Flashcards:deck'

export function getDecks() {
  // return AsyncStorage.getAllKeys()
  const data = [
    {
      title: 'React',
      questions: [
        {
          question: 'What is react?',
          answer: 'A Library for managing user interfaces'
        }
      ]
    },
    {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  ]
  // const newDeck = { title: 'React', questions: []};
  // return AsyncStorage.setItem('Flashcards:deck', JSON.stringify(data))
  return AsyncStorage.getItem(flashcards)
  // return AsyncStorage.clear();

}

export function getDeck(title) {
  return AsyncStorage.getItem('Flashcards:deck')
}

export function saveDeckTitle (newDeck) {
  return AsyncStorage.getItem(flashcards)
    .then((results) => {
      let data = JSON.parse(results);
      if (data.find(el => {return el.title === newDeck.title}) === undefined) {
        data.push(newDeck)
        AsyncStorage.setItem('Flashcards:deck', JSON.stringify(data))
      }
    });
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem('Flashcards:deck')
    .then((result) => {
      const data = JSON.parse(result);
      data['questions'].push(card);
      AsyncStorage.setItem('Flashcards:deck', JSON.stringify(data));
    });
}
