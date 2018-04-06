var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var hbs = exphbs.create({
  defaultLayout: "main",
  helpers: {
      formatDate: function (date, format) {
          return moment(date).add(1, 'day').format(format);
      },
      formatTime: (time) => {
          return moment(time, 'HH:mm a').format("hh:mm a");
      }
  }
})

var PORT = 3000;

// Initialize Express
var app = express();

app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//require routes
require("./routes/apiRoutes.js")(app);

// Connect to the Mongo DB
var databaseUri = "mongodb://localhost/ArticleStore";

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);

}
else {
    mongoose.connect(databaseUri);

}

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
