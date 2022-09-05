import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors';

//
import  getwayRoutes  from "./src/routes/getwaysRoutes.js"
import  devicesRoutes  from "./src/routes/devicesRoutes.js"

dotenv.config()

const app = express();

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/getways', getwayRoutes);
app.use('/devices', devicesRoutes);

const port = 3001;


// Set up mongoose connection

const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


db.once('open', function() {
    console.log('Connected!');
    app.listen(port, () => {
        console.log('Server is up and running on port numner ' + port);
    },"0.0.0.0");
});