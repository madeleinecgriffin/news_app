var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
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

app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);

app.get("/", function (req, res) {
    res.render("scrape");
});

require("./routes/apiRoutes.js")(app);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/week18Populater");


// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});