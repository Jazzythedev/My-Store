import React, { useState, useEffect } from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer.js'
import { login } from '../actions/userActions'


const LoginScreen = () => {                     //all these bec we will navigate away from here
    const location = useLocation()             
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [email, setEmail] = useState('')                              // pass object email and fire seEmail function. set to empty in state
    const [password, setPassword] = useState('')


    const userLogin = useSelector((state) => state.userLogin)               //read redux state, and in there, userLogin. we wanna read the data written by userLogin reducer
    const { loading, error, userInfo } = userLogin                          // from that data we want l, e, and u.e.

    const redirect = location.search ? location.search.split('=')[1]: '/'      /* location can 'split' the search if there are multiple parameters in the addToCart query parameters, it creates an array. if it reads qty=3=2=5 the the the qty is key and and 3,2 and 5 are all separate line item values. we ask for the [1] indices value in the array bec the [0] value is qty. Wrap this in a number function as that convert it to a number, this is referred to as typecasting*/
                                                                        /* : means else. if no redirecr available take me to home screen */

    useEffect(() => {                                                 //if user info is already in local storage, they dont need to put their user and pass in, so navigate to where redirect goes. (on line 35 in cartScreen)
        if (userInfo) {
            navigate(redirect)                                      
        }
         }, [navigate, userInfo, redirect])                            //useEffecct to fire when change in userInfo or redirect. add navigate always

     const submitHandler = (e) => {                         /* when you hit submit to login */
            e.preventDefault()                              /* default behavior of buttons are to refresh page. lets prevent that that so it moves to fire the login action  */
            dispatch(login(email, password))                /* fire loginaction by passing email and pw. data will be written in to redux and local storage*/
          }
          return (
            <FormContainer>                                                 {/* fill this with the children */}
              <h1>Sign In</h1>
              {error && <Message variant='danger'>{error}</Message>}        {/* binding for errors in case */}
              {loading && <Loader />}                                       {/* loadin comp */}
              <Form onSubmit={submitHandler}>                                  {/* upon submitting form login user action will be fired */}
                <Form.Group controlId='email'>                                  {/* form group named email, it includes a label and then text box with type.   */}
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'                    /* checks for validity */
                    placeholder='Enter email'
                    value={email}                                           /* bind to email state */
                    onChange={(e) => setEmail(e.target.value)}              /* setemail function to update email  */     
                  ></Form.Control>
                </Form.Group>        
                <Form.Group controlId='password'>                       {/* repeat for password */}
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                  Sign In
                </Button>        
              </Form>
        
              <Row className='py-3'>
                <Col>
                  New Customer?{' '}                                                             
                  <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>                 
                    Register
                  </Link>
                </Col>
              </Row>
            </FormContainer>

          )

        }

export default LoginScreen





