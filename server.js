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
program.set("view engine", "ejs"); // for generating the files with  ejs

// set up the library for parsing form data
let dataParse = require("body-parser");
// call the library for parsing the data
program.use(dataParse.urlencoded({extend:true}));
// for easily navigating between the forms
program.use(nodeJs.static(__dirname + "/Company_forms"));

// important global variables -> used frequently
var username = "";
var companyTypeArray = new Array(); // made an array due to a race condition so can pass by reference for updating
var fullName = "";
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

program.post("/sign_in", async function(request, response) {
    // get the username from the form
    let uname = request.body.usernameInput;

    // get the password from the form
    let pswd = request.body.pswd;

    // variables for this function
    let fName = "";
    let lName = "";
    let role = "";

    // authenticate
    let userAuth = await serverFunctions.authenticateUser(databaseConnection, 
        uname, pswd, databaseFunctions);

    console.log("User Auth: " + userAuth);

    if (userAuth) {
        userInfo = await serverFunctions.getUserInfo(databaseConnection, databaseFunctions, 
            uname);

        // parse the array of info
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
    }
    else {
        response.sendFile(__dirname + "/Company_forms/incorrect_information.html");
    }
});

program.post("/sign_up", async function(request, response) {
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

    let usernameEmailUnique = false;
    let emailUnique = await serverFunctions.checkEmail(databaseConnection, databaseFunctions,
        email);

    if (uname != "") {
        usernameEmailUnique = await serverFunctions.checkUsername(databaseConnection, 
            databaseFunctions, uname);
    }
    else if (uname == "") {
        usernameEmailUnique = true;
    }

    if (match && usernameEmailUnique && emailUnique) {
        // set the global variables
        username = email;
        //console.log("Global username changed to " + username);
        fullName = fname + " " + lname;
        //console.log("Global fullName changed to " + fullName);

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

    // use the company type to determine which initial setup to give them
    serverFunctions.splitInitialSetUp(response, companyType);
});

program.post("/company_name", async function(request, response) { // for employees only
    let companyName = request.body.companyName;

    // put the company name in the user table
    databaseFunctions.storeCompanyName(databaseConnection, username, companyName);

    // get and store the company type from the name
    companyType = await databaseFunctions.companyTypeFromName(databaseConnection, companyName, 
        companyTypeArray, username);

    response.sendFile(__dirname + "/Company_forms/Employee_specific/supervisor_name.html");
});

program.post("/supervisor_name", function(request, response) { // for employees only
    let supName = request.body.supervisorName;

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

    // validate required form data
    if (companyName == "" || numOfEmps == 0 || numOfEmps == "" || multLoc == "placeholder") {
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/wc_initial1.html"); // do not accept the input
    }
    else {
        // handling blank number input
        if (multLoc == "no") {
            numOfLoc = 0;
        }
        
        // create the general shift hours for database storage (s-e,s-e)
        let shiftHours = "";
        if (startOfLateShift == "") {
            shiftHours = startOfMornShift + "-" + endOfMornShift;
        }
        else {
            shiftHours = startOfMornShift + "-" + endOfMornShift + "," + startOfLateShift
                + "-" + endOfLateShift;
        }
        
        // create the array for the training days
        serverFunctions.createTrainingSchedule(trainingDays, monday, tuesday, wednesday,
            thursday, friday, saturday, sunday);
        
        let stringTraining = trainingDays.toString();
        
        // add company name and type to the companiesServed database (for reference)
        databaseFunctions.storeCompanyNameType(databaseConnection, companyName, companyType);
        
        // store company information for the supervisor in the approporiate supervisor database
        databaseFunctions.storeWCInitInfo1(databaseConnection, username, fullName, companyName,
            numOfEmps, shiftHours, numOfLoc, multLoc, stringTraining);
        
        // store the missing information in the users database
        databaseFunctions.buildSupAccount(databaseConnection, username, companyName);
        
        // direct to the next page of the initial setup questionnaire
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/wcr_initial2.html");
    }
});

program.post("/wcr_initial2", async function(request, response) {
    let numOfEmps = await databaseFunctions.getNumOfEmps(databaseConnection, username, companyType);
    let multLocs = await databaseFunctions.getMultLoc(databaseConnection, username, companyType);
    let roster = new Array();
    let locations = new Array();

    // get the names of employees
    serverFunctions.getEmpNames(roster, request, numOfEmps);

    // format for database
    let stringRoster = roster.toString();

    // store the roster in the database
    databaseFunctions.storeRoster(databaseConnection, username, companyType, stringRoster);

    // see if the supervisor was in charge of multiple locations
    if (multLocs == "yes") {
        let numOfLocs = await databaseFunctions.getNumOfLocs(databaseConnection, username, companyType);
        // get the location names
        serverFunctions.getLocNames(locations, request, numOfLocs);
        
        // format for database
        let stringLocations = locations.toString();

        // store the locations in the database
        databaseFunctions.storeLocNames(databaseConnection, username, companyType, stringLocations);
    }

    if (companyType == "whiteCollar") {
        // Test to make sure that everything was built correctly
        tester.printSupTable(databaseConnection, companyType);
        tester.printCompaniesServedTable(databaseConnection);
        tester.printUserTable(databaseConnection);

        serverFunctions.buildAndSendHome(response, fullName, "supervisor");
    }
    else if (companyType == "retail") {
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/shift_times.html");
    }
});

program.post("/r_initial1", function(request, response) {
    let weekdayShifts = new Array();
    let weekendShifts = new Array();

    // get the information from the form
    let companyName = request.body.companyName;
    let numOfEmps = request.body.numOfEmps;
    let multLoc = request.body.multLoc;
    let numOfLoc = request.body.numOfLoc;
    let numOfShifts = request.body.numOfShifts;
    let mon = request.body.monday;
    let tues = request.body.tuesday;
    let wed = request.body.wednesday;
    let thur = request.body.thursday
    let fri = request.body.friday;
    let sat = request.body.saturday;
    let sun = request.body.sunday;

    // validate required form data
    if (companyName == "" || numOfEmps == 0 || numOfEmps == "" || numOfShifts == 0 
        || numOfShifts == "" || multLoc == "placeholder") {
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/r_initial1.html"); // do not accept the input
    }
    else {
        // handling blank number input
        if (multLoc == "no") {
            numOfLoc = 0;
        }
        
        // create the weekday shift
        serverFunctions.createWeekDayShift(weekdayShifts, mon, tues, wed, thur, fri);
        
        // create the weekend shift
        serverFunctions.createWeekendShift(weekendShifts, sat, sun);
        
        // format for the database
        let stringWeekday = weekdayShifts.toString();
        let stringWeekend = weekendShifts.toString();
        
        // add company name and type to the companiesServed database (for reference)
        databaseFunctions.storeCompanyNameType(databaseConnection, companyName, companyType);
        
        // store company information for the supervisor in the approporiate supervisor database
        databaseFunctions.storeREFInitInfo1(databaseConnection, companyType, username, fullName, 
            companyName, numOfEmps, numOfShifts, numOfLoc, multLoc, stringWeekday, stringWeekend);
            
        // store the missing information in the users database
        databaseFunctions.buildSupAccount(databaseConnection, username, companyName);
        
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/wcr_initial2.html");
    }
});

program.post("/l_initial1", function(request, response) {
    // get the information from the form
    let companyName = request.body.companyName;
    let numOfEmps = request.body.numOfEmps;
    let numOfShifts = request.body.numOfShifts;
    let multLoc = request.body.multLoc;
    let numOfLoc = request.body.numOfLoc;

    // validate required form data
    if (companyName == "" || numOfEmps == 0 || numOfEmps == "" || numOfShifts == 0 
        || numOfShifts == "" || multLoc == "placeholder") {
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/l_initial1.html"); // do not accept the input
    }
    else {
        // handling blank number input
        if (multLoc == "no") {
            numOfLoc = 0;
        }
        
        // add the company name and type to the companiesServed database (for reference)
        databaseFunctions.storeCompanyNameType(databaseConnection, companyName, companyType);
        
        // store company information for the supervisor in the approporiate supervisor database
        databaseFunctions.storeLInitInfo1(databaseConnection, username, fullName, 
            companyName, numOfEmps, numOfShifts, numOfLoc, multLoc);
            
        // store the missing information in the users database
        databaseFunctions.buildSupAccount(databaseConnection, username, companyName);
        
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/l_initial2.html");
    }
});

program.post("/l_initial2", async function(request, response) {
    let numOfEmps = await databaseFunctions.getNumOfEmps(databaseConnection, username, companyType);
    let multLocs = await databaseFunctions.getMultLoc(databaseConnection, username, companyType);
    let roster = new Array();
    let locations = new Array();
    let allergiesArr = new Array();
    
    // get the names of the employees
    serverFunctions.getEmpNames(roster, request, numOfEmps);
    console.log("Roster: " + roster);

    // format for database
    let stringRoster = roster.toString();

    // store the roster in the database
    databaseFunctions.storeRoster(databaseConnection, username, companyType, stringRoster);

    // see if the supervisor was in charge of multiple locations
    if (multLocs == "yes") {
        let numOfLocs = await databaseFunctions.getNumOfLocs(databaseConnection, username, companyType);
        // get the location names
        serverFunctions.getLocNames(locations, request, numOfLocs);
        console.log("Locations: " + locations);
        
        // format for database
        let stringLocations = locations.toString();

        // store the locations in the database
        databaseFunctions.storeLocNames(databaseConnection, username, companyType, stringLocations);

        // add any allergies at the locations
        serverFunctions.getAllergies(allergiesArr, request, numOfLocs, locations);
        
        // format for database
        let strAllergies = allergiesArr.toString();
        
        // store the allergies
        databaseFunctions.storeAllergies(databaseConnection, username, companyType, strAllergies);
    }

    response.sendFile(__dirname + "/Company_forms/Supervisor_specific/shift_times.html");
});

program.post("/e_initial1", function(request, response) {
    let weekdayShifts = new Array();
    let weekendShifts = new Array();

    // get the information from the form
    let companyName = request.body.companyName;
    let numOfEmps = request.body.numOfEmps;
    let numOfShifts = request.body.numOfShifts;
    let multLoc = request.body.multLoc;
    let numOfLoc = request.body.numOfLoc;
    let mon = request.body.monday;
    let tues = request.body.tuesday;
    let wed = request.body.wednesday;
    let thur = request.body.thursday;
    let fri = request.body.friday;
    let sat = request.body.saturday;
    let sun = request.body.sunday;

    // validate required form data
    if (companyName == "" || numOfEmps == 0 || numOfEmps == "" || numOfShifts == 0 
        || numOfShifts == "" || multLoc == "placeholder") {
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/e_initial1.html"); // do not accept the input
    }
    else {
        // handling blank number input
        if (multLoc == "no") {
            numOfLoc = 0;
        }
        
        // create the weekday shift
        serverFunctions.createWeekDayShift(weekdayShifts, mon, tues, wed, thur, fri);
        
        // create the weekend shift
        serverFunctions.createWeekendShift(weekendShifts, sat, sun);
        
        // format for the database
        let stringWeekday = weekdayShifts.toString();
        let stringWeekend = weekendShifts.toString();
        
        // add company name and type to the companiesServed database (for reference)
        databaseFunctions.storeCompanyNameType(databaseConnection, companyName, companyType);
        
        // store company information for the supervisor in the approporiate supervisor database
        databaseFunctions.storeREFInitInfo1(databaseConnection, companyType, username, 
            fullName, companyName, numOfEmps, numOfShifts, numOfLoc, multLoc, stringWeekday, 
            stringWeekend);
        
        // store the missing information in the users database
        databaseFunctions.buildSupAccount(databaseConnection, username, companyName);
        
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/e_initial2.html");
    }
});

program.post("/e_initial2", async function(request, response) {
    let numOfEmps = await databaseFunctions.getNumOfEmps(databaseConnection, username, companyType);
    let multLocs = await databaseFunctions.getMultLoc(databaseConnection, username, companyType);
    let roster = new Array();
    let locations = new Array();
    let allergiesArr = new Array();
    
    // get the names of the employees
    serverFunctions.getEmpNames(roster, request, numOfEmps);
    console.log("Roster: " + roster);

    // format for database
    let stringRoster = roster.toString();

    // store the roster in the database
    databaseFunctions.storeRoster(databaseConnection, username, companyType, stringRoster);

    // see if the supervisor was in charge of multiple locations
    if (multLocs == "yes") {
        let numOfLocs = await databaseFunctions.getNumOfLocs(databaseConnection, username, companyType);
        // get the location names
        serverFunctions.getLocNames(locations, request, numOfLocs);
        console.log("Locations: " + locations);
        
        // format for database
        let stringLocations = locations.toString();

        // store the locations in the database
        databaseFunctions.storeLocNames(databaseConnection, username, companyType, stringLocations);

        // add any allergies at the locations
        serverFunctions.getFoodAllergies(allergiesArr, request, numOfLocs, locations);
        
        // format for database
        let strAllergies = allergiesArr.toString();
        
        // store the allergies
        databaseFunctions.storeAllergies(databaseConnection, username, companyType, strAllergies);
    }
    response.sendFile(__dirname + "/Company_forms/Supervisor_specific/shift_times.html");
});

program.post("/f_initial1", function(request, response) {
    let weekdayShifts = new Array();
    let weekendShifts = new Array();

    // get the information from the form
    let companyName = request.body.companyName;
    let numOfEmps = request.body.numOfEmps;
    let numOfShifts = request.body.numOfShifts;
    let multLoc = request.body.multLoc;
    let numOfLoc = request.body.numOfLoc;
    let mon = request.body.monday;
    let tues = request.body.tuesday;
    let wed = request.body.wednesday;
    let thur = request.body.thursday;
    let fri = request.body.friday;
    let sat = request.body.saturday;
    let sun = request.body.sunday;

    // validate required form data
    if (companyName == "" || numOfEmps == 0 || numOfEmps == "" || numOfShifts == 0 
        || numOfShifts == "" || multLoc == "placeholder") {
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/f_initial1.html"); // do not accept the input
    }
    else {
        // handling blank number input
        if (multLoc == "no") {
            numOfLoc = 0;
        }

        // create the weekday shift
        serverFunctions.createWeekDayShift(weekdayShifts, mon, tues, wed, thur, fri);
        
        // create the weekend shift
        serverFunctions.createWeekendShift(weekendShifts, sat, sun);
        
        // format for the database
        let stringWeekday = weekdayShifts.toString();
        let stringWeekend = weekendShifts.toString();
        
        // add company name and type to the companiesServed database (for reference)
        databaseFunctions.storeCompanyNameType(databaseConnection, companyName, companyType);
        
        // store company information for the supervisor in the approporiate supervisor database
        databaseFunctions.storeREFInitInfo1(databaseConnection, companyType, username, 
            fullName, companyName, numOfEmps, numOfShifts, numOfLoc, multLoc, stringWeekday, 
            stringWeekend);
            
        // store the missing information in the users database
        databaseFunctions.buildSupAccount(databaseConnection, username, companyName);
        
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/f_initial2.html");
    }
});

program.post("/f_initial2", async function(request, response) {
    let numOfEmps = await databaseFunctions.getNumOfEmps(databaseConnection, username, companyType);
    let multLocs = await databaseFunctions.getMultLoc(databaseConnection, username, companyType);
    let roster = new Array();
    let locations = new Array();
    let allergiesArr = new Array();
    
    // get the names of the employees
    serverFunctions.getEmpNames(roster, request, numOfEmps);
    console.log("Roster: " + roster);

    // format for database
    let stringRoster = roster.toString();

    // store the roster in the database
    databaseFunctions.storeRoster(databaseConnection, username, companyType, stringRoster);

    // see if the supervisor was in charge of multiple locations
    if (multLocs == "yes") {
        let numOfLocs = await databaseFunctions.getNumOfLocs(databaseConnection, username, companyType);
        // get the location names
        serverFunctions.getLocNames(locations, request, numOfLocs);
        console.log("Locations: " + locations);
        
        // format for database
        let stringLocations = locations.toString();

        // store the locations in the database
        databaseFunctions.storeLocNames(databaseConnection, username, companyType, stringLocations);

        // add any allergies at the locations
        serverFunctions.getFoodAllergies(allergiesArr, request, numOfLocs, locations);
        
        // format for database
        let strAllergies = allergiesArr.toString();
        
        // store the allergies
        databaseFunctions.storeAllergies(databaseConnection, username, companyType, strAllergies);
    }
    
    response.sendFile(__dirname + "/Company_forms/Supervisor_specific/shift_times.html");
});

program.post("/shift_times", async function(request, response) {
    if (companyType != "whiteCollar") { // white collar users should not be accessing this feature
        let numOfShifts = await databaseFunctions.getNumOfShifts(databaseConnection, username, companyType);
        let shiftTimes = new Array();

        // make sure that the shift that was entered wasn't 0 
        if (numOfShifts == 0) {
            response.sendFile(__dirname + "/Company_forms/Supervisor_specific/shift_number.html");
        }
        else {
            // get the times for the shifts
            serverFunctions.getShiftTimes(shiftTimes, request, numOfShifts);
            console.log("Shift times: " + shiftTimes);
            
            // format for database
            let stringShifts = shiftTimes.toString();
            
            // store the shift times in the database
            databaseFunctions.storeShiftTimes(databaseConnection, username, companyType, stringShifts);
            
            // Test to make sure that everything was built correctly
            tester.printSupTable(databaseConnection, companyType);
            tester.printCompaniesServedTable(databaseConnection);
            tester.printUserTable(databaseConnection);
            
            serverFunctions.buildAndSendHome(response, fullName, "supervisor");
        }
    }
});

program.post("/disclaimer", function(request, response) {
    // send to the employee Home Page
    serverFunctions.buildAndSendHome(response, fullName, "employee");
});

program.post("/viewDisclaimer", function(request, response) {
    response.sendFile(__dirname + "/Company_forms/Employee_specific/disclaimer_page.html");
});

program.post("/inputPref", function(request, response) {
    console.log("Sending to preference form for " + companyType);

    // send to the appropriate questionnaire form based on their company type
    serverFunctions.directQuestionnaire(response, companyType);
});

program.post("/return_home", function(request, response) {
    // send back to the Home Page
    serverFunctions.buildAndSendHome(response, fullName, "employee");
})

program.post("/wc_pref", async function(request, response) {
    // get the variables from the form
    let nickname = "";
    if (request.body.nickname != "Enter nickname") {
        nickname = request.body.nickname;
        console.log("The nickname is: " + nickname);
    }
    else {
        console.log("The user did not supply a nickname");
    }

    // get the shift time preferences
    let shiftPref = new Array(); // there can be multiple preferences
    if (request.body.firstShift != undefined) {
        shiftPref.push(request.body.firstShift);
        console.log("The first shift was picked")
    }
    else {
        console.log("The first shift was not picked");
    }

    if (request.body.laterShift != undefined && request.body.laterShift != "") {
        shiftPref.push(request.body.laterShift);
        console.log("The later shift was picked");
    }
    else {
        console.log("The later shift was not picked");
    }

    // get the location preferences
    let locPref = new Array(); // there can be multiple location preferences
    // get the supervisor's email
    let supervisor = await databaseFunctions.getSupervisor(databaseConnection, username, 
        companyType);
    // get the number of locations from the supervisor's table
    let locNum = await databaseFunctions.getNumOfLocs(databaseConnection, supervisor, 
        companyType);
    // parse through the forms location variables
    serverFunctions.getLocationPref(locPref, locNum, request);

    // store all info in the database
    databaseFunctions.storeWCEmpPref(databaseConnection, username,
        nickname, shiftPref, locPref);

    // Test to make sure that everything has been saved properly
    tester.printFullEmpTable(databaseConnection, username, companyType);

    // send to the congratulations page
    response.sendFile(__dirname + "/Company_forms/Employee_specific/congratulations.html");
});

program.post("/r_pref", async function(request, response) {
    // get the variables from the form
    let nickname = "";
    if (request.body.nickname != "Enter nickname") {
        nickname = request.body.nickname;
        console.log("The nickname is: " + nickname);
    }
    else {
        console.log("The user did not supply a nickname");
    }

    // get the supervisor's email
    let supervisor = await databaseFunctions.getSupervisor(databaseConnection, username, 
        companyType);

    // get the number of shifts
    let num = await databaseFunctions.getNumOfShifts(databaseConnection, supervisor, 
        companyType);
    // get the shifts
    let shiftPref = new Array(); // there can be multiple shift preferences
    serverFunctions.getShiftTimePref(shiftPref, request, num);
    console.log("Shift Preference(s): " + shiftPref);

    // get if prefer weekdays/weekends/both
    let weekPref = new Array(); // there can be multiple preferences
    // see if there are weekdays offered
    let weekdays = await databaseFunctions.getWeekdays(databaseConnection, supervisor, 
        companyType);
    // see if there are weekends offfered
    let weekends = await databaseFunctions.getWeekends(databaseConnection, supervisor,
        companyType);
    if (weekdays.length > 0 && weekends.length > 0) {
        serverFunctions.getWeekDayEnd(weekPref, request);
        console.log("Week Preference(s): " + weekPref);
    }

    // get the number of days
    let dayNum = await serverFunctions.getNumOfDays(databaseConnection, databaseFunctions, 
        supervisor, companyType);
    
    // get the day preferences
    let dayPref = new Array(); // there can be multiple days
    serverFunctions.getDayPref(dayPref, request, dayNum);
    console.log("Day Preference(s): " + dayPref);
    
    // get the location preferences
    let locPref = new Array(); // there can be multiple location preferences
    // get the number of locations from the supervisor's table
    let locNum = await databaseFunctions.getNumOfLocs(databaseConnection, supervisor, 
        companyType);
    // parse through the forms location variables
    serverFunctions.getLocationPref(locPref, locNum, request);
    console.log("Location Preference(s): " + locPref);

    // store all info in the database
    databaseFunctions.storeREmpPref(databaseConnection, username, nickname, shiftPref,
        weekPref, dayPref, locPref);
        
    // Test to make sure that everything has been saved properly
    tester.printFullEmpTable(databaseConnection, username, companyType);

    // send to the congratulations page
    response.sendFile(__dirname + "/Company_forms/Employee_specific/congratulations.html");
});

program.post("/ef_pref", async function(request, response) {
    // get the variables from the form
    let nickname = "";
    if (request.body.nickname != "Enter nickname") {
        nickname = request.body.nickname;
        console.log("The nickname is: " + nickname);
    }
    else {
        console.log("The user did not supply a nickname");
    }

    // get the allergies
    let allergies = new Array();
    serverFunctions.getEmpAllergiesEF(allergies, request);
    console.log("Allergies: " + allergies);

    // get the supervisor's email
    let supervisor = await databaseFunctions.getSupervisor(databaseConnection, username, 
        companyType);
    // get the number of shifts
    let num = await databaseFunctions.getNumOfShifts(databaseConnection, supervisor,
        companyType);
    // get the shifts
    let shiftPref = new Array(); // there can be multiple shift preferences
    serverFunctions.getShiftTimePref(shiftPref, request, num);
    console.log("Shift Preference(s): " + shiftPref);

    // get if prefer weekdays/weekends/both
    let weekPref = new Array(); // there can be multiple preferences
    // see if there are weekdays offered
    let weekdays = await databaseFunctions.getWeekdays(databaseConnection, supervisor, 
        companyType);
    // see if there are weekends offfered
    let weekends = await databaseFunctions.getWeekends(databaseConnection, supervisor,
        companyType);
    if (weekdays.length > 0 && weekends.length > 0) {
        serverFunctions.getWeekDayEnd(weekPref, request);
        console.log("Week Preference(s): " + weekPref);
    }

    // get the number of days
    let dayNum = await serverFunctions.getNumOfDays(databaseConnection, databaseFunctions, 
        supervisor, companyType);
    
    // get the day preferences
    let dayPref = new Array(); // there can be multiple days
    serverFunctions.getDayPref(dayPref, request, dayNum);
    console.log("Day Preference(s): " + dayPref);
    
    // get the location preferences
    let locPref = new Array(); // there can be multiple location preferences
    // get the number of locations from the supervisor's table
    let locNum = await databaseFunctions.getNumOfLocs(databaseConnection, supervisor, 
        companyType);
    // parse through the forms location variables
    serverFunctions.getLocationPref(locPref, locNum, request);
    console.log("Location Preference(s): " + locPref);

    // store all info in the database
    databaseFunctions.storeEFEmpPref(databaseConnection, username, companyType, nickname, 
        allergies, shiftPref, weekPref, dayPref, locPref);
        
    // Test to make sure that everything has been saved properly
    tester.printFullEmpTable(databaseConnection, username, companyType);

    // send to the congratulations page
    response.sendFile(__dirname + "/Company_forms/Employee_specific/congratulations.html");
});

program.post("/l_pref", async function(request, response) {
    // get the variables from the form
    let nickname = "";
    if (request.body.nickname != "Enter nickname") {
        nickname = request.body.nickname;
        console.log("The nickname is: " + nickname);
    }
    else {
        console.log("The user did not supply a nickname");
    }

    // get the years of service
    let serveYears = 0;
    if (request.body.yearsServe != "") {
        serveYears = request.body.yearsServe;
        console.log("Years served by employee: " + serveYears);
    }
    else {
        console.log("Employee must supply a number for YearsServed");
        response.sendFile(__dirname + "/Company_forms/Employee_specific/l_questionnaire.html");
    }

    // get the allergies
    let allergies = new Array();
    serverFunctions.getEmpAllergiesL(allergies, request);
    console.log("Allergies: " + allergies);

    // get the supervisor's email
    let supervisor = await databaseFunctions.getSupervisor(databaseConnection, username, 
        companyType);
    // get the number of shifts
    let num = await databaseFunctions.getNumOfShifts(databaseConnection, supervisor,
        companyType);
    // get the shifts
    let shiftPref = new Array(); // there can be multiple shift preferences
    serverFunctions.getShiftTimePref(shiftPref, request, num);
    console.log("Shift Preference(s): " + shiftPref);
    // get the last shift worked
    let lastWorked = request.body.lastShift;
    console.log("The last shift that the employee worked was: " + lastWorked);

    // get the location preferences
    let locPref = new Array(); // there can be multiple location preferences
    // get the number of locations from the supervisor's table
    let locNum = await databaseFunctions.getNumOfLocs(databaseConnection, supervisor, 
        companyType);
    // parse through the forms location variables
    serverFunctions.getLocationPref(locPref, locNum, request);
    console.log("Location Preference(s): " + locPref);

    // store all info in the database - NOT DONE
    databaseFunctions.storeLEmpPref(databaseConnection, username, nickname, serveYears,
        allergies, shiftPref, lastWorked, locPref);
    
    // test to make sure that everything has been saved properly
    // tester.printFullEmpTable(databaseConnection, username, companyType);
    
    // send to the congratulations page
    response.sendFile(__dirname + "/Company_forms/Employee_specific/congratulations.html");
});


// for dynamically creating the supervisor forms
program.get("/getNumOfEmps", async function(request, response) {
    let numOfEmps = await databaseFunctions.getNumOfEmps(databaseConnection, username, 
        companyType);
    response.send(JSON.stringify(numOfEmps));
});

program.get("/multLocYN", async function(request, response) {
    let yN = await databaseFunctions.getMultLoc(databaseConnection, username, companyType);
    response.send(JSON.stringify(yN));
});

program.get("/numLoc", async function(request, response) {
    let numOfLocs = await databaseFunctions.getNumOfLocs(databaseConnection, username, 
        companyType);
    response.send(JSON.stringify(numOfLocs));
});

program.get("/getNumOfShifts", async function(request, response) {
    let numOfShifts = await databaseFunctions.getNumOfShifts(databaseConnection, username, 
        companyType);
    response.send(JSON.stringify(numOfShifts));
});

// for dynamically creating the employee forms
program.get("/getShifts", async function(request, response) {
    // get the supervisor's email
    let supervisor = await databaseFunctions.getSupervisor(databaseConnection, username, 
        companyType);
    
    // get the shifts
    let shifts = await databaseFunctions.getShifts(databaseConnection, supervisor, 
        companyType);

    console.log("Shifts retrieved = " + shifts);
    // send the array of shifts
    response.send(JSON.stringify(shifts));  
});

program.get("/getMultLoc", async function(request, response) {
    // get the supervisor's email
    let supervisor = await databaseFunctions.getSupervisor(databaseConnection, username, 
        companyType);

    // get the supervisor's response of multiple locations from their table
    let yN = await databaseFunctions.getMultLoc(databaseConnection, supervisor, companyType);

    // send the response
    response.send(JSON.stringify(yN));
});

program.get("/getNumLocEmp", async function(request, response) {
    // get the supervisor's email
    let supervisor = await databaseFunctions.getSupervisor(databaseConnection, username, 
        companyType);
    
    // get the number of locations from the supervisor's table
    let locNum = await databaseFunctions.getNumOfLocs(databaseConnection, supervisor, 
        companyType);
    
    // send the response
    response.send(JSON.stringify(locNum));
});

program.get("/getLocationNames", async function(request, response) {
    // get the supervisor's email
    let supervisor = await databaseFunctions.getSupervisor(databaseConnection, username, 
        companyType);
    
    // get the names of the locations
    let locations = await databaseFunctions.getLocationNames(databaseConnection, supervisor, 
        companyType);
    
    console.log("Locations = " + locations);
    // send the array
    response.send(JSON.stringify(locations));
});

program.get("/getShiftNumEmp", async function(request, response) {
    // get the supervisor's email
    let supervisor = await databaseFunctions.getSupervisor(databaseConnection, username, 
        companyType);

    // get the number of shifts
    let numShifts = await databaseFunctions.getNumOfShifts(databaseConnection, supervisor, 
        companyType);
    
    console.log("Number of shifts: " + numShifts);
    // send the information
    response.send(JSON.stringify(numShifts));
});

program.get("/getWeekdaysEmp", async function(request, response) {
    // get the supervisor's email
    let supervisor = await databaseFunctions.getSupervisor(databaseConnection, username, 
        companyType);
    
    // get the weekday shifts
    let weekdays = await databaseFunctions.getWeekdays(databaseConnection, supervisor,
        companyType);

    console.log("Weekday Shifts: " + weekdays);
    // send the information
    response.send(JSON.stringify(weekdays));
});

program.get("/getWeekendEmp", async function(request, response) {
    // get the supervisor's email
    let supervisor = await databaseFunctions.getSupervisor(databaseConnection, username, 
        companyType);
    
    // get the weekend shifts
    let weekends = await databaseFunctions.getWeekends(databaseConnection, supervisor,
        companyType);

    console.log("Weekend Shifts: " + weekends);
    // send the information
    response.send(JSON.stringify(weekends));
});

// listen on the port localhost:4000
program.listen(4000);
console.log("Please go to localhost:4000");