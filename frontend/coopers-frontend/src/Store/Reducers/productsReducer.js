import { productsTypes } from '../Actions/ActionTypes';

const initialState = {
    products: [],
    error: false,
    errorMsg: null,
    loading: false
}

export default (state = initialState, actions) => {
    console.log("products: ",state.products)
    switch (actions.type) {
        case productsTypes.ADD_PRODUCT_START:
            return {
                ...state,
                loading: true,
            }
        case productsTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case productsTypes.ADD_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: actions.payload
            }
        case productsTypes.GET_PRODUCT_START:
            return {
                ...state,
                loading: true,
            }
        case productsTypes.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: actions.payload,
            }
        case productsTypes.GET_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: actions.payload
            }
        default:
            return state;
    };
    
};