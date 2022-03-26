import express from 'express'                      /* import express to create routes, syntax changed fom common js to emca  */
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from '.routes/productRoutes.js'        /* import these because that is where function sto fire routes are stored, an we can refer to it */

const app = express()                                                      /*  create instance of express to setup routes ie using the bus */
dotenv.config()                                                             /* tells code to open the env file and read it */
 connectDB()                                                                         /* execute function to connect to DB */
                                                      
 /* server is entry point so routs can be called from here */         

 app.get('/', (req, res) => {
   res.json({'msg': 'Hello World'})

 })
 
 
 app.use('/api/products', productRoutes)                         /* telling express if you see a a url that says api/products, route them to productRoutes  */








const PORT = process.env.PORT || 5000                                             /* create a variable called PORT. THis reads off the environment variable assigned a port or goes to default port which is 5000. "in current process look for the env variable called PORT" */
app.listen(PORT, console.log(`Server is running on port ${PORT}`));                            /* define port to run bkend 5000, express is listener. listen on port # and if you are successful to listen, write the following message. {changed to PORT to represent the above, reading off the .env file for a port number} */

 