To launch the Project :

# install dependencies

$ npm init
$ npm install mongodb express
$ node index.js

Once the app is launched, go to : http://localhost:3000/movie to check if that works.
If you want to add/edit/delete data in the database, you'll need Postman.
Once you want to post/put/delete a movie from the DB, you'll have to set the parameters to raw, and enter the data in JSON.
Look at the screenshot here : https://puu.sh/GPN12/7017c9d7f0.png

Developing process of the application.

To begin, I started by reading all the description of the assignment, to understand what I had to do. I listed every feature that the app needed.
After that, I logged in my Atlas/mongo DB account. I needed a Mongo Data Base to do the project properly.
Once I was logged in, I created my database. I had to think about the kind of data the app would store. First, i thought of Streamers, adding their names, age, streamlink etc. but I thought that i needed different type of values like Booleans, Ints and Strings. I didn't find any way to use booleans for streamers data, so I chose to store movies.
My movie database would store 3 type of data : Name, which is a String, Duration, which is a int, and Released, which is a boolean (if the film's released, the boolean is set to true, if not, it's set to false.)
So I had everything I needed. I copied the link to my database and put in in the code, so my app would correctly connect to the Database.
Once it was done, I developped the app using methods I had seen last year and this year.
I added a app.get, to get every movie from the database, a app.post, that will put movies to the database. Once I had both of them, I checked that everything worked properly.
With that done, I added app.put, to edit a movie, and app.delete, to delete a movie from the database. I, once more, checked that everything worked, and with that done, i was satisfied by my work.
However, i wanted to add something. I wanted my app to get another feature.
I thought of addind an url foreach movie we have in the DB.
When you enter http://localhost:3000/movie/ and add the ID of whichever movie you want, you get its information for this movie. Of course, the movie must be in the database.