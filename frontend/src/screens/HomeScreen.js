import React, { useEffect} from 'react'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'                       /* useDispatch is a hook available from react redux. dispatch calls from the homescreem  */  /* useSelector is a hook to fetch data from the redux store */
import {Row, Col} from 'react-bootstrap'




const HomeScreen = () => {
  const dispatch = useDispatch()                                                                 /* Make dispatch call, trigger list products function. from the homescreen created a var called dispatch store the hook useDispatch in it. */
  const productList = useSelector((state) => state.productList)        /* create a var called product list that will fire the hook to read data from the redux store, which is the state information. From the state we want to read everything that is written by the productList. THe contents of the redux store should  have loading flag, products and a possibility of an error. */
  const { loading, error, products} = productList                                                                 /* from the productList deconstruct the output to get what you want. these key words much match the names that are written by the reducer.*/
  
   useEffect(() => {                                                    /*  called whenver comp is getting loaded.used to retrieve data while Comp. is mounting to avoid loading Time. This will get the product details ready so that when used clicks on a product it loads immediately */
      dispatch(listProducts())                                                                       /* dispatch here, listproducts the funciton that was written in actions. once it is triggered, what happens is what is triggered in the function: list product request, reducer sets loadin to true, a nd products to empty. and  axios call to get products, dispatch list product success and payload of data. reducer picks that up sets loading flag to false and writes payload array into redux store.  */
      
  
    }, [dispatch])                                                             /* [] is part of useEffects,and useEffect runs everytime the page is loaded in this case bec [] is empty. adding the [] means have the useEffect run again only when there is a change to the variable, for example if someone clicks semthing else omn the page. the var is within the [] */ /* whenever a dispatch call is made, meaning whenever data changes,we want usEffect to trigger so we put the dispatch in the [] */
  
  
  
  return (
   <>
      <h1>Latest Products</h1>
      {loading ? (                                                            /* binding. if statement. if loading is true, display h2 saying loading. Otherwise check if there is an error. then display the error in a h3 tag.otherwise if there is no error and no loading true then display products.  */
        <h2>loading...</h2>                                                                                              
      ) : error ? (                                                                                           
        <h3>{error}</h3>                                                                /* bind to the error. */
      ): (<Row>                                                                          {/*  /*  otherwise if there is no error and no loading true then display products.  */}
        {products.map((product) => (                                                  /* map function looping through products array and displaying it in 'product' variable */
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>                     {/*   When displaying each product, it must have a unique key so it is easy to manipulate and id is the unique key */}
            <Product product={product} />                                             {/*  each element in variable 'product' will be hooked to parameter product of component Product */}
           </Col>        
      ))}    
        </Row>)}
      
   </>
    
    )
  }

export default HomeScreen