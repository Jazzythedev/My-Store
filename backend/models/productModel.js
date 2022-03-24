import mongoose from "mongoose";                 /* mongoose creates tables/collections for you in the DB */


//creating schema for product//

const productSchema = mongoose.Schema({                 /* create a schema and name it productSchema, tell mongoose its a schema. all parameters for each produt and type must be included for formatting */
    name: {
        type: String,                /* write an object stating type of field is string, and make it required otherwise there are products without names! if you dont say required, by default its false */
        required: true
    },
    image: {
        type: String,           /* url to image is a string */
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0                      /* default rating if not given*/
    },
    price: {
        type: Number,
        required: true,
        default: 0                       /* default price if not set */
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    }
    


       
}, {
    timestamps: true         /* to capture data and time when things were changed or added(Timestamp) */

})  

const Products = mongoose.model('Products', productSchema)              /* tells mongoose to create a model and create a collection, call it Products and use this schema to make it. store that collection in code called Products */
export default Products                                             /* export it to use it in other js files */