// Initial Database Creation
function createTable(databaseConnection, tableName, tableElements) {
    let queryCommand = "CREATE TABLE schedularDatabase." + tableName + " (" + tableElements + ");";
    databaseConnection.query(queryCommand, function(error, sqlResult) {
        if (error) {
            console.log("ERROR: unable to create table " + tableName + "- " + error);
        }
        else {
            console.log("SUCCESS: Created " + tableName);
        }
    });
}

function startDatabase(databaseConnection) {
    // connect to the database
    databaseConnection.connect(function(error) {
        if (error) {
            console.log("ERROR: Unable to connect in start-up");
        }
        else {
            console.log("SUCCESS: Connected to database for start-up");
        }

    });

    // detect if there is a database already
    let queryCommand = "SHOW DATABASES;";
    databaseConnection.query(queryCommand, function(error, sqlResult) {
        if (error) {
            console.log("ERROR: Could not read the result from MySQL");
        }
        else {
            let databaseExists = false;
            // go through the results to find the database
            for (let index = 0; index < sqlResult.length; index++) {
                if (sqlResult[index].Database == "schedularDatabase") {
                    databaseExists = true;
                }
            }

            // if the database exists...
            if (databaseExists) {
                console.log("The database exists");
            }
            else { // the database does not exist
                // create the database
                queryCommand = "CREATE DATABASE schedularDatabase;";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("ERROR: unable to create database");
                    }
                    else {
                        console.log("SUCCESS: Created database");
                    }
                });

                // create the tables within the database

                // table for all users
                let tableName = "usersTable";
                let tableElements = "email VARCHAR(255) PRIMARY KEY, username VARCHAR(255), fname VARCHAR(255)," 
                    + " lname VARCHAR(255), password VARCHAR(255), status VARCHAR(255),"
                    + " companyName VARCHAR(255), companyType VARCHAR(255)";
                createTable(databaseConnection, tableName, tableElements);
                
                // table for keeping track of the companies that use the database
                tableName = "companiesServed";
                tableElements = "companyName VARCHAR(255) PRIMARY KEY, companyType VARCHAR(255)";
                createTable(databaseConnection, tableName, tableElements);

                // table for white collar employees
                tableName = "wcEmpInfo";
                let commonElements = "email VARCHAR(255) PRIMARY KEY, fullName VARCHAR(255),"
                    + " nickname VARCHAR(255), supName VARCHAR(255), timeOff VARCHAR(255)," 
                    + " locationPref VARCHAR(255), shiftTimePref VARCHAR(255)"; // elements all tables have in common
                createTable(databaseConnection, tableName, commonElements);

                // table for retail employees
                tableName = "rEmpInfo";
                tableElements = commonElements + ", weekPref VARCHAR(255), dayPref VARCHAR(255)";
                createTable(databaseConnection, tableName, tableElements);
                
                // table for entertainment employees
                tableName = "eEmpInfo";
                tableElements = commonElements + ", weekPref VARCHAR(255), dayPref VARCHAR(255),"
                    + " allergies VARCHAR(255)";
                createTable(databaseConnection, tableName, tableElements);

                // table for food employees (the same as entertainment)
                tableName = "fEmpInfo";
                createTable(databaseConnection, tableName, tableElements);
                
                // table for law enforcement employees
                tableName = "lEmpInfo";
                tableElements = commonElements + ", lastShift VARCHAR(255), allergies VARCHAR(255),"
                    + " yearsServed INT";
                createTable(databaseConnection, tableName, tableElements);
                
                // table for white collar schedule details
                tableName = "wcSupInfo";
                commonElements = "supEmail VARCHAR(255) PRIMARY KEY,"
                    + " supFullName VARCHAR(255), companyName VARCHAR(255),"
                    + " numOfEmps INT, roster VARCHAR(255),"
                    + " locationNames VARCHAR(255), shiftHours VARCHAR(255),"
                    + " multLoc VARCHAR(255), numOfLoc INT";
                tableElements = commonElements + ", trainingDays VARCHAR(255)";
                createTable(databaseConnection, tableName, tableElements);
               
                // table for reatil schedule details
                commonElements = commonElements + ", numOfShifts INT"; // similar attributes for the rest of the tables
                tableName = "rSupInfo";
                tableElements = commonElements + ", shiftDaysWeek VARCHAR(255), shiftDaysWeekend VARCHAR(255)";
                createTable(databaseConnection, tableName, tableElements);
               
                // table for entertainment schedule details
                tableName = "eSupInfo";
                tableElements = commonElements + ", shiftDaysWeek VARCHAR(255), shiftDaysWeekend VARCHAR(255),"
                    + " allergies VARCHAR(255)";
                createTable(databaseConnection, tableName, tableElements);

                // table for food schedule details (same as entertainment)
                tableName = "fSupInfo";
                createTable(databaseConnection, tableName, tableElements);
                
                // table for law enforcement schedule details
                tableName = "lSupInfo";
                tableElements = commonElements + ", allergies VARCHAR(255)";
                createTable(databaseConnection, tableName, tableElements);

                // database and tables now created
                console.log("The database and tables are ready for use!");
               
            }
        }
    });
}

