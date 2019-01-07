var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb')
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();

var url='mongodb://user1:password1@ds147354.mlab.com:47354/database1';
var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/createBirdSpecies', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});

app.get('/getBirdSpecies', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        db.collection('Birdspecies').find().toArray(function(err, result){
            if(err)
            {
                res.write("get Failed");
                res.end();
            }else
            {
                console.log(result);
                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents");

        });
    });

});

app.get('/deleteBirdSpecies/:_id', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        deleteDocument(db, req.params._id, function () {
            res.write("Successfully deleted");
            res.end();
        });
    });
});


app.get('/updateBirdSpecies/:_id', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var idToBeUpdated = req.params._id;
        var bird = req.query;
        console.log("Bird Species Name"+idToBeUpdated);
        var birdData = { $set: { Name : bird.Name, Color: bird.Color, Size: bird.Size, Weight: bird.Weight }};
        updateDocument(db, idToBeUpdated, birdData, res, function () {
            res.write("Successfully updated");
            res.end();
        });
    });
});

var deleteDocument = function (db, id, callback) {
    db.collection('Birdspecies').deleteOne( {_id : new mongo.ObjectId(id)}, function(err, result) {
        if (err) {
            res.write("Delete Failed, Error While Deleting");
            res.end();
        }
        console.log("Deleted a document from the birds collection.");
        callback();
    });
};

var updateDocument = function (db, id, bird, res, callback) {
    console.log("Id "+id);
    db.collection('Birdspecies').updateOne( {_id : new mongo.ObjectId(id)}, bird, function(err, result) {
        if (err) {
            res.write("Update Failed, Error While Updating");
            res.end();
        }
        console.log("Updated a document in the birds collection.");
        callback();
    });
};

var insertDocument = function(db, data, callback) {
    db.collection('Birdspecies').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the birds collection.");
        callback();
    });
};




app.post('/createBirdSighting', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();

        }


        insertBSDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});

app.get('/getBirdSighting', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        db.collection('Birdsighting').find().toArray(function(err, result){
            if(err)
            {
                res.write("get Failed");
                res.end();
            }else
            {
                console.log(result);
                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents");

        });
    });

});

app.get('/deleteBirdSighting/:_id', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        deleteBSDocument(db, req.params._id, function () {
            res.write("Successfully deleted");
            res.end();
        });
    });
});


app.get('/updateBirdSighting/:_id', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var idToBeUpdated = req.params._id;
        var bird = req.query;
        console.log("Bird Species Name"+idToBeUpdated);
        var birdData = { $set: { BirdSpecie : bird.BirdSpecie,
                DateTime : bird.DateTime,
                Location : bird.Location }};
        updateBSDocument(db, idToBeUpdated, birdData, res, function () {
            res.write("Successfully updated");

            res.status(400);
            res.end();
        });
    });
});

var deleteBSDocument = function (db, id, callback) {
    db.collection('Birdsighting').deleteOne( {_id : new mongo.ObjectId(id)}, function(err, result) {
        if (err) {
            res.write("Delete Failed, Error While Deleting");
            res.end();
        }
        console.log("Deleted a document from the birds collection.");
        callback();
    });
};

var updateBSDocument = function (db, id, bird, res, callback) {
    console.log("Id "+id);
    db.collection('Birdsighting').updateOne( {_id : new mongo.ObjectId(id)}, bird, function(err, result) {
        if (err) {
            res.write("Update Failed, Error While Updating");
            res.end();
        }
        console.log("Updated a document in the birds collection.");
        callback();
    });
};

var insertBSDocument = function(db, data, callback) {

    db.collection('Birdspecies').find({Name: data.BirdSpecie}).toArray(function(err, result){
        if(err)
        {
            res.write("get Failed");
            res.end();
        }else
        {
            console.log(result);

            if(result.length > 0){

                db.collection('Birdsighting').insertOne( data, function(err, result) {
                    if(err)
                    {
                        res.write("Registration Failed, Error While Registering");
                        res.end();
                    }
                    console.log("Inserted a document into the birds collection.");
                    callback();
                });

            } else{
                //

            }

        }
        console.log("Got All Documents");

    });
};

var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});
