var express = require("express");
var app = express();
var hbs = require("hbs");
var bodyParser = require("body-parser");

//model stuff
var mongoose = require('mongoose');  
var Schema = new mongoose.Schema({  
  name: String,
  company: String
});

var People = mongoose.model('People', Schema);  

var person = new People({name:"Eric",company:"Syncano"}).save();
mongoose.connect('mongodb://localhost/datastore'); 


//view stuff
app.set("view engine", "html");
app.engine("html", hbs.__express);
app.use(bodyParser.urlencoded());

app.get("/", function(req,res){
	People.find({},{},function(err,people){
		res.render("index", {
		 "people": people	
		});
	});
});
app.listen(5000);

console.log("Server started on http://localhost:5000")
