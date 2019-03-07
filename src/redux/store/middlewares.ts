import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

let middleWare = applyMiddleware(thunk);
export default middleWare;
