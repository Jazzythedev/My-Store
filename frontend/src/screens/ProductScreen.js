import React, {useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import axios from 'axios'
import Rating from '../components/Rating';

const ProductScreen = () => {
 
        const params = useParams();                  /* useParam hook to loop through array of elements and store the output in a new variable called params */
        const [product, setProduct] = useState({})           /*  useState hook used here. called it product singular bec it will return one product, and default value is an object(product by default is empty) */
      
        useEffect(() => {                                          /*  call on useffect to make axios call, explaination in homescreen */
            const fetchProduct = async () => {
                const {data} = await axios.get(`/api/products/${params.id}`)     /*  {Deconstructing data} recieved from axios.  aking call to axios. use backtick to access params in react.  only do :id wnen creating the API, now do interpolation*/

                  setProduct(data)                                           /*  Pass the data to function and send it to state called product */
            }

            fetchProduct()                                                     /*  Function is called here and secodary thread created at this Point.  */

         },[])
     return (                                                      /* Return statement to give means to display product in html*/
     <>
     <Link className='btn btn-light my-3' to='/'>                 {/* Link to return to homescreen */}
       Go Back
     </Link>
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
     </Row>
   </>
 )
}


export default ProductScreen