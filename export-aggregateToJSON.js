// to connect: mongo "mongodb://mongo.example.com:27017/" "C:\Path\To\Script\export-aggregateToJSON.js" > "C:\Export\To\Path\out.json"

var database = "";
var collection = "";
var pipeline = [];

var x = db.getSiblingDB(database).getCollection(collection).aggregate(pipeline, {allowDiskUse: true}).toArray();

printjson(x);
