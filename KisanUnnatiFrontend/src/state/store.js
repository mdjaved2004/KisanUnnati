import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from './Auth/Reducer';
// import { CartReducer } from './Cart/Reducer';
// import { orderReducer } from './Order/Reducer';
// import { CustomerProductReducer } from './Product/Reducer';

const rootReducers = combineReducers({
   auth: authReducer,
    // product: CustomerProductReducer,
    //   cart: CartReducer,
    //   order: orderReducer
})

 export const store = legacy_createStore(rootReducers , applyMiddleware(thunk));