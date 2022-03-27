import express from 'express'                                   /* improt express bc we will have more routes in here */
import asyncHandler from 'express-async-handler'                /* express lib that handles asyncronous calls */
import Products from '../models/productModel.js'            /* talk to table, it must be imported first */

const router = express.Router()                 /* lot of things within express, just use the roiuter library. Make an instance of just the router and store it in a var called router.  */



//@desc fetch all products                              /* three things to include in code for FYI */
//@route GET route /api/prodcuts
//@access Public
router.get('/', asyncHandler(async (req, res) =>  {                         /* tells our variable to get. api/prodcuts part is in the server.js so we dont need to add that part here. its already in the route */
                                                            /* express is bad at handling asyncronous calls install asyncHandler. wrap the call in it. it will get the response ans send it back*/

    const products = await Products.find({})                                     /* call DB to get records. import prodcuts table mongoose model. to talk to a table, it must be imported. tell mongoose with a find command to bring all records since the (this is where you specify sp. data you want) is empty. then put the results in a variable called products. */
    res.json(products)              /* send data back to the call as a response in json file.  */

}))


//@desc fetch single product by id                              /* three things to include in code for FYI */
//@route GET route /api/products/:id
//@access Public
router.get('/:id', asyncHandler(async (req, res) => {          /* mongoose command find by id, this refers to the default ids that were provided by mongoose. requesting a parameter id and store it in a product variable */     
 const product = await Products.findById(req.params.id)                               /* req.params.id is now pulling off DB instgead of json */ 
 
 
      if (product) {                                                             
        res.json(product)
    }   else {
        res.status(404).json({message: 'Product not found'})                     /* if product found return product otherwise respond with a 404(not found). */
    }
    }))

export default router                                               /* routes will be exported, and used around project invluding serves.js */

/* to test npm run dev. test throught postman first. select right env. and click send. */