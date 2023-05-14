import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

//importing routes from post.js
import postRoutes from './routes/posts.js';


//initialize the app by creating a new instance of express application
const app = express();


//basic setup
app.use(bodyParser.json({ limit: "30mb", extended:true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended:true }));
app.use(cors());


//every route inside postRoutes is going to start with /posts
app.use('/posts',postRoutes);

//link to connect to database
const CONNECTION_URL = 'mongodb+srv://jaykumargupta2307:Ggambhir83@cluster0.zap9js3.mongodb.net/?retryWrites=true&w=majority';

//port at which our server runs
const PORT =  5000;

//connecting database to our application
//and if this promise is fullfilled we listen on port PORT 
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology :true 
}).then(
    () => app.listen(PORT,
    () => console.log(' Server running on port: ' +PORT))
  )
  .catch((error)=> console.log(error.message));

  //to avoid some warnings in the console
//mongoose.set('useFindAndModify', false);