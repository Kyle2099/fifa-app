// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

// get route for login page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "login.html"));
});

// Check for user credentials match
app.post("/authenticate", function (req, res) {
    console.log("POST request - req.body: ", req.body)
    // getting http body from client which contains the captured user credentials. 
    // make sql query (or check in firebase) for matching credentials. 

        // connection.query("INSERT INTO burgers (burger_name, devoured) VALUES (?, ?)", [req.body.burgerName, req.body.devoured], function (err, result) {
        //     if (err) {
        //         return res.status(500).end();
        //     }

        //     // Send back the ID of the new todo
        //     res.json({ id: result.insertId, devoured: false });
        //     console.log({ id: result.insertId });
        // });
    res.send(req.body);

    app.get("/userDashboard", function (req, res) {
        res.sendFile(path.join(__dirname, "./userDashboard.html"));
    });
        
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });