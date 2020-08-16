import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './index';
 
// Note: this API requires redux@>=3.1.0
// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    )
}