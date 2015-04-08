conn = new Mongo();
db = conn.getDB("mydb");

print("Got connection");
j = { name : "Eric Schles"}
k = { company : "Syncano" }
db.testData.insert( j );
db.testData.insert( k );
var c = db.testData.find();

while( c.hasNext() ) printjson( c.next() )
