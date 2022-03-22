import mongoose from 'mongoose'

const connectDB = async () => {                                              /*  Function to connect to DB.  */
    try {                                                                       /* Try is part of a trycatch. instead of an app crashing after an error, it should be "handled" with a try catch. all code should be within the try block so that the code wont continue until the error is fixed. Try catch kicks in during execution time(when app is being run)*/
        const conn = await mongoose.connect(process.env.MONGO_URI, {                /* await on mongoose (library has connect function) . pass uri string through connection. (URI in .env file) + pass some options in next line. communicate with the database through const "conn"*/
            
                useUnifiedTopology: true,                                                    /* This allows us to connect to DB from different regions w/o issues, and also to connect to a backup database incase our main one crashes in an emergency */
                useNewUrlParser: true                                               /* a warning issue to convert any old connection strings to any new updates. Keep it true. talking to mongoose */
            })

            console.log(`MongoDb connected: ${conn.connection.host}`)                 /* to confirm that it connected to correct db. connection is a property of conn to see i fwe are talking ot correct host. should return correct host.  */
        } catch(error){                                                             /* this is part of the try catch and is a must.  */
            console.error(`Error: ${error.message}`)                                /* For now use console.error to display the error message in the developer window only. error has a message property. do this instead of log files since i have no idea how to setup log files yet. */
            process.exit(1)                                                     /* This means you exit the app since you cannot connect to DB. add the 1 to exit it  */
        }
}
export default connectDB