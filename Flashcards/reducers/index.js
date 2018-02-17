import { LOAD_DECKS_SUCCESS, ADD_DECK_SUCCESS } from '../actions'
import initialState from './initialState';

function deckList (state = initialState.decks, action) {
  switch (action.type) {
    case LOAD_DECKS_SUCCESS :
      return [...action.decks];
    case ADD_DECK_SUCCESS :
      return [...state, action.deck];
    default :
      return state
  }
}

export default deckList