// helper functions
function determineEmpTable(type) {
    let table = "";

    if (type == "whiteCollar") {
        table = "wcEmpInfo";
    }
    else if (type == "entertainment") {
        table = "eEmpInfo";
    } 
    else if (type == "lawEnforcement") {
        table = "lEmpInfo";
    }
    else if (type == "food") {
        table = "fEmpInfo";
    }
    else if (type == "retail") {
        table = "rEmpInfo";
    }

    return table;
}

function determineSupTable(type) {
    let table = "";

    if (type == "whiteCollar") {
        table = "wcSupInfo";
    }
    if (type == "entertainment") {
        table = "eSupInfo";
    }
    if (type == "lawEnforcement") {
        table = "lSupInfo";
    }
    if (type == "food") {
        table = "fSupInfo";
    }
    if (type == "retail") {
        table = "rSupInfo";
    }

    return table;
}

// functions for storing information
function storeGeneralSignUpInfo(databaseConnection, email, uname, 
    fname, lname, password, status) {
    let queryCommand = 'INSERT INTO schedularDatabase.usersTable (email, '
        + 'username, fname, lname, password, status) VALUES ("' + email 
        + '", "' + uname + '", "' + fname + '", "' + lname + '", "'
        + password + '", "' + status + '");';
    databaseConnection.query(queryCommand, function(error, sqlResult) {
        if (error) {
            console.log("ERROR: Unable to insert general info into usersTable");
        }
        else {
            console.log("SUCCESS: Added general information to the usersTable");
        }
    });
}

function storeCompanyType(databaseConnection, email, companyType) {
    let queryCommand = 'UPDATE schedularDatabase.usersTable SET companyType = ' 
        + '"' + companyType + '" WHERE email = "' + email + '";';
    databaseConnection.query(queryCommand, function(error, sqlResult) {
        if (error) {
            console.log("ERROR: Unable to insert company type to usersTable");
        }
        else {
            console.log("SUCCESS: Added company type to usersTable");
        }
    });
}

function buildEmpAccount(databaseConnection, email, fullName, companyType, 
    supName) {
    // determine which table the user is in
    let table = determineEmpTable(companyType);

    // make sure that the table is good
    if (table == "") {
        console.log("ERROR: Employee Company Type is invalid");
    }
    else {
        let queryCommand = 'INSERT INTO schedularDatabase.' + table
            + ' (email, fullName, supName) VALUES ("' + email + '", "' + fullName + '", "'
            + supName + '");';
        databaseConnection.query(queryCommand, function(error, sqlResult) {
            if (error) {
                console.log("ERROR: Unable to enter info in Employee's table");
            }
            else {
                console.log("SUCCESS: Able to build employee account in table");
            }
        });
    }
}

