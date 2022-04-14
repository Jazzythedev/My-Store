import express from 'express'   /* import express bc we will have more routes in here */
import { authUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'



const router = express.Router()                 /* lot of things within express, just use the router library. Make an instance of just the router and store it in a var called router.  */

router.post('/login', authUser)                                        /* post means user submitting data to server. authUser is a function that is found in usercontroller. it authenticates a user during login.*/
 router.route('/profile').get( protect, getUserProfile)                                                                       //path to user profile. Its a get route and call protect function first to make sure token exists. once that is successful call the getUserProfile function . protect function makes it a private route

 export default router

//to test this login route through postman, run the server side first. npm start. in postman use the POST instead of 'get' and type in {{Url}}/api/users.login. then one row below, choose body bc that is the data of the user we are posting. then choose raw, and then in dropdown to right, choose json. below write: { "email": "matthew@myshop.com", "password": "3453453"} will recieve a token(encrypted text from id ). components are in html. we want to make sure all  post data that we recueve is in form of a json. in server.js when express gets data convert it into json using app.use(express.json()) 