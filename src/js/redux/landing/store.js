import { createStore } from 'redux';
import rootReducer from './reducers';
import initialState from '../../data/landing';

const reduxStore = createStore(rootReducer, initialState);
export default reduxStore;
