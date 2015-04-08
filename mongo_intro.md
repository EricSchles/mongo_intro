#Intro to MongoDB

MongoDB is a NoSQL database, written to work well with several languages.  It allows you to add data via JSON and then store said data, after the life of the program.

#Understanding JSON

JSON stands for JavaScript Object Notation.  While originally written for JavaScript, JSON works with most modern languages.  

Basic example:

`x = { key : "value" }`

Here the value on the left serves as the key and the value on the right serves as the value.  In most languages to access values, you simply do the following, to access the values:

Specific example:

`y = {"name":"Eric"}`


`print y["name"]`

This will print the value, "Eric"

You can also store lists as the values like so:

`x = { key: ["value1,"value2"]}`

For a specific example:

`y = { "names":["Eric","Aaron","James"] } `

`print y["names"][0]`

This will print the value, "Eric"

#Understanding MongoDB

MongoDB is a database for persistently storing data, without SQL.  This type of data store is typically referred to as NoSQL.  SQL standing for Structured Query Language.  So what does it mean for a database to be not-SQL?  Typically it means 
no schema.  A schema is a specification for how data is stored in the tables of your database.  

So for instance a schema might look like this (in psuedo code):

```
Define table x:
	x has integer index
	x has integer value
	x has String name, max String length is 50 characters
```

So what this means is, we've defined a table x, that will have three variables - index, value, and name per record.  Some data stored in this datastore might look like this:

index value name
0     14    Eric
1     12    Sam
2     3     Bill 

A record in the above table would be the 3-tuple - 0,14,Eric.  

Now we are in a place to understand the power of a NoSQL database like mongo.  What if wanted to add a new column like address?  If we wanted to do this in a SQL database, we'd need to rewrite the Schema, then recreate the database, and finally move over all the new data to our new database.  That's pretty easy with 3 records.  But what if there were trillions?  And what if they were stored on a server cluster instead of one computer?  And what if you didn't have write access to all of the data?  And the list goes on.  There are so many problems with assuming you know exactly how your data will look, for problems just like this.

Well, with MongoDB and other NoSQL solutions you don't need to worry about that.  Now all you need to do is pass the data into the data store and records with the new values will appear.  This is both extremely powerful and somewhat dangerous.  Because now you have no guarantee on your data, but as long as your careful it's a bonus.



##Installation

Installing MongoDB is reasonably easy:

* [For Windows](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
* [For Mac](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
* [For Ubuntu](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)
* [Other Linux Distros](http://docs.mongodb.org/manual/administration/install-on-linux/)


##Verifying installation

Once you have node installed, the next thing to do is ensure your installation is correct.

Do this by opening a terminal and type:

`mongo`

This opens up the mongo REPL, which allows you to type in small pieces of code (typically one liners) to verify your code is correct.  This is great for testing small pieces of code and allows your code to be more bug free.

Once you've done the above you should be able to enter commands that will be useful for querying against your datastores.  The mongo shell comes with a bunch of very useful commands for interacting with your data:

`db` - print the name of the current database

`show dbs` - list all the databases

`use [name of database]` - switches to a different database, if the database doesn't already exist, it is created.

`help` - prints a number of help options for learning mongo, in mongo.


Let's go ahead and create a database:

so type:

`use mydb` 

into the mongo shell.  Now quit out with CTRL-C.

##Hello World

Now that you know mongo is installed correctly, enter the following into a file called `models.js` (this is by convention, you can call it whatever you like).  

models.js:
```
connection = new Mongo();
db = conn.getDB("mydb");

print("Got connection");
j = { name : "Eric Schles"}
k = { company : "Syncano" }
db.testData.insert( j );
db.testData.insert( k );
var c = db.testData.find();

while( c.hasNext() ) printjson( c.next() )

```

You can run this by going to the directory you saved this file in and typing out the following:

`mongo localhost:27017/test myjsfile.js`

This will connect to the mongo server, which executes the code.  Pretty neat huh!?

So let's break down what happened here:

First we started a new `connection` object, this is initialized by called `new Mongo();`

This object is used to connect to the mongo server.  Once we've done that we are free to interact with our mongo server to get various databases.  In this case we use getDB to get a database by name, but that need not be the case.  We could have done:

`db = connect("localhost:27020/mydb");` instead of `db = conn.getDB("mydb");` and it would have worked just as well.

The only thing left to understand is the insert statements.  Mongo expects JSON data, which looks like the: `{ name : "Eric Schles"}`.  JSON stands for Javascript Object Notation but works across several languages.  JSON is powerful because it acts as a generalized way of specifying information about the structure of your data, while remaining language agonostic.  Therefore data stored as JSON, written in a python program, will behave the same way being used in javascript.

The next thing to understand is the insert statement:

 `db.testData.insert( j )`

db is the name of the database, testData is the collection (grouping of data), and insert is the data being sent.  

The last thing to understand in this code is:


```
var c = db.testData.find();

while( c.hasNext() ) printjson( c.next() )
```

The find method will query the database.  If no parameters are specified  the entire collection is returned.  The next line simply prints out each line, in order.

Here is a sample of the data I've put into the testData collection:

```
{ "_id" : ObjectId("552554c11b619bb685d3d67b"), "x" : 24 }
{ "_id" : ObjectId("552554c11b619bb685d3d67c"), "x" : 25 }
```

Notice the _id key.  Every document (in SQL this would be called a record) in a mongoDB collection has this key, which is part of the power of mongo.  Now we can reference data elements directly, rather than having to worry about the collection or document it belongs to.  This allows us to think about data in new ways.  It is extremely powerful visualization and search.  

##Integrating MongoDB and Express.js

Rather than going through basic mongo connections, we'll be making use of mongoose for the rest of the tutorial.  Mongoose wraps mongo for JavaScript in a similar way that Express.js wraps Node.js - making our lives easier.

###Installation:

sudo npm install express

sudo npm install mongoose

Testing out mongoose:

```
var mongoose = require('mongoose');  
var Schema = new mongoose.Schema({  
  name: String,
  Company: String
});
mongoose.model('Info', Schema);  
var People = mongoose.model('People', Schema);  
var person = new People({name:"Eric",company:"Syncano"}).save();
mongoose.connect('mongodb://localhost/datastore'); 

mongoose.connect('mongodb://localhost/datastore'); 


console.log("things worked!");
```

While we don't need a schema in mongo, one needs to be useful :)

Here we create one in a rather obvious way.  Of course, we can still add new fields or other information adhoc to the datastore, so it's important to do a ton of error checking to ensure values weren't duplicated incorrectly and stuff of this nature.

Stringing it all together:

```
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
```

index.html:

```
<!doctype html>
<html>
<head></head>
<body>

{{#each people}}
<p>{{name}}</p>
<p>{{company}}
{{/each}}
</body>
</html>

```
