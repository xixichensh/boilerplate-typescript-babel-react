import { combineReducers } from 'redux';
import appReducer from './appReducer';
import indexReducer from './indexReducer';

export default combineReducers({
    app: appReducer,
    index: indexReducer
});
