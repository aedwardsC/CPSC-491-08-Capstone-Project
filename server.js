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

// important global variables -> used frequently
var username = "";
var companyType = "";

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
    let uname = requst.body.usernameInput;

    // get the password from the form
    let pswd = request.body.pswd;

    // authenticate
    username, companyType = serverFunctions.authenticateUser(response, databaseConnection, 
        uname, pswd, databaseFunctions);
});

program.post("/sign_up", function(request, response) {
    // get the info from the form
    let fname = request.body.fnameInput; // first name
    let lname = request.body.lnameInput; // last name
    let email = request.body.email; // used for searching the databases
    let uname = request.body.username; // another way to sign in (used for sign-in only)
    let pswd = request.body.pswd; // password
    let pswd2 = request.body.pswd2; // verifying that the password is correct before storage
    let role = request.body.role; // Supervisor or employee?

    // make sure that the 2 passwords match
    let match = serverFunctions.checkPswds(pswd, pswd2);

    if (match) {
        // set the global variable
        username = email;

        // store the initial information in the database
        databaseFunctions.storeGeneralSignUpInfo(databaseConnection, email, uname, fname, 
            lname, pswd, role);
        
        // determine if supervisor or employee for proper redirection
        serverFunctions.determineRole(response, role);
    }
    else {
        response.sendFile(__dirname + "/mismatch_pswds.html");
    }
});

program.post("/company_type", function(request, response) { // for supervisors only
    companyType = request.body.companyType;

    // put the company type in the user table
    databaseFunctions.storeCompanyType(databaseConnection, email, companyType);

    // use the company type to determine which initial setup to give them
    serverFunctions.splitInitialSetUp(response, companyType);
});

program.post("/company_name", function(request, response) { // for employees only
    let companyName = request.body.companyName;

    // determine the company type by the name
    companyType = databaseFunctions.companyTypeFromName(databaseConnection, companyName);

    // put the company name in the user table
    databaseFunctions.storeCompanyName(databaseConnection, username, companyName);

    // put the company type in the user table
    databaseFunctions.storeCompanyType(databaseConnection, email, companyType);

    // direct to the disclaimer page
    response.sendFile(__dirname + "/Employee_specific/disclaimer_page.html")
});

program.post("/sup_init_wc", function(request, response) {
    // get the company name from the initial sign-up form
    let companyName = request.body.companyName;

    // add company name and type to the companiesServed database (for reference)
    databaseFunctions.storeCompanyInfoInit(databaseConnection, companyName, companyType);

    // NOT DONE -> Store rest of the info
})

// listen on the port localhost:4000
program.listen(4000);
console.log("Please go to localhost:4000");