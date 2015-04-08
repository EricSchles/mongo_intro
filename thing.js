var mongoose = require('mongoose');  
var Schema = new mongoose.Schema({  
  name: String,
  company: String
});

var People = mongoose.model('People', Schema);  

mongoose.connect('mongodb://localhost/datastore'); 
console.log("things worked!");