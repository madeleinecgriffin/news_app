# news_app
An app that scrapes news articles

This app scrapes the website The Financial Diet for new articles. It will only scrape unique articles at add them to the bottom of the list when the Scrape Articles button is clicked.

After scraping an article, the user is then able to add a note to that article. The app will save the note until the user comes back and updates it. 

This app uses MongoDB and Mongoose to store the article and note data and was deployed to Heroku with mLab. Handlebars was used to render the list of articles. Node and Express are used for running the app.
