var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var mongojs = require("mongojs");

module.exports = function (app) {

    // A GET route for scraping the echoJS website
    app.get("/scrape", function (req, res) {

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
                        //return res.render("articles", {title:dbArticle.title});
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });
            });
        });
    });

    // Route for getting all Articles from the db
    app.get("/articles", function (req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                return res.render("articles", {articles:dbArticle});
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });
    });

    // Route for getting all Articles from the db
    app.get("/", function (req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                //res.json(dbArticle);
                console.log(dbArticle);
                return res.render("articles", {articles:dbArticle});
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });
    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({ _id: req.params.id })
            // ..and populate all of the notes associated with it
            .populate("note")
            .then(function (dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                console.log(dbArticle);
                console.log(dbArticle.note);
                return res.render("note", {articles:dbArticle, note:dbArticle.note});
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });
    });

    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function (req, res) {
        // Create a new note and pass the req.body to the entry
        db.Note.create(req.body)
            .then(function (dbNote) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                return res.render("articles", {articles:dbArticle});
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });
    });

}