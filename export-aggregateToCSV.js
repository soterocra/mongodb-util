// to connect: mongo "mongodb://mongo.example.com:27017/" "C:\Path\To\Script\export-aggregateToCSV.js" > "C:\Export\To\Path\out.csv"

var database = "";
var collection = "";
var pipeline = [];

var x = db.getSiblingDB(database).getCollection(collection).aggregate(pipeline, {allowDiskUse: true}).toArray();

toCSV(x, ";", false);

function toCSV(jsonArray, separator, fixedProjection) {
    var headers = {};
    var matrix = [[]];
    if (!separator) separator = ";";
    
    for (var i = 0; i < jsonArray.length; i++) {
        matrix.push([]);
    }
    
    // search keys
    try {
        jsonArray.forEach(function(item) {
            Object.keys(item).forEach(function(k) {
                headers[k] = headers[k];
            })
            
            if (fixedProjection) {
                throw new Error("No more forEach requiried.");
            }
        });
    } catch (e) {
        print("Warning: {fixedProjection: true}")
    }
    
    var matrixIndex = 1;
    Object.keys(headers).forEach(function(k) {
        matrix[0].push(k);
        
        jsonArray.forEach(function(item) {
            var result = null;
            if (item[k]) {
                result = item[k];
            }
            matrix[matrixIndex++].push(result);
        })
        matrixIndex = 1;          
    });    
    
	var line = "";
	
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            line += matrix[i][j] + ((j === matrix[i].length -1) ? "" : separator);
        }
        print(line);
		line = "";
    }
            
}