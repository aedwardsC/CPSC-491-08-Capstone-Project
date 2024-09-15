// Anne Edwards
// CPSC 491-08
// Two-Way Schedular

// import the functions from func_for_database
let databaseFunctions = require("./func_for_database.js");
let serverFunctions = require("./func_other_than_db.js");

// set up Node.js library
let nodeJs = require("express");
let program = nodeJs();

// set up the library for parsing form data
let dataParse = require("body-parser");
// call the library for parsing the data
program.use(dataParse.urlencoded({extend:true}));
// for easily navigating between the forms
program.use(nodeJs.static(__dirname + "/Company_forms"));


// set up the database
let mySql = require("mysql2");
let databaseConnection = mySql.createConnection({
    host: "localhost",
    user: "", // your username
    password: "" // your password
});

databaseFunctions.startDatabase(databaseConnection);

program.get("/", function(request, response) {
    // when first access the website, automatically route to the
    // sign in page
    response.sendFile(__dirname + "/index.html");
});

program.post("/sign_in", function(request, response) {
    // get the username from the form
    var username = requst.body.usernameInput;

    // get the password from the form
    let pswd = request.body.pswd;

    // authenticate
    username = serverFunctions.authenticateUser(response, databaseConnection, username, pswd, databaseFunctions);
});

program.post("/sign_up", function(request, response) {
    // get the info from the form

    // make sure that the 2 passwords match
});

// listen on the port localhost:4000
program.listen(4000);
console.log("Please go to localhost:4000");