function buildSupAccount(databaseConnection, email, companyName) {
    let queryCommand = 'UPDATE schedularDatabase.usersTable SET companyName = '
        + '"' + companyName + '" WHERE email = "' + email + '";';
    databaseConnection.query(queryCommand, function(error, sqlResult) {
        if (error) {
            console.log("ERROR: Unable to update Users Table with Sup Company Name");
        }
        else {
            console.log("SUCCESS: Company Name for Sup has been added to the User Table");
        }
    });
}

function storeCompanyName(databaseConnection, email, companyName) {
    let queryCommand = 'UPDATE schedularDatabase.usersTable SET companyName = '
        + '"' + companyName + '" WHERE email = "' + email + '";';
    databaseConnection.query(queryCommand, function(error, sqlResult) {
        if (error) {
            console.log("ERROR: Unable to add company name to usersTable");
        }
        else {
            console.log("SUCCESS: Added company name to usersTable");
        }
    });
}

async function storeCompanyNameType(databaseConnection, companyName, companyType) {
    let stored = false;

    let result = await determineStored(databaseConnection);

    for (let i = 0; i < result.length; i++) {
        if (result[i].companyName === companyName) {
            stored = true;
            console.log("The company is already registered");
        }
    }

    if (!stored) {
        let queryCommand = 'INSERT INTO schedularDatabase.companiesServed '
            + '(companyName, companyType) VALUES ("' + companyName + '", "' + companyType + '");';
        databaseConnection.query(queryCommand, function(error, sqlResult) {
            if (error) {
                console.log("ERROR: Unable to add to companiesServed table");
            }
            else {
                console.log("SUCCESS: Added company info to companiesServed table");
            }
        });
    }
}

function storeWCInitInfo1(databaseConnection, email, fullName, companyName,
    numOfEmps, shiftHours, numOfLoc, multLoc, stringTraining) {
    let queryCommand = 'INSERT INTO schedularDatabase.wcSupInfo (supEmail, supFullName, '
        + 'companyName, numOfEmps, shiftHours, numOfLoc, multLoc, trainingDays) VALUES ("' + email
        + '", "' + fullName + '", "' + companyName + '", "' + numOfEmps + '", "' + shiftHours
        + '", "' + numOfLoc + '", "' + multLoc + '", "' + stringTraining + '");';
    databaseConnection.query(queryCommand, function(error, sqlResult) {
        if (error) {
            console.log("ERROR: Unable to add init1 to wcSupInfo");
        }
        else {
            console.log("SUCCESS: Added init1 to wcSupInfo");
        }
    });
}

function storeREFInitInfo1(databaseConnection, companyType, email, fullName, 
    companyName, numOfEmps, numOfShifts, numOfLoc, multLoc, stringWeekday, stringWeekend) {
    let table = determineSupTable(companyType);

    if (table == "") {
        console.log("ERROR: Invalid company type");
    }
    else {
        let queryCommand = 'INSERT INTO schedularDatabase.' + table + ' '
            + '(supEmail, supFullName, companyName, numOfEmps, numOfShifts, '
            + 'numOfLoc, multLoc, shiftDaysWeek, shiftDaysWeekend) VALUES '
            + '("' + email + '", "' + fullName + '", "' + companyName+ '", '
            + numOfEmps + ', ' + numOfShifts + ', ' + numOfLoc + ', "' + multLoc
            + '", "' + stringWeekday + '", "' + stringWeekend + '");';
            
        databaseConnection.query(queryCommand, function(error, sqlResult) {
            if (error) {
                console.log("ERROR: Unable to add init1 to " + table);
            }
            else {
                console.log("SUCCESS: Added init1 to " + table);
            }
        });
    }
}

function storeLInitInfo1(databaseConnection, email, fullName, 
    companyName, numOfEmps, numOfShifts, numOfLoc, multLoc) {
    
    let queryCommand = 'INSERT INTO schedularDatabase.lSupInfo '
        + '(supEmail, supFullName, companyName, numOfEmps, numOfShifts, '
        + 'numOfLoc, multLoc) VALUES ("' + email + '", "' + fullName + '", "' 
        + companyName+ '", ' + numOfEmps + ', ' + numOfShifts + ', ' + numOfLoc 
        + ', "' + multLoc + '");';
        
    databaseConnection.query(queryCommand, function(error, sqlResult) {
        if (error) {
            console.log("ERROR: Unable to add init1 to lSupInfo");
        }
        else {
            console.log("SUCCESS: Added init1 to lSupInfo");
        }
    });
}

