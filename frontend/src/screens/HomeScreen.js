import React, { useEffect } from 'react'
import axios from 'axios'
import Product from '../components/Product'
import {Row, Col} from 'react-bootstrap'



const HomeScreen = () => {
  
  useEffect(() => {                                                    /*  used to retrieve data while Comp. is mounting to avoid loading Time. This will get the product details ready so that when used clicks on a product it loads immediately */
   axios.get('/api/products')                                                                   /* Calls on axios to fetch product get(get api). This needs to be matched with the type of API that was written. axios will look up the proxy, so dont write the whole url.   */


  } )                                                              
  
  
  
  return (
   <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (                                                  /* map function looping through products array and displaying it in 'product' variable */
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>                     {/*   When displaying each product, it must have a unique key so it is easy to manipulate and id is the unique key */}
              <Product product={product} />                                             {/*  each element in variable 'product' will be hooked to parameter product of component Product */}
             </Col>        
        ))}    
      </Row>
   </>
  )
        }


export default HomeScreen