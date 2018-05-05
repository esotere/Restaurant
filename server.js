var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");



var app = express();
var PORT = 3000;


const reservations = [];
const waitlist = [];


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all characters
app.get("/api/reservations", function (req, res) {
    return res.json(reservations);
});

// Displays a single character, or returns false
app.get("/api/characters/:reservations", function (req, res) {
    var chosen = req.params.reservations;

    console.log(chosen);

    for (var i = 0; i < characters.length; i++) {
        if (chosen === characters[i].routeName) {
            return res.json(characters[i]);
        }
    }

    return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newcharacter = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newcharacter);

    characters.push(newcharacter);

    res.json(newcharacter);
});





app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