function storeRoster(databaseConnection, email, companyType, roster) {
    let table = determineSupTable(companyType);

    if (table == "") {
        console.log("ERROR: Company Type is Invalid");
    }
    else {
        let queryCommand = 'UPDATE schedularDatabase.' + table 
            + ' SET roster = "' + roster + '" WHERE supEmail = "' + email + '";';
        databaseConnection.query(queryCommand, function(error, sqlResult) {
            if (error) {
                console.log("ERROR: Unable to update the Supervisor's table with the roster");
            }
            else {
                console.log("SUCCESS: Roster added to " + table);
            }
        });
    }
}

function storeLocNames(databaseConnection, email, companyType, locations) {
    let table = determineSupTable(companyType);

    if (table == "") {
        console.log("ERROR: Company Type is Invalid");
    }
    else {
        let queryCommand = 'UPDATE schedularDatabase.' + table 
            + ' SET locationNames = "' + locations + '" WHERE supEmail = "' + email + '";';
        databaseConnection.query(queryCommand, function(error, sqlResult) {
            if (error) {
                console.log("ERROR: Unable to update the Supervisor's table with the location names" + error);
            }
            else {
                console.log("SUCCESS: Location names added to " + table);
            }
        });
    }
}

function storeShiftTimes(databaseConnection, email, companyType, stringShifts) {
    let table = determineSupTable(companyType);

    if (table == "") {
        console.log("ERROR: Company Type is Invalid");
    }
    else {
        let queryCommand = 'UPDATE schedularDatabase.' + table 
            + ' SET shiftHours = "' + stringShifts + '" WHERE supEmail = "' + email + '";';
        databaseConnection.query(queryCommand, function(error, sqlResult) {
            if (error) {
                console.log("ERROR: Unable to update the Supervisor's table with the shift times");
            }
            else {
                console.log("SUCCESS: Shift times added to " + table);
            }
        });
    }
}

function storeAllergies(databaseConnection, email, companyType, strAllergies) {
    let table = determineSupTable(companyType);

    if (table == "") {
        console.log("ERROR: Company Type is Invalid");
    }
    else {
        let queryCommand = 'UPDATE schedularDatabase.' + table 
            + ' SET allergies = "' + strAllergies 
            + '" WHERE supEmail = "' + email + '";';
        databaseConnection.query(queryCommand, function(error, sqlResult) {
            if (error) {
                console.log("ERROR: Unable to update the Supervisor's table with the allergies");
            }
            else {
                console.log("SUCCESS: Allergies added to " + table);
            }
        });
    }
}

function addPref(databaseConnection, queryCommand, pref, table) {
    databaseConnection.query(queryCommand, function(error, sqlResult) {
        if (error) {
            console.log("ERROR: Unable to add " + pref + " to " + table);
        }
        else {
            console.log("SUCCESS: Added " + pref + " to " + table);
        }
    });
}

function buildSingleEmpUpdate(table, catToChange, catVal, email) {
    let query = 'UPDATE schedularDatabase.' + table + ' '
            + 'SET ' + catToChange + ' = "' + catVal + '" WHERE email = "' + email + '";';
    return query;
}

function storeWCEmpPref(databaseConnection, email, nickname, shiftPref, locPref) {
    let tableName = "White Collar Employee Table"; // purely for Success/Error Logs
    let table = "wcEmpInfo";
    
    // go through each one one-by-one to make sure not empty
    
    // if the nickname is not empty, store in the database
    if (nickname != "") {
        let queryCommand = buildSingleEmpUpdate(table, "nickname", nickname, email);
        addPref(databaseConnection, queryCommand, "nickname", tableName);
    }
    
    if (shiftPref.length > 0) {
        let shifts = shiftPref.toString();
        let queryCommand = buildSingleEmpUpdate(table, "shiftTimePref", shifts, email);
        addPref(databaseConnection, queryCommand, "shift preferences", table);
    }

    if (locPref.length > 0) {
        let locations = locPref.toString();
        let queryCommand = buildSingleEmpUpdate(table, "locationPref", locations, email);
        addPref(databaseConnection, queryCommand, "location preferences", table);
    }
}

