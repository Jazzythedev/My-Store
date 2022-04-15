//for user login

import axios from 'axios'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT, 
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
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
        const {data} = await axios.post(                                                               //pass the key email and password called password and responding email and password, which are stored in parameters called email and password. But since both sides match you can just say email and password once( INSTEAD OF WRITING email:email and password:password). This hsould all return a id, name, email, isAdmin, and token key with corresponding values. 
            'api/users/login',
            {email, password},                            
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

 export const logout = () => (dispatch) => {         //once this is fired, the local storage is emptied of the user and pass and the action userlogout is fired
       localStorage.removeItem('userInfo')
        dispatch({ type: USER_LOGOUT })
            
            }

  export const register = (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    const {data} = await axios.post(
      '/api/users',
      { name, email, password},
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
       })
      }    
    }


  export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      })

      const {
        userLogin: {userInfo},
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`, 
        },
      }
      
    const {data} = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
    } catch (error) {
      dispatch ({
        type: USER_DETAILS_FAIL,
        payload: 
          error.response && error.response.data.message
        ? error.response.data.message
        : error.message,

        })
      }
    }

    export const updateUserProfile = (user) => async (dispatch, getState) => {
      try {
        dispatch({
          type: USER_UPDATE_PROFILE_REQUEST,
        })
      
        const {
          userLogin: { userInfo },
        } = getState()

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization:  `Bearer ${userInfo.token}`,
          },
        }

        const {data} = await axios.put(`/api/users/profile, user, config`)

        dispatch({
          type: USER_UPDATE_PROFILE_SUCCESS,
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: USER_UPDATE_PROFILE_FAIL,
          payload: 
          error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        })
      }
      
    }
    



  






