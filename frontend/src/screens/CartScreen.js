//this is for the cart funtionality.


import React, { useEffect } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'                /* useLocation will accept query parameters that were stated in the addToCartHandler */
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../Components/Message'


const CartScreen = () => {
  const location = useLocation()              /* store the results of the following functions in created variables */
  const params = useParams();
  const navigate = useNavigate()
  const productId = params.id

const qty = location.search ? Number(location.search.split('='))      /* location can 'split' the search if there are multiple parameters in the addToCart query parameters, it creates an array. if it reads qty=3=2=5 the the the qty is key and and 3,2 and 5 are all separate line item values. we ask for the [1] indices value in the array bec the [0] value is qty. Wrap this in a number function as that convert it to a number, this is referred to as typecasting*/
[1] : 1                                                                       /* : means else. assume the quantity is 1. when adding something to a cart it must be 1 or greater than 1, so if a number isnt being passed, then assume its 1 */

useEffect(() => {                                                         
  if (productId){                                                           /* if in the route there is a product id */
    
  }
})

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
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h2>
            $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
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