function storeREmpPref(databaseConnection, email, nickname, shiftPref, weekPref, 
    dayPref, locPref) {
    let tableName = "Retail Employee Table"; // purely for Success/Error Logs
    let table = "rEmpInfo";

    // go through the each one one-by-one to make sure not empty

    // if the nickname is not empty, store in the database
    if (nickname != "") {
        let queryCommand = buildSingleEmpUpdate(table, "nickname", nickname, email);
        addPref(databaseConnection, queryCommand, "nickname", tableName);
    }

    // if the shift preferences aren't empty, store in the database
    if (shiftPref.length > 0) {
        let shifts = shiftPref.toString();
        let queryCommand = buildSingleEmpUpdate(table, "shiftTimePref", shifts, email);
        addPref(databaseConnection, queryCommand, "shift time(s)", tableName);
    }

    // if the weekday/end preferences aren't empty, store in the database
    if (weekPref.length > 0) {
        let pref = weekPref.toString();
        let queryCommand = buildSingleEmpUpdate(table, "weekPref", pref, email);
        addPref(databaseConnection, queryCommand, "weekday/end preference(s)", tableName);
    }

    // if the days aren't empty, store in the database
    if (dayPref.length > 0) {
        let days = dayPref.toString();
        let queryCommand = buildSingleEmpUpdate(table, "dayPref", days, email);
        addPref(databaseConnection, queryCommand, "day(s) preference(s)", tableName);
    }

    // if the locations aren't empty, store in the database
    if (locPref.length > 0) {
        let locations = locPref.toString();
        let queryCommand = buildSingleEmpUpdate(table, "locationPref", locations, email);
        addPref(databaseConnection, queryCommand, "location preference(s)", table);
    }
}

function storeEFEmpPref(databaseConnection, email, companyType, nickname, allergies, 
    shiftPref, weekPref, dayPref, locPref) {
    let tableName = "";
    let table = "";
    if (companyType == "entertainment") {
        tableName = "Entertainment Employee Table";
        table = "eEmpInfo";
    }
    else if (companyType == "food") {
        tableName = "Food Employee Table";
        table = "fEmpInfo";
    }
    else {
        console.log("ERROR: Invalid company type in storeEFEmpPref");
    }

    // go through each one one-by-one to make sure not empty

    // if the nickname is not empty, store in the database
    if (nickname != "") {
        let queryCommand = buildSingleEmpUpdate(table, "nickname", nickname, email);
        addPref(databaseConnection, queryCommand, "nickname", tableName);
    }

    // if the allergies are not empty, store in the database
    if (allergies.length > 0) {
        let aller = allergies.toString();
        let queryCommand = buildSingleEmpUpdate(table, "allergies", aller, email);
        addPref(databaseConnection, queryCommand, "allergies", tableName);
    }
    
    // if the shift preferences aren't empty, store in the database
    if (shiftPref.length > 0) {
        let shifts = shiftPref.toString();
        let queryCommand = buildSingleEmpUpdate(table, "shiftTimePref", shifts, email);
        addPref(databaseConnection, queryCommand, "shift time(s)", tableName);
    }
    
    // if the weekday/end preferences aren't empty, store in the database
    if (weekPref.length > 0) {
        let pref = weekPref.toString();
        let queryCommand = buildSingleEmpUpdate(table, "weekPref", pref, email);
        addPref(databaseConnection, queryCommand, "weekday/end preference(s)", tableName);
    }
    
    // if the days aren't empty, store in the database
    if (dayPref.length > 0) {
        let days = dayPref.toString();
        let queryCommand = buildSingleEmpUpdate(table, "dayPref", days, email);
        addPref(databaseConnection, queryCommand, "day(s) preference(s)", tableName);
    }
    
    // if the locations aren't empty, store in the database
    if (locPref.length > 0) {
        let locations = locPref.toString();
        let queryCommand = buildSingleEmpUpdate(table, "locationPref", locations, email);
        addPref(databaseConnection, queryCommand, "location preference(s)", table);
    }
}

