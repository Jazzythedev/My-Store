import express from 'express'                      /* import express to create routes, syntax changed fom common js to emca  */
import products from './data/products.js'               /* import js file to be used. must add .js, syntax changed fom common js to emca  */
import dotenv from 'dotenv'

const app = express()                                                      /*  create instance of express to setup routes ie using the bus */
dotenv.config()                                                            /* tells code to open the env file and read it */

 app.get('/api/products', (req, res) => {                                      /* 'app' is express and it is the listener .client calling API using get route. 'get' is one of many routes */
    res.json(products)                                                         /*  send req, respond back with json of products */
 
 })       
 
  app.get('/api/products/:id', (req, res) => {                                      /* Route number 2, use colon : to write parameter that is changing. apui calls get req and res.  */
  const product = products.find((p) => p._id === req.params.id);                      /* find method to loop through js file. variable created let it be p. each p is the product in the array, check its ID, if its equal to the parameter :ID, .id is equivalent to _id in our js file. inside the req, there is a parameter collection, but we want .id. return it and  put it into a variable called product(const). btw when you create a variable in a func, that var is only alive within that function    */
  res.json(product);                                                                        /* This is the response and it sends the product back in form of json */

})                               

const PORT = process.env.PORT || 5000                                             /* create a variable called PORT. THis reads off the environment variable assigned a port or goes to default port which is 5000. "in current process look for the env variable called PORT" */
app.listen(PORT, console.log(`Server is running on port ${PORT}`));                            /* define port to run bkend 5000, express is listener. listen on port # and if you are successful to listen, write the following message. {changed to PORT to represent the above, reading off the .env file for a port number} */

 