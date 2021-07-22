import reducerBasket from "./reducerBasket";
import isLogged from "./isLogged"
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    reducerBasket,isLogged
})

export default allReducers;