function storeLEmpPref(databaseConnection, email, nickname, serveYears, allergies, shiftPref, lastWorked, locPref) {
    let table = "Law Enforcement Employee Table";
}

// retrieving information
function determineStored(databaseConnection) {
    let queryCommand = "SELECT companyName FROM schedularDatabase.companiesServed;";
    
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to determine if company is stored in database");
            }
            else {
                resolve(sqlResult);
            } 
        });
    });
}

function getType(databaseConnection, queryCommand) {
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to retrieve company type");
            }
            else {
                let type = sqlResult[0].companyType;
                resolve(type);
            }
        });
    });
}

async function companyTypeFromName(databaseConnection, companyName, companyTypeArray, email) {
    let queryCommand = 'SELECT companyType FROM schedularDatabase.companiesServed '
        + 'WHERE companyName = "' + companyName + '";';
    
    companyTypeArray.push(await getType(databaseConnection, queryCommand));

    // store the type in the user table -> Here because of race condition
    storeCompanyType(databaseConnection, email, companyTypeArray[companyTypeArray.length - 1]);

    return companyTypeArray[companyTypeArray.length - 1];
}

function getNumE(databaseConnection, queryCommand) {
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to retrieve numberOfEmployees");
            }
            else {
                let num = sqlResult[0].numOfEmps;
                resolve(num);
            }
        });
    });
}

async function getNumOfEmps(databaseConnection, email, companyType) {
    let numOfEmps = 0;
    let table = determineSupTable(companyType);

    if (table == "") {
        console.log("ERROR: Invalid table");
    }
    else {
        // left "" to foil SQL Injection -> should not have single quote in input
        let queryCommand = "SELECT numOfEmps FROM schedularDatabase." + table 
            + " WHERE supEmail = '" + email + "';";
        
        numOfEmps = await getNumE(databaseConnection, queryCommand);
    }

    return numOfEmps;
}

function getNumL(databaseConnection, queryCommand) {
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to retrieve numberOfLocations");
            }
            else {
                let num = sqlResult[0].numOfLoc;
                resolve(num);
            }
        });
    });
}

async function getNumOfLocs(databaseConnection, email, companyType) {
    let numOfLocs = 1;
    let table = determineSupTable(companyType);

    if (table == "") {
        console.log("ERROR: Invalid table");
    }
    else {
        // left "" to foil SQL Injection -> should not have single quote in input
        let queryCommand = "SELECT numOfLoc FROM schedularDatabase." + table
            + " WHERE supEmail = '" + email + "';";

        numOfLocs = await getNumL(databaseConnection, queryCommand);
    }

    return numOfLocs;
}

function getYN(databaseConnection, queryCommand) {
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to retrieve Y/N");
            }
            else {
                let resp = sqlResult[0].multLoc;
                resolve(resp);
            }
        });
    });
}

async function getMultLoc(databaseConnection, email, companyType) {
    let table = determineSupTable(companyType);
    let multLoc = "";

    if (table == "") {
        console.log("ERROR: Invalid table");
    }
    else {
        // left "" to foil SQL Injection -> should not have single quote in input
        let queryCommand = "SELECT multLoc FROM schedularDatabase." + table
            + " WHERE supEmail = '" + email + "';";
        
        multLoc = await getYN(databaseConnection, queryCommand);
    }

    return multLoc;
}

function getShiftNum(databaseConnection, queryCommand) {
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to retrieve numberOfShifts");
            }
            else {
                let num = sqlResult[0].numOfShifts;
                resolve(num);
            }
        });
    });
}

