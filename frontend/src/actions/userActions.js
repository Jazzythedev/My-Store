//for user login

import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from '../constants/userConstants'



export const login = (email, password) => async (dispatch)=> {                              //when login button is hit, action is called(login) email and pw must be passed. 

    try{                            //tryblock.
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {                    // set up a config to that the api call returns a json.
          headers: {
            'Content-Type': 'application/json',                             //key and value
          }  
        }
        const {data} = await axios.post(                                                               //pass the key email and password called password and responding email and password, which are stored in parameters called email and password. But since both sides match you can just say email and password once. This hsould all return a id, name, email, isAdmin, and token key with corresponding values. 
            'api/users/login',
            {email:email, password:password},                            
            config      // attach this var so that it sets content type to application/json in header
            )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
                })

                localStorage.setItem('userInfo', JSON.stringify(data))
            }catch (error){
                dispatch({
                  type: USER_LOGIN_FAIL,
                  payload: 
                    error.response && error.response.data.message  ? error.response.data.message : error.message
                })
              }
            }
    


