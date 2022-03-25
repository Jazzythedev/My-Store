import bcrypt from 'bcryptjs'

/* create dummy data and seed it into the database for database testing */
//this is all seeding/sample data to add to db//
//console.log("hello")
const user_list = [
    {
        name: 'Admin User',                     /* all users must have a name */
        email: 'admin@myShop.com',
                                                
        password: bcrypt.hashSync('654321', 1),                  /* passwords must not be stored in plain text, they must be encrypted using an install called bcryptjs. hash means covert from plain to encrypted. and it will go through 20 rounds of changing it and the 20th roll is what it will store.  */
        isAdmin: true,                              /* we want to make this person an admin so set to true */
    },

    {
        name: 'Matthew McEver',                     /* dummy data for regular user not admin */
        email: 'matthew@myshop.com',
        password: bcrypt.hashSync('3453453', 1),
        /* Matthew is not an admin. no need to set isAdmin to false sine default value is set to false in userModel Schema. */  
    },
    {
        name: 'Juniper Hunter',
        email: 'junpier@myshop.com',
        password: bcrypt.hashSync('83473248', 1),
    }

];


export default user_list;              /* so it can be used in other js files */