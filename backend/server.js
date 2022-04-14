import express from 'express'                      /* import express to create routes, syntax changed fom common js to emca  */
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'                                     /* import these because that is where function to fire routes to user authentication are stored, an we can refer to it */
import productRoutes from './routes/productRoutes.js'                               /* import these because that is where function to fire routes to products and details are stored, an we can refer to it */
import { notFound, errorHandler } from './middleware/errorMiddleware.js'              /* import it here so you can use it for the whole app. */


const app = express()                                                      /*  create instance of express to setup routes ie using the bus */
dotenv.config()                                                             /* tells code to open the env file and read it */
 connectDB()                                                                         /* execute function to connect to DB */
                                                      
 /* server is entry point so routs can be called from here */         

 app.get('/', (req, res) => {
   res.json({'msg': 'Hello World'})

 })
 
 app.use(express.json())                                       // components are in html. we want to make sure all  post data that we recueve is in form of a json. in server.js when express gets data convert it into json using app.use(express.json()). since its called from here anytime you are routing and reading post data it will parse it and return it in form of json,
 app.use('/api/products', productRoutes)                         /* telling express if you see a a url that says api/products, route them to productRoutes  */
app.use('/api/users', userRoutes)                               /* this is the rout eto authentiate login */
app.use(notFound)                                                   /* notFound funtion */
app.use(errorHandler)                                               /* this is the eror middleware handler that handles exceptions for the entire application if there isnt a trycatch. this is a route, but we dont specify a route url bc we want express to use this for every call that is made. so that if there is an unhandled route it will be diverted to the middleware. */




const PORT = process.env.PORT || 5000                                             /* create a variable called PORT. THis reads off the environment variable assigned a port or goes to default port which is 5000. "in current process look for the env variable called PORT" */
app.listen(PORT, console.log(`Server is running on port ${PORT}`));                            /* define port to run bkend 5000, express is listener. listen on port # and if you are successful to listen, write the following message. {changed to PORT to represent the above, reading off the .env file for a port number} */

 