{/* this is a temporary store in your browser used by your apploication alone. */}/* The whole redux process is happening in the browser window of the user, as they go though the website and access information, redux store is created on their local browser. Each respective client thats browsing in the website gets memory taken on their browser for reduz store.  */
//This is only to take data from the DB and share it across components and for faster access to data // 
/* This is part of the first step to setting up redux. Redux allows one to share data across components. It is a library that allows you to create a global memory for any component to access, as a temp store. For example, a button click triggers a fuction(action). The info is passed to a reducer who listens for a specific type of data they have been subscribed to, and the info is then written in a store. The data is then available to all components. */
/* The process is to create a store, create a reducer, write the actions and then hook up with components.  */
/* before creating store.js install in front end the following: npm i redux react-redux redux-devtools-extension redux-thunk (4 downloads) */


import {createStore, combineReducers, applyMiddleware} from 'redux'              /* All these imported funtions exist within the redux library. createStore creates a store, combineReducers combines reducers to be added to parameters as a group under one name, and applyMiddleware which breaks data into array of thunks. If you make an enhancement to the store(thunking in this case), you have to use appMiddleware. appmiddleware is a function that changes data, it will break the data into thunks.  */
import thunk from 'redux-thunk'                                             /* break the data into chunks. */
import { productListReducer, productDetailsReducer } from './reducers/productReducers.js'             /* import the productlist reducer and details reducer */
import { cartReducer } from './reducers/cartReducers.js'
import {composeWithDevTools} from 'redux-devtools-extension'                /* this funtion within the redux devtools ext allows you to see the redux store in the dev tools. you are extending your data to be seen in the devtool window */
import { userLoginReducer, userRegisterReducer,  userDetailsReducer,
    userUpdateProfileReducer,  } from './reducers/userReducers.js'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers.js'


/*  Fire the function createStore, and give it 2 parameters. 1. reducers- Reducers are always used to write data into the store. They are functions and there is one reducer for each task.  2. initial state- default data that is seen within store/preloaded stored data.  */

const reducer = combineReducers({                               /* function in redux that combines all reducers, empty objects,. Store that in value reducer and give it to the store. */
 productList: productListReducer,                                           /* here we create a simple name for functions that we are going to call, instead of using the function name, to shorten typing time. */
 productDetails: productDetailsReducer,
 cart: cartReducer,
 userLogin: userLoginReducer,
 userRegister: userRegisterReducer,
 userDetails: userDetailsReducer,
 userUpdateProfile: userUpdateProfileReducer,  
 orderCreate: orderCreateReducer,
 orderDetails: orderDetailsReducer,
 orderPay: orderPayReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?                    /* DONT EVER STORE CART ITEMS IN LOCAL STORAGE . THIS IS FOR DEMONSTRATION PURSPOSE TO SHOW HOW IT WORKS.local storage, unlike usestate(storage specific to each component) or redux(global storage to share data among components) stores data on the browser and can exist as long as the browser isnt shutdown. create a const var called cartitemsfromstorage and check local storage to see if there is already a cart item here, assuming it is the same broswer session, it will come back showing that there are items in the cart. access local storage and get item. keys name is cartItems. if so, put in storage. parse like json from local storage.getitem of cartitems. otherwise its an empty array*/
JSON.parse(localStorage.getItem('cartItems')) : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?                    //on initialziation the store asks, is there a shipping address already
JSON.parse(localStorage.getItem('shippingAddress')) : []

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ?      
JSON.parse(localStorage.getItem('paymentMethod')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?                         
JSON.parse(localStorage.getItem('userInfo')) : null                         //if item doesnt exist make it null 

const initialState = {
    cart:{ 
    cartItems:cartItemsFromStorage,                                      /* within cart reducer, cart items array should now be intitalized from local storage. intial state for cart red is cartitems and its empty. */
    shippingAddress: shippingAddressFromStorage,                            //shipping addresses stored in redux
    paymentMethod: paymentMethodFromStorage                               
    },
    userLogin: {userInfo: userInfoFromStorage}                                  //it reads from userlogin storage if anythings exists
    
}                                                
const middleware = [thunk]                                              /* array of thunks stored in a variable called middleware */
const store = createStore(                                             /* store this in a variable store. */
                reducer,                                                       /* this parameter includes the collection of reducers */
                initialState,                                                     /* when app is first loaded, what data will be displayed by deafault. */
                composeWithDevTools(applyMiddleware(...middleware))                 /* where you can makes changes to the data. thunk is done here. thunk breaks data down into small chunks to transfer data to store faster. When changing data, call applyMiddleware function. Takes existing data, and thunk it. spread operator.  */  /* redux devtools ext has a function called composewithdevtools that allows you to see the redux store. */ // to see the redux store open up developer tools and click on the redux tab. Notice @init is the initialize and it has transferred an empty array of products to the store, since there were no action types it fired the default function and returned to state of empty array of products.//      
                )


export default store 



/* debug in browser easily to know what was written into the store adn what wasnt.use  chrome extension- install redux dev tools and react developer tools.*/
/* Store must be hooked up to application, in index.js.In index.js, import provider library (component) from react redux. Provider assists with linking the store to the rest of the application., then import store file.  */
/*   in index.js: Lastly wrap the whole app component tag in a provider component store say that the store can be used  by all components in the app.*/
/* index.js calls store, app.js is also called which calls the rest of the components. */
/* npm run dev and go to chrome dev tools. explore the redux, components and profiler tabs. Here is where the store content will be */