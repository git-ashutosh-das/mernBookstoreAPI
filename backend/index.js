import { PORT, mongo_connection } from "./config.js";
import express, { request, response } from "express";
// mongoose is a mongo db data base, we will use it for connecting to mongo db
import mongoose from "mongoose";
// import a schema
import { Book } from "./dbmodels/bookModel.js";

// create an app using express 
const app = express();

// Parse - Middleware to parse request body
app.use(express.json())

// function to listen to the port, use the port in the app
// This function creates an express server, the server language is js and the backend framework is express
// app.listen(PORT, ()=>{
//     console.log('This is Ashutosh and its my first project called - the bookstore app, My intent is to learn CRUD operations on an API via this project')
//     console.log(`App started listening to the port: ${PORT}`);
// }); // placing this inside mongoose connection to run only when connection is established
// Now we can open a browser and go to localhost:5555 to see this server running

// for each url we have an http route - creating an route
// get route - getting a report from server
app.get('/', (request, response) => {   // params string - routename, ( )=> callback funct that handles req, response
    //console.log(request)
    response.status(234).send("Welcome to MERN Stack - Bookstore App");
})
 
mongoose.connect(mongo_connection)
    .then(() => {
        console.log('Connection established successfully');
        app.listen(PORT, () => {
            console.log(`App started listening to the port: ${PORT}`);
        })
    }).catch(error => {
        console.log(`Error establishing coneection:`, error)
    })


// create a book and ad done - brute force method 
// const Book = mongoose.model('Book', { title : String }); // this creates a collection books with schema { title: String }, now we can use this model to create documents(rows) in collection(table) books 
// const ramayan = new Book({ title: "Ramayan" });
// ramayan.save().then(()=>{
//     console.log('book saved');
// }).catch(error=>{
//     console.log('could not save item');
// })
// Book.find(ramayan).then(()=>{
//     console.log('found book');
// })
// This is the brute force method 
// We will try to structure our code for maintainability by creating dmbodels folder where we will save multiple models and import them here and use them


// Route to add book - post 
app.post( '/books', async (request, response)=>{
    try {
        if( !request.body.title || !request.body.author || !request.body.publishYear ){
            console.log(' Send all required fields title author publishYear ')
            return response.status( 400 ).send(' Send all required fields title author publishYear ')
        }
        const newbook = new Book( { title: request.body.title, author: request.body.author, publishYear: request.body.publishYear});
        newbook.save().then(()=>{
            console.log('book saved');
        }).catch(error=>{
            console.log('could not save item');
        })
        return response.status(200).send({message: 'Book created', Book: newbook})
    } catch (error) {
        console.log('Could not save item:', error);
        console.log('Could not save item:', error.message);
        return response.status(400).send(error.message)
    }
})

// get all books
app.get('/getbooks',async (request,response) => {
    try {
        const getallbooks = await Book.find({});
        return response.status(200).json({
            count: getallbooks.length,
            data: getallbooks
        })
    } catch (error) {
        return response.status(500).send(error.message)
    }
    
})


// get one book books
app.get('/getbooks/:id',async (request,response) => {
    try {
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json({
            count: book.length,
            data: book
        })
    } catch (error) {
        return response.status(500).send(error.message)
    }
    
})

// update books by id
app.put('/updatebook/:id',async (request, response)=>{
    try {
        if( !request.body.title || !request.body.author || !request.body.publishYear ){
            return response.status( 400 ).send(' Send all required fields title author publishYear ')
        }
        const {id} = request.params;
        if (!mongoose.Types.ObjectId.isValid(id)) { // this will validet the format of id for below code to run
            return response.status(400).send('Invalid ID format');
        }
        // if( !await Book.findById(id)){  // this block will run if id is of length accepeted by mongoose - 24, but if it is >,<24 it will show a 
        //                                 // type cast error while getting the id itself because mongoose expects a valid length of auto generated ids 
        //     return response.status(404).send('Book does not exist')
        // }
        const update= await Book.findByIdAndUpdate(id, request.body);
        if(!update){
            return response.send('Book not found')
        }
        return response.status(200).send({
            message: 'Book updated successfully',
            data: update
        })
    } catch (error) {
        return response.send(error.message)
    }
})

// delete a book
app.delete('/deletebooks/:id',async (request,response) => {
    try {
        const {id} = request.params;
        const delet = await Book.findByIdAndDelete(id);
        if(!delet){
            return response.status(404).send('Not found');
        }
        return response.status(200).send('Book deleted success');

    } catch (error) {
        return response.status(500).send(error.message)
    }
    
})
