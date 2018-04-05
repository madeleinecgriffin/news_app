var db = require("../models");
var controller = require('../controllers/controller.js');
var axios = require("axios");
var cheerio = require("cheerio");
var mongojs = require("mongojs");

module.exports = function (app) {

    // A GET route for scraping the Financial Diet website
    app.get("/api/articles", function (req, res) {

        axios.get("http://thefinancialdiet.com/").then(function (response) {

            var $ = cheerio.load(response.data);

            $("h2.post-snippet__title").each(function (i, element) {

                var result = {};

                result.title = $(this)
                    .children("a")
                    .text();
                result.link = $(this)
                    .children("a")
                    .attr("href");
                console.log(result)
                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                        //return res.render('scrape',{dbArticle:dbArticle});
                    })
                    .catch(function (err) {
                        //return res.json(err);
                    });
            });
        });
    });



    // Route GET for getting all Articles from the db after scraping
    app.get("/articles", function (req, res) {

        db.Article.find({})
            .then(function (dbArticle) {

                return res.render("scrape", { articles: dbArticle });
            })
            .catch(function (err) {
                return res.json(err);
            });
    });



    // Route GET for getting all Articles from the db on initial load
    app.get("/", function (req, res) {

        db.Article.find({})
            .then(function (dbArticle) {

                return res.render("scrape", { articles: dbArticle });
            })
            .catch(function (err) {
                return res.json(err);
            });
    });


    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/addNote/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        console.log("loading add note get route");
        console.log(req.params);
        
        db.Article.findOne({ _id: req.params.id })
            // ..and populate all of the notes associated with it
            .populate("note")
            .then(function (dbArticle) {
                console.log("dbarticle: " + dbArticle);
                return res.render("saved", {title : req.params.title, link : req.params.link, id : req.params.id});
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for saving/updating an Article's associated Note
    app.post("/api/addNote/:id", function (req, res) {
        // Create a new note and pass the req.body to the entry
        console.log("loading add note post route");
        console.log(req.params);

        db.Note.create(req.body)
            .then(function (dbNote) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function (dbArticle) {
                return res.render("saved", { articles: dbArticle });
            })
            .catch(function (err) {
                res.json(err);
            });
    });

}