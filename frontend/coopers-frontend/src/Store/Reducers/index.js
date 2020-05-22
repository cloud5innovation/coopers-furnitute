import productReducer from "./productsReducer";
import {combineReducers} from "redux";

export default combineReducers({
    product:  productReducer,
}); 