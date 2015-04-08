conn = new Mongo();
db = conn.getDB("mydb");

print("Got connection");
j = { name : "Eric Schles"}
k = { company : "Syncano" }
l = { namez : ["Shaque","Aaron","Anna"]}
db.testData.insert( j );
db.testData.insert( k );
db.ice_cream.insert( l );
var c = db.testData.find();
var d = db.ice_cream.find();
while( c.hasNext() ) printjson( c.next() )
while( d.hasNext() ) printjson( d.next() )
