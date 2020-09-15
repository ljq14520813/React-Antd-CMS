import {createStore,combineReducers,applyMiddleware} from 'redux';
import todoReducer from './reducers/todoReducer';
import goodReducer from './reducers/goodReducer';
import userReducer from './reducers/userReducer';

//  中间件，用于支持异步的action
import thunk from 'redux-thunk';

const reducer = combineReducers({
    todo:todoReducer,
    good:goodReducer,
    user:userReducer
})

const store=createStore(reducer,applyMiddleware(thunk));
// console.log(store);

export default store;