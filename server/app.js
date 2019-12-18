const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRoute = require('./api/routes/user');

// Connection to the DB
// mongoose.connect(
//     "mongodb+srv://mramirez:"+ 
//     process.env.MONGO_ATLAS_PW +
//     "@cluster11111-kibkb.mongodb.net/asd?retryWrites=true&w=majority",
//     { 
//         useNewUrlParser: true,
//         useUnifiedTopology: true 
//     }
// );
// mongoose.Promise = global.Promise;  

// Connecting to MongoDB
mongoose.connect("mongodb://mongo:27017/test");
mongoose.Promise = global.Promise;
// If there is a connection error send an error message
mongoose.connection.on("error", error => {
    console.log("Database connection error:", error);
    databaseConnection = "Error connecting to Database";
});
// If connected to MongoDB send a success message
mongoose.connection.once("open", () => {
    console.log("Connected to Database!");
    databaseConnection = "Connected to Database";
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Permissions
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

// Routes
app.use('/user', usersRoute);

// Failed Routes
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

module.exports = app;