# Scraping News Articles with MongoDB

This full stack app uses Cheerio to scrape new articles from [The Financial Diet](http://thefinancialdiet.com/), a financial advice website, and then uses Handlebars to display them on the App. It then allows you to store a note on each article. Each article stores the associated note so you can come back and update it at any time. Additionally, by clicking the **Scrape Articles** button you can scrape new articles and add them to the bottom of the list.

## Getting Started

To run this app, run **npm install --save** in the root folder to install all dependencies. See the installation sections for all dependencies. 

The live deployment of this app can be found [here](https://limitless-plains-73736.herokuapp.com/).

After installation, this project can be run by running ***node server.js** in the root folder and going to the localhost. Please note that you must also be running MongoDB to store the articles and their notes in the database - see below for more information about the tools used in this project.

Click **Scrape New Articles** to scrape new articles from The Financial Diet website. The site will only scrape articles if there is not a matching title already in the database. 

Click **Add Note** next to each article to add an associated note with each article. When you save the note and return to the note for that article again, your previous note will load and you can edit it before saving it again.

## Installation

Make sure all of the below dependencies are installed and install individually if needed with **npm install (dependency) --save**. See the **Built With** section for details on each dependency.

* body-parser
* express
* express-handlebars
    * Handlebars is the viewing engine for rendering articles from the database.
* cheerio
* axios
* mongojs
    *  MongoDB is the database that stores the scraped articles.
* mongoose

## Authors

[Madeleine Griffin](https://madeleinecgriffin.github.io/Responsive-Portfolio/)

## Built With

* [express](https://expressjs.com/)
* [express-handlebars](https://github.com/ericf/express-handlebars)
* [MongoDB](https://docs.mongodb.com/manual/installation/)
* [mongoose](http://mongoosejs.com/) for MongoDB
* [cheerio](https://github.com/cheeriojs/cheerio)
* [axios](https://github.com/axios/axios)