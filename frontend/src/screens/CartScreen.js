//this is for the cart funtionality.


import React, { useEffect } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'                /* useLocation will accept query parameters that were stated in the addToCartHandler */
import { useDispatch, useSelector } from 'react-redux'                  /* useSelector is a hook to fetch data from the redux store */
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = () => {
  const location = useLocation()              /* store the results of the following functions in created variables */
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const productId = params.id

const qty = location.search ? Number(location.search.split('=')[1])      /* location can 'split' the search if there are multiple parameters in the addToCart query parameters, it creates an array. if it reads qty=3=2=5 the the the qty is key and and 3,2 and 5 are all separate line item values. we ask for the [1] indices value in the array bec the [0] value is qty. Wrap this in a number function as that convert it to a number, this is referred to as typecasting*/
 : 1                                                                       /* : means else. assume the quantity is 1. when adding something to a cart it must be 1 or greater than 1, so if a number isnt being passed, then assume its 1 */

useEffect(() => {                                                         
  if (productId){                                                           /* if in the route there is a product id, dispatch the addtocart function.*/
    dispatch(addToCart(productId, qty))                               /* dispatch addtocart function call. pass product id and qty.  */
  }
},[dispatch, productId, qty])                 /* when there is these changes, have useeffect to fire again */

const cart = useSelector((state) => state.cart)         /* useSelector to fetch data from the redux store. selector gets the whole state back but we just want the cart. remember that redux contains product list, details and cart info.  */
const {cartItems} = cart                              /* deconstruct  the data that is stored in the cart variable and get cart items from cart */

const removeFromCartHandler = (id) => {           /* to remove a cart item, pass the id so the reducer everything else but that specific product matching that id. This is triggered when a user clicks the trash icon */
  dispatch(removeFromCartHandler(id))
}

const checkoutHandler = () => {                       /* this function is fired when you are ready to make purchase after items are added to cart. it handles navigating to login and then shipping */
navigate('/login?redirect=shipping')             




}

return (
  <Row>
    <Col md={8}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (                                         /* in redux store all items, if length is zero go back. */
        <Message>
          Your cart is empty <Link to='/'>Go Back</Link>
        </Message>
      ) : (
        <ListGroup variant='flush'>
          {cartItems.map((item) => (
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />        {/* the following displays details about the item that was added to the cart.  */}
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as='select'                                           /* dropdown allows you to change quantity of item added to cart */
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(item.product, Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (    /* how to display the dropdown */
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type='button'
                    variant='light'
                    onClick={() => removeFromCartHandler(item.product)}             /* function to delete item from cart */
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
    <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})       {/* subtotal uses the reduce function to add the totals. acc is the accumulated sum of each item, and item represents each item.  0 is default value if there arent any items to add. */}
              items
            </h2>
            $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)            /* dollar value created here. item qty multiplied by proce amd added to next item  */
              .toFixed(2)}                                                    {/* to fixed produces an answer to two decima places. */}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}                               /* this takes you to final page to buy product. */
            >
              Proceed To Checkout                                       {/* takes you to shopping cart page */}
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  </Row>
)
}

export default CartScreen