async function getNumOfShifts(databaseConnection, email, companyType) {
    //console.log("Retrieving the number of shifts from supervisor table");

    let numOfShifts = 1;
    let table = determineSupTable(companyType);

    if (table == "") {
        console.log("ERROR: Invalid table");
    }
    else if (table == "wcSupInfo") {
        return 2; // White Collar type only has 2 shifts
    }
    else {
        // left "" to foil SQL Injection -> should not have single quote in input
        let queryCommand = "SELECT numOfShifts FROM schedularDatabase." + table
            + " WHERE supEmail = '" + email + "';";

        numOfShifts = await getShiftNum(databaseConnection, queryCommand);
    }

    return numOfShifts;
}

function getUsernamesEmails(databaseConnection) { // for checking uniqueness in sign-up
    let queryCommand = "SELECT * FROM schedularDatabase.usersTable;";

    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to read the usernames/email from usersTable");
            }
            else {
                resolve(sqlResult);
            } 
        });
    });
}

function getUserInfo(databaseConnection, username) { // for authentication while signing-in
    let queryCommand = 'SELECT * FROM schedularDatabase.usersTable WHERE email = "' 
        + username + '" OR username = "' + username + '";';
    
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to retrieve the user's account");
            }
            else {
                resolve(sqlResult);
            }
        });
    });
}

function getUserPassword(databaseConnection, username) { // for authentication while signing-in
    let queryCommand = 'SELECT password FROM schedularDatabase.usersTable WHERE email = "' 
        + username + '" OR username = "' + username + '";';
    
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to retrieve the user's account");
            }
            else {
                resolve(sqlResult);
            }
        });
    });
}
function getSupName(databaseConnection, queryCommand) {
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to retrieve supervisor's name from emp table");
            }
            else {
                let name = sqlResult[0].supName;
                // console.log("name in getSupName = " + name);

                // parse the name into first name
                let index = 0;
                let firstName = "";
                while (name[index] != " " && index < name.length) {
                    firstName = firstName + name[index];
                    index++;
                }

                index += 1;
                // parse the remainder into the last name
                let lastName = "";
                while (name[index] != " " && index < name.length) {
                    lastName = lastName + name[index];
                    index++;
                }

                // return the first and last name as an array
                resolve([firstName, lastName]);
            }
        });
    });
}

function getSupEmail(databaseConnection, queryCommand) {
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to retrieve supervisor's email from users table");
            }
            else {
                // get the email
                let email = sqlResult[0].email;
                // console.log("email in getSupEmail = " + email);

                // return the email
                resolve(email);
            }
        });
    });
}

async function getSupervisor(databaseConnection, email, companyType) {
    let table = determineEmpTable(companyType);

    if (table == "") {
        console.log("ERROR: Unable to determine Supervisor - Invalid company type");
    }
    else {
        // retrieve the supervisor's name from the employee's table
        let queryCommand1 = 'SELECT supName FROM schedularDatabase.' + table
            + ' WHERE email = "' + email + '";';
        
        let name = await getSupName(databaseConnection, queryCommand1);
        // console.log("Name[0] in getSupervisor = " + name[0]);
        // console.log("Name[1] in getSupervisor = " + name[1]);
        
        // retrieve the supervisor's email from the user's table using the full name 
        // and company type
        let queryCommand2 = 'SELECT email FROM schedularDatabase.usersTable WHERE '
            + 'fname = "' + name[0] + '" AND lname = "' + name[1] + '" and companyType = "'
            + companyType + '";';

        let supEmail = await getSupEmail(databaseConnection, queryCommand2);

        // return the email
        return supEmail;
    }
}

function retrieveDaysFromTable(databaseConnection, queryCommand, dayType) {
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to retrieve shift day(s) from supervisor table");
            }
            else {
                if (dayType == "weekdays") {
                    // get the days
                    let days = sqlResult[0].shiftDaysWeek;
                    console.log("Days in retrieveWeekdays = " + days);
                    
                    // return the days
                    resolve(days);
                }
                else if (dayType == "weekends") {
                   // get the days
                   let days = sqlResult[0].shiftDaysWeekend;
                   console.log("Days in retrieveWeekends = " + days);
                   
                   // return the days
                   resolve(days); 
                }
            }
        });
    });
}

