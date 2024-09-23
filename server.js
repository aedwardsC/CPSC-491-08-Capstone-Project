// Anne Edwards
// CPSC 491-08
// Two-Way Schedular

// import the functions from other modules
let databaseFunctions = require("./func_for_database.js");
let serverFunctions = require("./func_other_than_db.js");
let tester = require("./testing_functions.js");

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
var fullName = "";

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
    let uname = request.body.usernameInput;

    // get the password from the form
    let pswd = request.body.pswd;

    // variables for this function
    let fName = "";
    let lName = "";
    let role = "";

    // authenticate
    let userInfo = serverFunctions.authenticateUser(response, databaseConnection, 
        uname, pswd, databaseFunctions);
    
    //parse the array of info
    username = userInfo[0];
    companyType = userInfo[1];
    role = userInfo[2];
    fName = userInfo[3];
    lName = userInfo[4];

    // put value to the final variable
    fullName = fName + " " + lName;

    // FOR TESTING
    console.log("Username = " + username);
    console.log("companyType = " + companyType);
    console.log("Role = " + role);
    console.log("Full Name = " + fullName);
    
    serverFunctions.splitUsers(response, role, username, fName);
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
        // set the global variables
        username = email;
        console.log("Global username changed to " + username);
        fullName = fname + " " + lname;
        console.log("Global fullName changed to " + fullName);

        // store the initial information in the database
        databaseFunctions.storeGeneralSignUpInfo(databaseConnection, email, 
            uname, fname, lname, pswd, role);
        
        // determine if supervisor or employee for proper redirection
        // supervisor as written
        // get the company names from the database as an array
        // redirect to company names form with the variable type
        serverFunctions.determineRole(response, role);
    }
    else {
        response.sendFile(__dirname + "/Company_forms/mismatch_pswds.html");
    }
});

program.post("/company_type", function(request, response) { // for supervisors only
    companyType = request.body.companyType;

    // put the company type in the user table
    databaseFunctions.storeCompanyType(databaseConnection, username, 
        companyType);

    console.log("The user's company type from form: " + companyType); // TESTING

    // use the company type to determine which initial setup to give them
    serverFunctions.splitInitialSetUp(response, companyType);
});

program.post("/company_name", function(request, response) { // for employees only
    let companyName = request.body.companyName;

    console.log("The user's company is: " + companyName); // TESTING

    // determine the company type by the name
    companyType = databaseFunctions.companyTypeFromName(databaseConnection, companyName);

    // put the company name in the user table
    databaseFunctions.storeCompanyName(databaseConnection, username, companyName);

    console.log("Company Type in server: " + companyType);

    // put the company type in the user table
    databaseFunctions.storeCompanyType(databaseConnection, username, companyType);

    // direct to the supervisor name page
    response.sendFile(__dirname + "/Company_forms/Employee_specific/supervisor_name.html");
});

program.post("/supervisor_name", function(request, response) { // for employees only
    let supName = request.body.supervisorName;

    console.log("The user's supervisor is: " + supName); // TESTING

    // last of employee sign-up/ set-up...
    // build the account...
    // store email, name, and supervisor's name in proper employee table
    databaseFunctions.buildEmpAccount(databaseConnection, username, fullName, 
        companyType, supName);

    // TEST: make sure that the account was built correctly
    tester.printEmpTable(databaseConnection, companyType);
    tester.printUserTable(databaseConnection);

    // direct to the disclaimer page
    response.sendFile(__dirname + "/Company_forms/Employee_specific/disclaimer_page.html");
});

program.post("/wc_initial1", function(request, response) {
    let trainingDays = new Array();

    // get the company info
    let companyName = request.body.companyName;
    let numOfEmps = request.body.numOfEmps;
    let startOfMornShift = request.body.startMornShift;
    let endOfMornShift = request.body.endMornShift;
    let startOfLateShift = request.body.startLateShift;
    let endOfLateShift = request.body.endLateShift;
    let multLoc = request.body.multLoc;
    let numOfLoc = request.body.numOfLoc;
    let monday = request.body.monday;
    let tuesday = request.body.tuesday;
    let wednesday = request.body.wednesday;
    let thursday = request.body.thursday;
    let friday = request.body.friday;
    let saturday = request.body.saturday;
    let sunday = request.body.sunday;

    // create the general shift hours for database storage (s-e,s-e)
    let shiftHours = startOfMornShift + "-" + endOfMornShift + "," + startOfLateShift
        + "-" + endOfLateShift;

    // create the array for the training days
    serverFunctions.createTrainingSchedule(trainingDays, monday, tuesday, wednesday,
        thursday, friday, saturday, sunday);
    
    let stringTraining = trainingDays.toString();
    console.log("The training schedule going into the database is: " + stringTraining);

    // add company name and type to the companiesServed database (for reference)
    databaseFunctions.storeCompanyNameType(databaseConnection, companyName, companyType);

    // store company information for the supervisor in the approporiate supervisor database
    databaseFunctions.storeWCInitInfo1(databaseConnection, username, fullName, companyName,
        numOfEmps, shiftHours, numOfLoc, multLoc, stringTraining);
    
    // store the missing information in the users database
    databaseFunctions.buildSupAccount(databaseConnection, username, companyName);

    // TEST: make sure that the initial account was created correctly
    tester.printSupTable(databaseConnection, companyType);
    tester.printCompaniesServedTable(databaseConnection);
    tester.printUserTable(databaseConnection);
    
    // direct to the next page of the initial setup questionnaire
    response.sendFile(__dirname + "/Company_forms/Supervisor_specific/wc_initial2.html");
})

// listen on the port localhost:4000
program.listen(4000);
console.log("Please go to localhost:4000");