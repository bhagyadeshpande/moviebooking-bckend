const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
const dotenv = require('dotenv');
dotenv.config();

//const {MONGOURI} = require('./keys');
const MONGOURI = process.env.MONGOURI || "mongodb://127.0.0.1:27017";
const PORT = process.env.PORT || 5000;
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true    
})
mongoose.connection.on('connected',()=>{
    console.log("Database Connected");
})
mongoose.connection.on("error",(err)=>{
    console.log('connecting error',err);
})

// Schema
require('./models/user');
require('./models/movies');
require('./models/bookedmovies');

// Routes
app.get("/",(req,res)=>{
    res.send("ApI created")
})

app.use("/auth",require('./routes/auth')); 
app.use("/movie",require('./routes/movie')); 
app.use("/user",require('./routes/user')); 
app.use("/bookmovie",require('./routes/bookmovie')); 

app.listen(PORT,()=>{
    console.log(`server Started at Port ${PORT}`)
})