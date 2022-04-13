import express from 'express'                                   /* improt express bc we will have more routes in here */

const router = express.Router()                 /* lot of things within express, just use the roiuter library. Make an instance of just the router and store it in a var called router.  */



//@desc fetch all products                              /* three things to include in code for FYI */
//@route GET route /api/prodcuts
//@access Public
router.get('/', getProducts)                        /* this function is being called from here, and the contents of the function is on the product controller, who stores the code for the function. */


//@desc fetch single product by id                              /* three things to include in code for FYI */
//@route GET route /api/products/:id
//@access Public
router.get('/:id', getProductById) 
      

export default router                                               /* routes will be exported, and used around project invluding serves.js */

/* to test npm run dev. test throught postman first. select right env. and click send. */