async function getWeekdays(databaseConnection, email, companyType) {
    // get the supervisor's table
    let table = determineSupTable(companyType);

    if (table == "") {
        console.log("ERROR: Unable to determine supervisor table in getWeekdays - Invalid companyType");
    }
    else {
        let queryCommand = 'SELECT shiftDaysWeek FROM schedularDatabase.' + table
            + ' WHERE supEmail = "' + email + '";';
        
        // get the names of the days
        let days = await retrieveDaysFromTable(databaseConnection, queryCommand, "weekdays");
        console.log("Days in getWeekdays = " + days);

        // return the string
        return days;
    }
}

async function getWeekends(databaseConnection, email, companyType) {
    // get the supervisor's table
    let table = determineSupTable(companyType);

    if (table == "") {
        console.log("ERROR: Unable to determine supervisor table in getWeekends - Invalid companyType");
    }
    else {
        let queryCommand = 'SELECT shiftDaysWeekend FROM schedularDatabase.' + table
            + ' WHERE supEmail = "' + email + '";';
        
        // get the names of the days
        let days = await retrieveDaysFromTable(databaseConnection, queryCommand, "weekends");
        console.log("Days in getWeekends = " + days);

        // return the string
        return days;
    }
}

function retrieveShiftsFromTable(databaseConnection, queryCommand) {
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to retrieve shifts from supervisor table");
            }
            else {
                // get the shifts
                let shifts = sqlResult[0].shiftHours;
                console.log("Shifts in retrieveShifts = " + shifts);

                // return the shifts
                resolve(shifts);
            }
        });
    });
}

async function getShifts(databaseConnection, supervisor, companyType) {
    // get the supervisor's table
    let table = determineSupTable(companyType);
    console.log("Table in getShifts = " + table);

    if (table == "") {
        console.log("ERROR: Unable to determine supervisor table in getShifts - Invalid companyType");
    }
    else {
        let queryCommand = 'SELECT shiftHours FROM schedularDatabase.' + table
            + ' WHERE supEmail = "' + supervisor + '";';
        
        // get the shifts 
        let shifts = await retrieveShiftsFromTable(databaseConnection, queryCommand);
        console.log("Shifts in getShifts = " + shifts);

        // return the string
        return shifts;
    }
}

function retrieveLNamesFromTable(databaseConnection, queryCommand) {
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to retrieve location name(s) from supervisor table");
            }
            else {
                // get the names of the locations
                let names = sqlResult[0].locationNames;
                console.log("Names in retrieveNames = " + names);

                // return the names of the locations
                resolve(names);
            }
        });
    });
}
async function getLocationNames(databaseConnection, supervisor, companyType) {
    // get the supervisor's table
    let table = determineSupTable(companyType);

    if (table == "") {
        console.log("ERROR: Unable to determine supervisor table in getLocationNames - Invalid companyType");
    }
    else {
        let queryCommand = 'SELECT locationNames FROM schedularDatabase.' + table
            + ' WHERE supEmail = "' + supervisor + '";';
        
        // get the names of the locations
        let names = await retrieveLNamesFromTable(databaseConnection, queryCommand);
        console.log("Names in getLocationNames = " + names);

        // return the string
        return names;
    }
}

module.exports = {startDatabase, storeGeneralSignUpInfo, storeCompanyType, companyTypeFromName,
    storeCompanyName, storeCompanyNameType, buildEmpAccount, buildSupAccount, storeWCInitInfo1, 
    getNumOfEmps, getNumOfLocs, getMultLoc, storeRoster, storeLocNames, storeREmpPref,
    getNumOfShifts, storeREFInitInfo1, storeShiftTimes, storeLInitInfo1, storeAllergies,
    getUsernamesEmails, getUserInfo, getUserPassword, getSupervisor, getShifts,
    getLocationNames, storeWCEmpPref, getWeekdays, getWeekends, storeEFEmpPref, storeLEmpPref};