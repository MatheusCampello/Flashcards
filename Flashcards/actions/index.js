import { getDecks, saveDeckTitle } from '../utils/api';

export const LOAD_DECKS_SUCCESS = 'LOAD_DECKS_SUCCESS'
export const ADD_DECK_SUCCESS = 'ADD_DECK_SUCCESS'
export const LOAD_DECK_SUCCESS = 'LOAD_DECK_SUCCESS'
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS'

export function loadDecksSuccess (decks) {
  return {
    type: LOAD_DECKS_SUCCESS,
    decks,
  }
}

// export function addDeckSuccess (deck) {
//   return {
//     type: ADD_DECK_SUCCESS,
//     deck,
//   }
// }

export function loadDecks() {
  return dispatch => {
    getDecks()
      .then(decks => {
        if(!decks) {
          const de = []
          dispatch(loadDecksSuccess(de))
        } else {
          const de = JSON.parse(decks)
          dispatch(loadDecksSuccess(de))
        }
      })
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK_SUCCESS,
    deck,
  }
}

export function addCard (deckTitle, card) {
  return {
    type: ADD_CARD_SUCCESS,
    deckTitle,
    card,
  }
}
