import asyncHandler from 'express-async-handler'                //express lib that handles asyncronous calls */
import Users from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//this is to authenticate a users login details and then provide her with a token that represents the fact that she was authenticated.

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public

 const authUser = asyncHandler(async (req, res) => {               /*request what is in the body. . deconstruct it to read just the email and password and store in var in backend route  */ 
    const {email, password} = req.body
    const user = await Users.findOne({email})                                                            /* to see if the users user and pass are in the DB. call users model mongoose to find one record there the email column in the DB collection should match the request coming in. All stored in var user, or the found user. */

if (user && await user.matchPassword(password)) {                                                                        /* match password. call user object which is colelction from DB. usermodel as a match password mathod on top of that.if ther user is valid and bcrypt can compare passwords by comparing ENCRYPTED  pw, it will return a true, otherwise false.  */

    return res.json ({                                          /*if user and pass is valid, return response.json. with a token   */
        
    _id: user._id,                                                  /*pass as many objects as youd like */
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id)                          /* generate token function and pass id  object that being passed as a payload */
})
                                                 
}   else {
    res.status(401) 
    throw new Error('Invalid email or password');
}

})


//  @desc   Get user profile
//  @route  GET /api/users/profile
//  @access Private (the protection function is what makes it a private route)
const getUserProfile = asyncHandler(async (req, res) => {                               /* to get user profile. query DB using the users ID. at this point the token is already decoded. and u can retrieve the req.user.Id. through whch we query DB model to find the user,  we can re call the Users func and find by id . store it in var called user. */
    const user = await Users.findById(req.user._id)

    if (user) {                                                              //if user existreturn json with all followin gobjects
        return res.json({
            _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
        })   
    } else {                                                        //if user profile doesnt exist
        res.status(404)
        throw new Error('User Not Found')
    }
}) 

// @desc Register a new user
// @route POST/ api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await Users.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already Exists in the system!')
    }

    const user = await Users.create({
        name,
        email,
        password,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    } 
})
// @desc update user profile
// @route PUT api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
    
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
    })

 export {authUser, getUserProfile, registerUser, updateUserProfile }