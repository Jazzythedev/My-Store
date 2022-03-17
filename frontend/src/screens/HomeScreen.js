import React, { useEffect } from 'react'
import Product from '../components/Product'
import {Row, Col} from 'react-bootstrap'
import axios from 'axios'




const HomeScreen = () => {
  
  useEffect(() => {                                                    /*  used to retrieve data while Comp. is mounting to avoid loading Time. This will get the product details ready so that when used clicks on a product it loads immediately */
   
  let products = {}                                                                       /* Add this after following 4 lines, created var  called products */
  const fetchProducts = async () => {                                                       /* This function will be called in a secondary thread. asyncronous/multithreading to get more document. thread 1 recieves req from user and thread 2 gets data and brings it back. function named fetchProduct */
  const {data} = await axios.get('/api/products')                   /* Calls on axios to fetch product get(get api). This needs to be matched with the type of API that was written. axios will look up the proxy, so dont write the whole url. This is what the postman delivers."deconstruct" output to only give you data, and store response/return in variable called data.  await tells thread to wait for data to return before fetching data from new req. */
    products = data                                                                    /* above data value exist only wthin functionin secondary thread.let products equal data so it will give data to the parent thread. Use hook to give it to first thread */
  }

  fetchProducts()                                  /*  Function is called here and secodary thread created at this Point.  */
  })                                                              
  
  
  
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