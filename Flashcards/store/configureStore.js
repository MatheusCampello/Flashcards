import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
	return createStore(
		reducer,
		initialState,
		compose(applyMiddleware(thunk))
	);
}
