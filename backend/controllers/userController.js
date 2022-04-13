import asyncHandler from 'express-async-handler'                //express lib that handles asyncronous calls */
import Users from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'

//this is to authenticate a users login details and then provide her with a token that represents the fact that she was authenticated.

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public

 const authUser = asyncHandler(async (req, res) => {               /*request what is in the body. . deconstruct it to read just the email and password and store in var in backend route  */ 
    const {email, password} = req.body
    const user = await Users.findOne({email})                                                            /* to see if the users user and pass are in the DB. call users model mongoose to find one record there the email column in the DB collection should match the request coming in. All stored in var user, or the found user. */

if (user && (bcrypt.compare(password, user.password))                                                                         /* match password. call user object which is colelction from DB. if ther user is valid and bcrypt can compare passwords by comparing ENCRYPTED  pw, it will return a true, otherwise false.  */
)  {
    return res.json ({                                          /*if user and pass is valid, return response.json. with a token   */
        
    _id: user._id,                                                  /*pass as many objects as youd like */
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id)                          /* generate token function and pass id  object that being passed as a payload */
})
                                                 
}   else {
    res.status(404) 
    throw new Error('Invalid email or password');
}







})

export {authUser}