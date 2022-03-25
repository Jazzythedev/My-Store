import mongoose from "mongoose";                 /* mongoose creates tables/collections for you in the DB */


//schema for reviews//
const reviewSchema = mongoose.Schema({                                   /* name the schema reviewSchema. define it as a schema.  */
    name: {                                 /* schema within a schema for review rating page with review of products. dont tell mongoose to make a collection and name it. we want the rating to be a column in the Product collection, not a new collection. we want a rating column and a review section */
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }                                   
})

//creating schema for product//

const productSchema = mongoose.Schema({                 /* create a schema and name it productSchema, tell mongoose its a schema. all parameters for each produt and type must be included for formatting */
   user:{                                   /* THIS IS HOW YOU SET UP A RELATIONSHIP BETWEEN ONE COLLECTION AND ANOTHER. thsi column is populated by pointing to the users collection. */
    type: mongoose.Schema.Types.ObjectId,                                    /* type is a mongoose schema.it includes the unique ID that is created by mongoose for every collection. */
     ref: 'Users',               /* the table we are referencing, users table. THis column in our product is the ID that is coming from the users table */
    required: true
    },    
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
    reviews: [reviewSchema],                    /* object withing an object that refers to the above schema. This is an array of what we defined above. json within json. */
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

});  

const Products = mongoose.model('Products', productSchema)              /* tells mongoose to create a model and create a collection, call it Products and use this schema to make it. store that collection in code called Products. THIS IS WHAT CREATES THE TABLE. IF YOU DONT WANT A NEW TABLE LIKE THE CASE WITH REVIEWSCHEMA, DONT WRITE THIS STATEMENT */
export default Products                                             /* export it to use it in other js files */