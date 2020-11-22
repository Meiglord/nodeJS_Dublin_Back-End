// We require express and mongoDB, since we need to use them.
const express = require('express')
const app = express()
const { MongoClient, ObjectID } = require("mongodb");

// Atlas connection string, to get a connection to the database.                                                                                                                                        
const url = "mongodb+srv://dbUser:19738246@cluster0.e9nfj.mongodb.net/movieData?retryWrites=true&w=majority"
const client = MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    // We check the connexion to the database, and if there's an error, we display it.
    if(err) throw err;
    const db = client.db('movieData')

    //POST Request -  we get the body
    app.use(express.json())
    app.use(express.urlencoded({ extended: false}))

    // We get the list of movies
    app.get("/movie", async (req, res) => {
        try{
            // we get and display the movie list
            let movie = await db.collection('movie').find().toArray();
            res.send(movie)
        }
        catch(e){ 
            // If there's an error, we display it.
            res.send({type: "error", message: "Error"})
        }
    })
    
    // We get one movie when we get to its ID url
    app.get("/movie/:id", async ({params: {id}}, res) => {
        try{
            // we get and display the movie we want by finding its ID
            let movie = await db.collection('movie').findOne({_id: ObjectID(id)});
            res.send(movie)
        }
        catch(e){ 
            // If there's an error, we display it.
            res.send({type: "error", message: "Error, the ID of the film doesn't exist."})
        }
    })
    

    // Here, we post the movie in the database.
    app.post("/movie", async ({body: {name, duration, released}}, res) => {
        try{
            // We check that the name is a string, duration a number, and released a boolean
            if(typeof name === 'string' && typeof duration === 'number' && typeof released === "boolean"){
                await db.collection("movie").insertOne({name, duration, released})
                res.send({type: "success", message: "Movie added"})
            } 
            // If not, we put an Error
            else {
                res.send({type: "error", message: "Error, name must be a string, duration a number and released, a boolean"})
            }
        }catch(e){
            res.send({type: "error", message: "Error"})
        }
    })

    // Request to delete a movie from the list
    app.delete("/movie/:id", async ({params: {id}}, res) => {
        try {
            // if there's no error, we delete the movie.
            await db.collection('movie').deleteOne({_id: ObjectID(id)})
            res.send({type:"success", message: "Removed"})
        }catch(e){
            // if there's an error, we display it
            res.send({type: "error", message: "Error"})
        }
        
    })

    // request to Update a movie that already exists
    app.put('/movie/:id', async ({body:{name, duration, released}, params: {id}}, res) => {
        try{
            // We check that the name is a string, duration a number, and released a boolean for the updating
            if(typeof name === 'string' && typeof duration === 'number' && typeof released === "boolean"){
                await db.collection('movie').updateOne({_id: ObjectID(id)}, {$set: {name, duration, released}})
                res.send({type: "success", message: "Updated"})
            } 
            // if there's an error, we display it
            else {
                res.send({type: "error", message: "Error"})
            }
        } catch(e){
            res.send({type: "error", message: "Error"})
        }
    })
    app.listen(3000)
});