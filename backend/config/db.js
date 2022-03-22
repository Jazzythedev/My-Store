import mongoose from 'mongoose'

const connectDB = async () => {                               /*  Function to connect to DB.  */
    const conn = await mongoose.connect(process.env.MONGO_URI, {                            /* await on mongoose (library has connect function) . pass uri string through connection. (URI in .env file) + pass some options in next line. communicate with the database through const "conn"*/
       
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    console.log(`MongoDb connected: ${conn.connection.host}`)                 /* to confirm that it connected to correct db. connection is a property of conn to see i fwe are talking ot correct host. should return correct host.  */

}
export default connectDB