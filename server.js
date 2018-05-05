var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");



var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const reservations = [];
const waitlist = [];


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all reservations
app.get("/api/reservations", function (req, res) {
    return res.json(reservations);
});

// Displays a single reservation, or returns false
app.get("/api/reservations/:reservations", function (req, res) {
    var chosen = req.params.reservations;

    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
        if (chosen === reservations[i].routeName) {
            return res.json(reservations[i]);
        }
    }

    return res.json(false);
});

// Create New Reservations - takes in JSON input
app.post("/api/reserve", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newreservation = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newreservation);

    reservations.push(newreservation);

    res.json(newreservation);
});






app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
