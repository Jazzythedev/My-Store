import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import products from '../products';
import Rating from '../components/Rating';

const ProductScreen = () => {
 
        const params =useParams();                  /* useParam hook to loop through array of elements and store the output in a new variable called params */
        
       const product = products.find((p) => p._id === params.id)                                     /* (Access specific parameter using id key and must match route name in product screen), find method. for each key let p be each element in the array. Check the ID, is it equal to the ID the user is passing? Store it in a const variable called product */

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