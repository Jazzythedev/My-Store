//script to import dummy data(seed) into database, create funtion to destroy and add data. create commands to fire the add and destroy funtions// 
/* for sample surpose, not necessary in real production. */

import users from './data/users'
import products from './data/products'
import Users from './models/userModel'
import Products from './models/productModel'
import dotenv from 'dotenv'
import connectDB from './config/db'



//seeder.js isnt called from server.js, so we need to add the dotenv and connectDB. fire these two funtions first.//
dotenv.config()                 
connectDB() 

//to import and destroy data//

  const importData = async () => {                   /* make an asyncronous funtion to import sample data into database. */
    try {
       
        await Products.deleteMany()                                        /* interacting through mongoose with DB and ask to delete everything, roduct table is tied to user, as every product has a user/ID, user table is parent, product table is child. delete child then parent. */
        await Users.deleteMany()                  /* interacting through mongoose with DB and ask to delete everything, in a secondary thread. everything bec no filter was provided in the (). wait for it to finish.*/

        const createdUsers = await Users.insertMany(users)                       /* call Users, insert parent first then child. insert users which is the seed data. put in variable called createdUsers so we will have a confirmation that it got inserted. mongoose will return a record of inserted items into DB, thus giving us the mongo created ID we have been waiting for. */
        const adminUser = createdUsers[0]._id                                                                      /* we are taking the record that was returned to us, grabbing user 0,  which is the first record/admin. and storing it in a variable called adminUser*/
    
    
    
    
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
  













}              