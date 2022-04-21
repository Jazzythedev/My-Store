import axios from 'axios'     /* import it bc we are making axios calls */
import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
} from '../constants/orderConstants.js'
//order comes from placeorder screen.
export const createOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })
        //get user info since user must be logged in at this point. state to get user info
        const {
            userLogin: { userInfo },
         } = getState()
        
         //attach token "authorization" before making call. and return in json
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        //pass the route, data to post and config which is headers info
        const { data } = await axios.post(`/api/orders`, order, config )

        //write into redux when success
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
            error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
 }

 export const getOrderDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
         type: ORDER_DETAILS_REQUEST,   
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer $(userInfo.token)`,
            },
        }
        
        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
 }

 export const payOrder = (orderId, paymentResult) => async ( dispatch, getState) => {
     try {
         dispatch({
             type: ORDER_PAY_REQUEST,
         })

         const {
             userLogin: { userInfo },
            } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
       
        const { data } = await axios.put(
           `api/orders/${orderId}/pay`,
           paymentResult,
           config 
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })
     } catch (error) {
         dispatch({
            type: ORDER_PAY_FAIL,
            payload: 
                error.response && error.response.data.message ? error.response.data.message : error.message, 
         })
     }
 }
 
   

