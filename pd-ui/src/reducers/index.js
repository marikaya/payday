import {combineReducers} from 'redux'
import basketReducer from './basket.reducer';
import dataReducer from "./data.reducer";
import loginReducer from "./login.reducer";

const RootReducer = combineReducers({
    auth: loginReducer,
    data: dataReducer,
    basket: basketReducer
})

export default RootReducer