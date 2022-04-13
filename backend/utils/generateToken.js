//this is to generate the token showing that a user has been authenticated. install jsonwebtoken at top level to generate a token using a lib.
 
import jwt from 'jsonwebtoken'                                          /* lib that assists in generating a token */

const generateToken = (id) => {                                /* must pass payload to token. id emial anything about the user. the more elements you pick the more encrypted it is. Never put a password as a payload. id is the payload used here. */
 return jwt.sign({id}, process.env.JWT_SECRET, {                               /* jwt has a function called sign that generated the token. pass the payload which is id, and then also pass a secret key.key comes from process.env.JWT_SECRET (store key in env file.). Then give it some option such as expiration to expire in  30 days. */
    expiresIn: '30d',
    }) 
}

export default generateToken