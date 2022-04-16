// middleware is designed to handled error exceptions that were not handled in the trycatch.This is error handling for th entire application. THis is triggered by an unhandled exception/error.//

//THis function is fired when an API/URL doesnt exist.//
const notFound = (req, res, next) => {      /* to speficifically handle 404 messages. 3 parameters, very general, it will be called during every route that is called.   */
  console.log( 'I am in not found')         
  const error = new Error(`Not found - ${req.originalUrl}`)     /* whatever the original url was, its not found. When you throw a new error, it looks for a try catch to throw the error to. looking for someone to throw the baton to. if there is no try catch, it is an unhandled exception. By passing the error to 'next'. it is passed to the error handler then */
  res.status(404)         /* only called for 404 */
  next(error)           /* you will be passed to the next stage, since this function will always be called. */
    
}





const errorHandler = (err, req, res, next) => {                            //create a function called errorHandler, and it will be triggered by undhandled exceptions. The parameter is the error, req, res, and next ////Next function takes the user nack to continue their search as usual. if you dont want the user to proceed any futher, do not fire a next function. next is fo rwhen you are done handling the error and it takes you to the next process. //
  console.log("I am in the error handler")                                   /* This is displayed in the CLI if there in an unhandled error/exception that the error handler is dealing with. express adds this listener saying if there is an unhandled exception, i will call the error handler fuction.  */                    
  console.log(`res.statuscode: ${res.statusCode}`) 
  console.log(`err.message: ${err.message}`) 
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode       //  this is a simple if statement. The res has a status code. If it is 200 then change it to 500, otherwise keep the same status code. Put the response in a variable called status code. if something is wrong, change the staus to 500 otherwise keep it at status code incase it is a 404. A function called not found.  */
   res.status(statusCode)                                                     // set the response status to be the new status code and send a json with the error code. */
    res.json({
    message: err.message  
                                         /* This is your APIs response. dont call next bc you dotn want it to go anywhere else */
})


}

export {notFound, errorHandler}     /* a way to export functions */