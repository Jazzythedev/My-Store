/* purpose of this action. It is a function that, once called, (recieved a req for products) dispatches the requeset for a reducer to pick it up and change the loading to true. THe action then makes an axios call to get products from the DB. It then dispatches anoter call to say product list success, passes the data as a payload, if it fails howerver, we will have a trycatch with a third dispatch 'product list fail' from the action along with an error message as the payload. */

import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants"   /* import the commands */                 
import axios from 'axios'     /* import it bc we are making axios calls */
 



export const listProducts = () => async (dispatch) => {                     /* THIS IS THE FIRST FUNCTION WE HAVE WRITTEN IN THE ACTION. call a funtion listProducts with no parameters, it doesnt need any. Make it asyncronous, and use the dispatch command within react to allows actions to dispatch. Async will dispatch..*/
    try{                                                                        /* try catch to catch errors */
        dispatch({                                                                            /* dispatch calls must have type of dispatch call that is made and then payload */
            type: PRODUCT_LIST_REQUEST                                            /* No payload required here   */
            });
        const {data} = await axios.get('/api/products')                              /* make axios call and put results in a variable called data. This call is taken away from home screen and is located here now */
                                                                                    /* products list received and then make another dispatch call to say.. */
        dispatch({
            type: PRODUCT_LIST_SUCCESS,                                                /* this call says that product list was acquired and passes the product list that was stored in the data variable. */
            payload: data  

        })
    
    }
    catch (error) {}
        dispatch({                                           /* This call is dispatched if product list retrieval is a failure, and the dispatch will send an action type product list fail, and pass the error as payload */
            type: PRODUCT_LIST_FAIL,
            payload:                                                /* To avoid displaying all of the data that comes along with an error message, do a simple if statement. The condition is as follows: is there a response property inside the error object? if there is, does the response property hava data that has a message in it? if so then the errr is in error.response.data.message(This error comes from the backend). otherwise pick up the error.message(This error comes from the frontend) message */
                error.response && error.response.data.message  ? error.response.data.message : error.message
        })                                                                           
}  

export const listProductDetails = (id) => async (dispatch) => {             /* THIS IS THE second FUNCTION WE HAVE WRITTEN IN THE ACTION. call a funtion listProductsDetails with one parameter, the ID(This means you fetching product details from a single specific product in the list.). Make it asyncronous, and use the dispatch command within react to allows actions to dispatch. Async will dispatch..*/
    try{                                                                        /* try catch to catch errors */
        dispatch({
            type: PRODUCT_DETAILS_REQUEST                                       /* No payload required here   */
        })
        const {data} = await axios.get(`/api/products/${id}`)                      /* make axios call and put results in a variable called data. This call is taken away from product screen and is located here now */

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,                                           /* this call says that product list was acquired and passes the product list that was stored in the data variable. */
            payload: data
        })
    } catch (error) {
        dispatch({                                                          /* This call is dispatched if product list details retrieval is a failure, and the dispatch will send an action type product list fail, and pass the error as payload */
            type: PRODUCT_DETAILS_FAIL,
             /* To avoid displaying all of the data that comes along with an error message, do a simple if statement. The condition is as follows: is there a response property inside the error object? if there is, does the response property hava data that has a message in it? if so then the errr is in error.response.data.message(This error comes from the backend). otherwise pick up the error.message(This error comes from the frontend) message */
            payload: error.response && error.response.data.message  ? error.response.data.message : error.message    
        })
}

}