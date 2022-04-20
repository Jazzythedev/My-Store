import React, { useEffect, useState } from 'react' /* usenav allows you to pass date from one comp to another eg items chosen from product screen  to cart screen */
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'      
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux'                       /* useDispatch is a hook available from react redux to make dispatch calls from the product screen  */  /* useSelector is a hook to fetch data from the redux store */
import { listProductDetails } from '../actions/productActions';         /* Product details function action */
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = () => {
  
  const [qty, setQty] = useState(1);          /* qty is the local variable, and state the name of the function  that is called to set the state "setQty". All this is to store the quantity of an item chosen by a customer. by default when component starts, value is zero.*/
  const params = useParams();                  /* useParam hook to loop through array of elements and store the output in a new variable called params */
  const dispatch = useDispatch()            /* Make dispatch call, trigger list products details function. from the productscreen created a var called dispatch store the hook 'useDispatch' in it. */     
  const productDetails = useSelector((state) => state.productDetails)   /* create a var called product list details that will fire the hook(useSelector) to read data from the redux store, which is the state information. From the state we want to read to read product details. THe contents of the redux store should  have loading flag, products and a possibility of an error. */
  const { loading, error, product } = productDetails               /* from the productDetails deconstruct the output to get what you want. these key words much match the names that are written by the reducer in productReducer file.*/       
  const navigate = useNavigate()                            /* variable of navigate, an instance that can be used. */
  

  useEffect(() => {                                 /*  called whenver comp is getting loaded.used to retrieve data while Comp. is mounting to avoid loading Time. This will get the product details ready so that when user clicks on a product it loads immediately */
  dispatch(listProductDetails(params.id))         //dispatch here, listproductsdetails the funciton that was written in actions.we specify we want it by id(filter by id) once it is triggered, what happens is what is triggered in the function:product details request, reducer sets loadin to true, and products to empty. and  axios call to get products details, dispatch product delails success and payload of data. reducer picks that up sets loading flag to false and writes payload array into redux store. All of this can be confirmed by starting the app and opening up dev tools. in the redux store one can see the actions that were called (init ,product details req and product details success along with the contents of the store after each action.)
  }, [dispatch, params])                            /* [] is part of useEffects,and useEffect runs when a dispatch is made. adding the [] means have the useEffect run again only when there is a change to the variable, also when there is a change to the params. for example if someone clicks semthing else omn the page. the var is within the [] */ /* whenever a dispatch call is made, meaning whenever data changes,we want usEffect to trigger so we put the dispatch in the [] */
  
  const addToCartHandler = () => {                  /* the job of this function is to take you to the cart screen. route should be included from app.js that includes ID of product as well as quantity of items. use the use navigat hook to pass data to the the cart screen. */
    navigate(`/cart/${params.id}?qty=${qty}`)                                /* nav to cart and bind to params.id as well any other parameters you are looking to add using "query parameters". this allows for a short route . and you can pass as many parameters in any order. THis is naming off the parameters you want to pass. Anything after the ? is optional*/
    }
    return (                                                      /* Return statement to give means to display product in html*/
     <>
     <Link className='btn btn-light my-3' to='/'>                 {/* Link to return to homescreen */}
       Go Back
     </Link>
     {loading ? (                                           /* binding. if statement. if loading is true, display oading component. Otherwise check if there is an error, and if there is, display the message component along with error message..otherwise if there is no error then display product details.  */
       <Loader />
     ) : error ? (
       <Message variant='danger'>{error}</Message>        /* here is a message component that provides message feedback. 'danger' refers to one of its styling options/variants. */
     ) : (
     <Row>
       <Col md={6}>                                               
         <Image src={product.image} alt={product.name} fluid />     {/* First(left) column to have images. product is from the variable you created above. fluid is styling */}
       </Col>
       <Col md={3}>
         <ListGroup variant='flush'>                                {/* component called list group to list elements */}
           <ListGroup.Item>
             <h3>{product.name}</h3>
           </ListGroup.Item>
           <ListGroup.Item>
             <Rating                                                      /* Rating component displayed here */
               value={product.rating}
               text={`${product.numReviews} reviews`}
             />
           </ListGroup.Item>
           <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
           <ListGroup.Item>Description: {product.description}</ListGroup.Item>
         </ListGroup>
       </Col>
       <Col md={3}>                                                      {/* /*  3rd column to display price and "add to the cart" */}
         <Card>
           <ListGroup variant='flush'>
             <ListGroup.Item>
               <Row>
                 <Col>Price:</Col>
                 <Col>
                   <strong>${product.price}</strong>
                 </Col>
               </Row>
             </ListGroup.Item>

             <ListGroup.Item>
               <Row>
                 <Col>Status:</Col>
                 <Col>
                   {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}      
                 </Col>
               </Row>
             </ListGroup.Item>
                                                                    
                {product.countInStock > 0 && (                              /* if the product is in stock, if there is more than 0, display the following */
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control                                       /* form control allows a user to submit data to a server.  controls allows you to add different things to a form.select is a type of control and is a dropdown menu. wel will use the usestate hook to store the quantity added to cart. */
                          as='select'
                          value={qty}                                     /* value of dropdown is a quantity. a select dropdown that allows a user to select the number of items they want  */
                           onChange={(e) => setQty(e.target.value)}                                               /*  onchange is a dropdown funtionality. e stores the change. fire setQ function and set the value of e in local state.  if she wants 3 the value will be 3*/
                        >                                                
                            {[...Array(product.countInStock).keys()].map((x) => (     /* this is what goes inside of the dropdown menu to choose from. choices offered should reflect what is in stock!. Make a copy of the empty array and making an array out of count in stock and pulling out the keys (indices). if the stock count is 10 it will show 1o options in dropdown(this is due to the array function). indices are used to label the elements in an array starting from 0. use the indices to .  {/* while inside the array, look through every element with map funtion.  */
                                                                                      /* while inside the array, look through every element with map funtion.  */
                              <option key={x+1} value={x+1}>{x+1}</option>                                                                                 /* in a select statement there are two things to add, an option with a  key and value. THis is for each option. Bind key to x bec x is the indices coming in.  indices start at 0 so we add plus 1 so that the drop down selection for item count starts at 1. adding the third x+1 just allows us to display the values in the dropdown */
                              ))
                            }  
                         
                           </Form.Control>                                                                        
                      </Col>
                    </Row>
                    </ListGroup.Item>
                )}                                                   

             <ListGroup.Item>
               <Button
                 className='btn-block'
                 type='button'
                 onClick={addToCartHandler}                            /* clickint the add to cart fires the addotcarthandler */
                 disabled={product.countInStock === 0}                       /*   Product stock, ifthere arent anymore the button will disable  */
               >
                 Add To Cart                                    
               </Button>
             </ListGroup.Item>
           </ListGroup>
         </Card>
       </Col>
     </Row>)}
   </>
 )
}


export default ProductScreen