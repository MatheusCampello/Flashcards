import { LOAD_DECKS_SUCCESS, ADD_DECK_SUCCESS, ADD_CARD_SUCCESS } from '../actions'
import initialState from './initialState';

function deckList (state = initialState.decks, action) {
  switch (action.type) {
    case LOAD_DECKS_SUCCESS:
      return [...action.decks];
    case ADD_DECK_SUCCESS:
      return [...state, action.deck];
    case ADD_CARD_SUCCESS:
      return state.map(deck => {
        if(deck.title === action.deckTitle) {
          deck.questions.push(action.card)
          return {...deck}
        } else {
          return deck
        }
      });
    default :
      return state
  }
}

export default deckList
