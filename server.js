// Anne Edwards
// CPSC 491-08
// Two-Way Schedular

// import the functions from func_for_database
let databaseFunctions = require("./func_for_database.js");

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

// listen on the port localhost:4000
program.listen(4000);