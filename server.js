var express = require("express");
var bodyParser = require("body-parser");

var mongoose = require("mongoose");



var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models");

var PORT = process.env.PORT || 3000;


var app = express();




app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


exphbs = require("express-handlebars"),

app.engine("handlebars",exphbs({defaultLayout:"main"}));
app.set("view engine","handlebars");



var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/hackersNews";
mongoose.Promise= Promise;
mongoose.connect(MONGODB_URI);




var routes=require("./controller/controller.js");
app.use("/",routes);


app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
