var express = require("express");
var request = require("request");
var cheerio = require("cheerio");

var router = express.Router();
var db = require("../models");

router.get("/", function(req,res){
    res.sendfile("../public/index.html");
});

router.get("/saved", function(req,res){
    res.sendfile("../public/saved.html");
});

router.get("/showAll", function(req,res){
    db.Article.find({}).then(function(data){
        res.json(data);
    })
});

router.get("/showSaved", function(req,res){
    db.Article.find({isSaved: true}).then(function(data){
        res.json(data);
    })
});

router.get("/save/:id", function(req,res){
    db.Article.findOneAndUpdate({_id:req.params.id}, { $set: { "isSaved": true }}, {new:true}).then(function(data){
        res.json(data);
    })
});


module.exports = router;