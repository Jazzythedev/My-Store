import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'      
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux'                       /* useDispatch is a hook available from react redux to make dispatch calls from the product screen  */  /* useSelector is a hook to fetch data from the redux store */
import { listProductDetails } from '../actions/productActions';         /* Product details function action */
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = () => {
  const params = useParams();                  /* useParam hook to loop through array of elements and store the output in a new variable called params */
  const dispatch = useDispatch()            /* Make dispatch call, trigger list products details function. from the productscreen created a var called dispatch store the hook 'useDispatch' in it. */     
  const productDetails = useSelector((state) => state.productDetails)   /* create a var called product list details that will fire the hook(useSelector) to read data from the redux store, which is the state information. From the state we want to read to read product details. THe contents of the redux store should  have loading flag, products and a possibility of an error. */
  const { loading, error, product } = productDetails               /* from the productDetails deconstruct the output to get what you want. these key words much match the names that are written by the reducer in productReducer file.*/       
   
  useEffect(() => {                                 /*  called whenver comp is getting loaded.used to retrieve data while Comp. is mounting to avoid loading Time. This will get the product details ready so that when user clicks on a product it loads immediately */
  dispatch(listProductDetails(params.id))         //dispatch here, listproductsdetails the funciton that was written in actions.we specify we want it by id(filter by id) once it is triggered, what happens is what is triggered in the function:product details request, reducer sets loadin to true, and products to empty. and  axios call to get products details, dispatch product delails success and payload of data. reducer picks that up sets loading flag to false and writes payload array into redux store. All of this can be confirmed by starting the app and opening up dev tools. in the redux store one can see the actions that were called (init ,product details req and product details success along with the contents of the store after each action.)
  }, [dispatch, params])                            /* [] is part of useEffects,and useEffect runs when a dispatch is made. adding the [] means have the useEffect run again only when there is a change to the variable, also when there is a change to the params. for example if someone clicks semthing else omn the page. the var is within the [] */ /* whenever a dispatch call is made, meaning whenever data changes,we want usEffect to trigger so we put the dispatch in the [] */
  
  
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
       <Col md={3}>                                                        {/*  3rd column to display price and "add to the cart" */}
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
             <ListGroup.Item>
               <Button
                 className='btn-block'
                 type='button'
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