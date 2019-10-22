var database = "database-here";
var collection = "collection-here";
var limit = 100;

var pipeline = [{
    "$match": {
        "key": /123/
    }
}];

// Assistant to run aggregate pipeline
var aggregateRun = (database, collection, pipeline, limit) => {
    if (!database || !collection || !pipeline)
        return `Please, verify your data params ( db: ${database}, collection: ${collection}, ${pipeline} )`
    try {
        limit = limit || 100;
        pipeline.push({
            "$limit": limit
        })
        database = db.getSiblingDB(database);
        return database[collection].aggregate(pipeline, {
            "allowDiskUse": true
        }).pretty().toArray();
    } catch (e) {
        print(e.message);
    }
}

var result = aggregateRun(database, collection, pipeline, limit);
var x = [];

for (var i = 0; i < result.length; i++) {
    x.push(
        db.getCollection(collection)
        .update({
            _id: result[i]._id
        }, {
            $set: {
                "data.date": result[i].inputDate
            }
        })
    )
}

print(x);