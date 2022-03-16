const express = require('express')                      /* import express to create routes */
const products = require('./data/products')                /* import js file to be used */


const app = express()                                                      /*  create instance of express to setup routes ie using the bus */

 app.get('/api/products', (req, res) => {                                      /* 'app' is express and it is the listener .client calling API using get route */
    res.json(products)                                                         /*  send req, respond back with json of products */
 
 })                                                                          

app.listen(5000, console.log('Server is running on port 5000'));                            /* define port to run bkend 5000, express is listener. listen on port # and if you are successful to listen, write the following message */

