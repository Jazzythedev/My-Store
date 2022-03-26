import users from './data/users.js'
import products from './data/products.js'
import Users from './models/userModel.js'
import Products from './models/productModel.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

//script to import dummy data(seed) into database, create funtion to destroy and add data. create commands to fire the add and destroy funtions// 
/* for sample surpose, not necessary in real production. */


//seeder.js isnt called from server.js, so we need to add the dotenv and connectDB. fire these two funtions first.//
dotenv.config()                 
connectDB() 

//to import and destroy data//

  const importData = async () => {                   /* make an asyncronous funtion to import sample data into database. */
    try {                                               /* Try is part of a trycatch. instead of an app crashing after an error, it should be "handled" with a try catch. all code should be within the try block so that the code wont continue until the error is fixed. Try catch kicks in during execution time(when app is being run)*/
       
        await Products.deleteMany()                                        /* interacting through mongoose with DB and ask to delete everything, roduct table is tied to user, as every product has a user/ID, user table is parent, product table is child. delete child then parent. */
        await Users.deleteMany()                  /* interacting through mongoose with DB and ask to delete everything, in a secondary thread. everything bec no filter was provided in the (). wait for it to finish.*/

        const createdUsers = await Users.insertMany(users)                       /* call Users, insert parent first then child. insert users which is the seed data. put in variable called createdUsers so we will have a confirmation that it got inserted. mongoose will return a record of inserted items into DB, thus giving us the mongo created ID we have been waiting for. */
        const adminUser = createdUsers[0]._id                            /* we are taking the record that was returned to us, grabbing user 0,  which is the first record/admin. and storing it in a variable called adminUser. mongoose structures the id as _id*/
    
        //add spread operator to add the new column to existing collection. this is how you extend an object.//

        const sampleProducts = products.map((p) => {                    /*   take products, call map Command. name each product as "p". map does a loop in each product. store it in sampleProducts/ */
            return {...p, user: adminUser}                                /* return an updated/spread product. spread operator makes a copy of the product and adds a new column to it and value of that new column. it will be returned with new column added. This is done to every product.  */
        
        
        })                                  
                                                                            
        await Products.insertMany(sampleProducts)         /* await for Products table to insert the new sample records */
         console.log('Data has been imported')              /* message to say data has imported */
         process.exit()                                   /* exit process. kill the app */
         
        
        } catch (error) {                                    /* this is part of the try catch and is a must.  */
        console.error(`${error}`)                            /* For now use console.error to display the error message in the developer window only. error has a message property. do this instead of log files since i have no idea how to setup log files yet. */
        process.exit(1)                                      /* This means you exit the app since you cannot connect to DB. add the 1 to exit it  */
    }
}    

//destroy data function//

const destroyData = async () => {                       /* job is do delete records, made async, no parameters this is an independent function that can only be called from a node command. *remember* from node we call backend server.js with its own command. similarly, add a command that calls on seeder.js. Since we have two funtions here we need to separate which funciton is going to be fired! GO DOWN TO IF STATEMETNT FOR MORE INFO*/
    try{                                                    /* Try is part of a trycatch. instead of an app crashing after an error, it should be "handled" with a try catch. all code should be within the try block so that the code wont continue until the error is fixed. Try catch kicks in during execution time(when app is being run) */
        await Products.deleteMany()                     /* delete records */
        await Users.deleteMany() 

        console.log('Data has been destroyed')
        process.exit()                                  /* exit function kill app */

    } catch (error) {
      console.error(`${error}`)
      process.exit(1)                         /* no need to do control+c anymore ! */
    }
}
/* dont export default since we arent going to use the js file elsewhere in project */
 
if (process.argv[2] === '-d') {               /* If we call on node with a seeder-d it is destroy otherwise its import function. it says, if in the process(our application) there is an argv(argument) coming in from CLI, */
  destroyData()                          //note* you will find "data:import": "node backend/seeder","data:destroy": "node backend/seeder -d" were created in package.json backend to run these functions.//
 } else {                                //note* each part of argument for the command has a number. 0 is node, backend/seeder is 1, and -d is 2.// 
    importData()            
 }

 //to test this run npm run data:import.it should say 'data has been imported' go to collections in DB to see that it is imported.// 