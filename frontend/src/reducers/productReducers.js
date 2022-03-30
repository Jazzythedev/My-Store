//reducers are special funtions that read and write data in to a redux store. The parameters it takes includes current state and action(type of keyword). //
//FOR PRODUCTLISTREDUCER: First, a call is dispatched (product list req). Product list reducer picks up the req and sets a loading flag to true. The homescreen will read taht the loading is true, and then show a loading icon. Once the homescreen is loaded, useeffect kicks in and dispatches a call to the product list action with a keyword/code. THe Product list action makes am api call to retrieve the data from the DB. once the data is back, product list action makes a second call saying product list success and also passes data from DB. Product list reducer picks up on this and sets the loading flag to false, and adds the product list ot the redux store. Home screen removes "loading"icon since its now false and displays data from the redux store.Data is now available globally to all components.//
//As soon as a user clicks to enter the homescreen, the redux store will be filled with data//
//When an action is triggerd, (payload)data is passed as well as a type of action(keyword [EG.productlistrequest]).
/* Reducers recieve state(data) + action. EG. Type of action is product list req, product list success, and product list fail. */
//reducers are woken up when create store fucntion is fired! Upon waking, every reducer passes an action type "initialize"  which is the default state. This returns the current state to the store.//

import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants";

export const productListReducer = (state = {products: []},                    /* this is a funtion called productListReducer.Its task is to retrieve the list of products form the DB. This function/reducer has two parameters. pass the state and what action you want to do. Action has a property called type which tells you what keyword you just received. This reducers resp. is to store products in the store, and it is an empty array to begin with since we are waiting for the data to come through. */
 action) => {
    switch (action.type) {                                          /* switch is a simple if statement, these are the type of actions/code words recieved   */
        case PRODUCT_LIST_REQUEST:                                  /* These are imported constants. When we see this code word, then someting needs to be done */
            return {loading: true, products: []}                                                  /* This is what happens when we see Product list request. return the loading flag to true(triggers loading icon) and set product array to empty. */
        case PRODUCT_LIST_SUCCESS:                                   /* These are imported constants. When we see this code word, then someting needs to be done */
            return {loading: false, products: action.payload}      /* return loading to false. action includes type and payload.   */
        case PRODUCT_LIST_FAIL:                                     /* These are imported constants. When we see this code word, then someting needs to be done */
            return {loading: false, error: action.payload}            /* set loading to false, instead of product, property called error. payload will contain error, not products. error message wil be written into json and displayed on screen. */
        default:                                                /*  if none of the above, return current state(empty product array) to redux store. Return from reducer means data is returned to store.*/
            return state
    }
}

export const productDetailsReducer = (state = { product: {reviews: []} },  /* refer to the above notes to apply the same understanding. in regards to the reviews part: reviews are something that updates/changes as people submit new reviews, the reducer is 'fetching' the current state - the product with however many reviews it has at that time */
action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state}                   /* '...' allows you to copy all or part of an existing array or object into another array or object */
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state

    }
}
