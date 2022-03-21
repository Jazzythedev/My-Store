import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import {Row, Col} from 'react-bootstrap'
import axios from 'axios'




const HomeScreen = () => {
  const [ products, setProducts] = useState([])                      /*  useState hook(allows us to track state in a function component.State generally refers to data or properites that need to be tracking in an app). takes 1 argument(initial state) and returns two Values, the current state and a function that can be used to update the status, naming convention says start with prefix "set". products is the name given to the var that will store the data. create this when the component is still being constructed. useState=([]) is the default value */
  
  useEffect(() => {                                                    /*  called whenver comp is getting loaded.used to retrieve data while Comp. is mounting to avoid loading Time. This will get the product details ready so that when used clicks on a product it loads immediately */
   
    
    const fetchProducts = async () => {                                                       /* This function will be called in a secondary thread. asyncronous/multithreading to get more calls answered at the same time to avoid loading time. thread 1 recieves req from user and thread 2 gets data and brings it back. function named fetchProduct */
      const {data} = await axios.get('/api/products')                   /* Axios communcated with your APIs(get api). This needs to be matched with the type of API that was written. axios will look up the proxy, so dont write the whole url. This is what the postman delivers."deconstruct" output to only give you data only, not status, time etc., and store response/return in variable called data.  await tells thread 2 to wait for return data to be displayed. */
       setProducts(data)                                               /*  once data is available call state function to put data into the var 'products' that was declared in useState */
  }

    fetchProducts()                                                   /*  Function is called here and secodnary thread created at this Point.  */
  }, [])                                                             /* [] is part of useEffects,and useEffect runs everytime the page is loaded in this case bec [] is empty. adding the [] means have the useEffect run again only when there is a change to the variable, for example if someone clicks semthing else omn the page. the var is within the [] */ 
  
  
  
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