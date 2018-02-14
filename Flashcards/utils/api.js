import { AsyncStorage } from 'react-native'

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
  return AsyncStorage.getItem('Flashcards:deck')
  // return AsyncStorage.clear();
  // return AsyncStorage.getAllKeys((err, keys) => {
  //   AsyncStorage.multiGet(keys, (err, decks) => {
  //     decks.map((result, i, deck) => {
  //       let key = deck[i][0]
  //       let value = deck[i][1]
  //     });
  //   });
  // });
  // let deckList = []
  // const keys = AsyncStorage.getAllKeys()
  // AsyncStorage.getAllKeys((err, keys) => {
  //   keys.forEach((key) => {
  //     const data = AsyncStorage.getItem(key);
  //     deckList.push(data);
  //   });
  // });
  // return deckList
  // const data = {
  //   JavaScript: {
  //     title: 'JavaScript',
  //     questions: [
  //       {
  //         question: 'What is a closure?',
  //         answer: 'The combination of a function and the lexical environment within which that function was declared.'
  //       }
  //     ]
  //   }
  // }

}

export function getDeck(title) {
  return AsyncStorage.getItem('Flashcards:deck')
}

export function saveDeckTitle (title) {
  const newDeck = { title: title, questions: []};
  return AsyncStorage.setItem('Flashcards:deck', JSON.stringify(newDeck));
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem('Flashcards:deck')
    .then((result) => {
      const data = JSON.parse(result);
      data['questions'].push(card);
      AsyncStorage.setItem('Flashcards:deck', JSON.stringify(data));
    });
}
