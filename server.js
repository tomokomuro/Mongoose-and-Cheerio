
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

var databaseUri = 'mongodb://localhost/weekcrawler';
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseUri);
}

var routes = require("./controller/html-routes.js");
app.use(routes);

app.get("/", function(req,res){
    res.sendfile("./public/index.html");
});

app.get("/scrape", function(req, res) {
  axios.get("http://www.echojs.com/").then(function(response) {
    var $ = cheerio.load(response.data);

    $("article h2").each(function(i, element) {
      var result = {};


      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          return res.json(err);
        });
    });

    res.send("Scrape Complete");
  });
});

app.get("/articles", function(req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({}).then(function(data){
    res.json(data);
  });

});

app.get("/articles/:id", function(req, res) {
  db.Article.findOne({
    _id: req.params.id
  })
  .populate("note")
  .then(function(data){
    res.json(data);
  });
  // TODO
  // ====
  // Finish the route so it finds one article using the req.params.id,
  // and run the populate method with "note",
  // then responds with the article with the note included
});

app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body).then(function(dbNote){
    return db.Article.findOneAndUpdate({_id: req.params.id}, { $set: { note: dbNote._id  } }, { new: true });
  });
  // TODOs
  // ====
  // save the new note that gets posted to the Notes collection
  // then find an article from the req.params.id
  // and update it's "note" property with the _id of the new note
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
