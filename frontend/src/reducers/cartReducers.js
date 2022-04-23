import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

export const cartReducer = (state = {cartItems : []}, action) => {                                                                                          /* empty array default written into redux store.  pass action */
    switch(action.type){
        case CART_ADD_ITEM:
         const item = action.payload                                                                                           /* payload to include item name and quantity, */
    
         const existItem = state.cartItems.find((x) => x.product === item.product)                                                   /* to allow a user to add more of the same item to their cart later without it registering as a new line item, do the following. check the existing item. go to the state and look at cartitems array and find for every product x check the prodcu name, is it equal to item product that is coming in through the payload? if it does, increase the quantity. return by making copy of state and then update the card items array  */
        
         if (existItem){                                                                                            /* if it does, increase the quantity.  */
            return {
                ...state,                                                                                               /* return by making copy of state and then update the card items that was selected.  */
                 cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)                                                          /*  go to the actual cartitems array and update it. look thorugh it. for every item in it check doe sthe product match the exist item? if it does replace with the new item that contains updated qty, otherwise keep the existing qty*/            
            }
         } else {                                                                                                /* if product was not found in cart. this is addin new prodcut to cart. */
            return {
                ...state,                                       /* takes a copy of current state which includes reviews, cart items etc . this copy in this case includes the cartItems array */
                cartItems: [...state.cartItems, item]                                   /*  copy of array of current items in cart and add an item to it. */
            }
         }
        case CART_REMOVE_ITEM:
         return {
            ...state,
            cartItems: state.cartItems.filter((x) => x.product !== action.payload),         /* filter to find items that do not match the payload. */
         }

       case CART_SAVE_SHIPPING_ADDRESS:
           return {
               ...state,
               shippingAddress: action.payload
           }  

       case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }     
    default:
        return state
    
   
    
    
        }

}