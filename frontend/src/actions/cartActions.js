/* actions make an axios call to get products from the DB  here we also learn how to add infomation into local storage. CART INFO IS BEING WRITTEN INTO REDUX AND LOCAL */

import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants"

export const addToCart = (id, qty) => async (dispatch, getState)=>                           /* GETSTATE HOOK GOES TO REDUX STORE AND GRABS STATE INFO FOR YOU */
    {
    const {data} = await axios.get(`/api/products/${id}`)                           /* api that brings back product info. to be stored in variable called data. make axios call to the route. store return in var called data.  */
     
    dispatch ({                                                             /* dispatch calls must have type of dispatch call that is made and then payload */
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,                                  /* these are the infos we want to display in shopping cart from the data instead of all product info.  */
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))                                    /* THIS IS HOW YOU ADD INFO INTO YOUR LOCAL STORAGE. keeps data alive as longs as browser is still open.  include key that was made in store.js "cartItems'. call the getState function to go to redux and grab existing cart for you. .cart is the friendly name for the cartreducer. cartItems is needed also bec it has the latest item that was added, we want all of it. convert all this to a string as local storage stores in strings.  use the json lib which has a stringhfy that converts a json object into a string. this will now be stored in local storage. to see what is in the local storage open chrome broswer and under the application tab right side under local storage. dropdown to the localstorage with the port number. local storage will not be wiped if you close the window. you need to reboot your system for it to disappear. or clear cache.*/

    }

export const removeFromCart = (id) => (dispatch, getState) => {                             /* When removing an item from the cart, remove from redux store. look in cartReducers to see what removing an item does. */
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id                                                                                 /* the ID is the identifying parameter showing waht is not going to be copied over, hence deleted. */
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))                                    /* Once you have deleted from redux, you can add the updated array to local storage to show updated cart after removing what you didnt want. THIS IS HOW YOU ADD INFO INTO YOUR LOCAL STORAGE. keeps data alive as longs as browser is still open.  include key that was made in store.js "cartItems'. call the getState function to go to redux and grab existing cart for you. .cart is the friendly name for the cartreducer. cartItems is needed also bec it has the latest item that was added, we want all of it. convert all this to a string as local storage stores in strings.  use the json lib which has a stringhfy that converts a json object into a string. this will now be stored in local storage.*/

}

export const saveShippingAddress = (data) => (dispatch) => 
{
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })
    localStorage.setItem('shippingAddress', JSON.stringify
    (data))
}


export const savePaymentMethod = (data) => (dispatch) => 
{
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })
    localStorage.setItem('paymentMethod', JSON.stringify
    (data))
}