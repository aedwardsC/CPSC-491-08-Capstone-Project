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
            console.log("Could not read the result from MySQL");
        }
        else {
            let databaseExists = false;
            // go through the results to find the database
            for (let index = 0; index < sqlResult.length; index++) {
                console.log(sqlResult[index].Database);
                if (sqlResult[index].Database == "schedularDatabase") {
                    databaseExists = true;
                }
                console.log("DatabaseExists = " + databaseExists);
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
                        console.log("Created database");
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
                    + " locationPref VARCHAR(255), shiftTimePref VARCHAR(255)"
                    + "numOfLoc INT"; // elements all tables have in common
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
                commonElements = "supEmail VARCHAR(255) PRIMARY KEY, supFullName VARCHAR(255),"
                    + " companyName VARCHAR(255), numOfEmps INT, roster VARCHAR(255),"
                    + " locationNames VARCHAR(255), shiftHours VARCHAR(255)";
                tableElements = commonElements + ", trainingDays VARCHAR(255)";
                createTable(databaseConnection, tableName, tableElements);
               
                // table for reatil schedule details
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

// functions for storing information
function storeGeneralSignUpInfo(databaseConnection, email, uname, 
    fname, lname, password, status) {
    console.log("Adding to database");

    let queryCommand = "INSERT INTO shedularDatabase.usersTable (email, "
        + "username, fname, lname, password, status) VALUES ('" + email 
        + "', '" + uname + "', '" + fname + "', '" + lname + "', '"
        + password + "', '" + status + "');";
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
    console.log("Adding to the users table");

    let queryCommand = "INSERT INTO schedularDatabase.usersTable companyType " 
        + "VALUE '" + companyType + "' WHERE email = '" + email + "';";
    databaseConnection.query(queryCommand, function(error, sqlResult) {
        if (error) {
            console.log("ERROR: Unable to insert company type to usersTable");
        }
        else {
            console.log("SUCCESS: Added company type to usersTable");
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

// storing functions
function buildEmpAccount(databaseConnection, email, fullName, companyType, 
    supName) {
    let table = "";

    // determine which table the user is in
    table = determineEmpTable(companyType);

    // make sure that the table is good
    if (table == "") {
        console.log("ERROR: Employee Company Type is invalid");
    }
    else {
        let queryCommand = "INSERT INTO schedularDatabase." + table
            + "(email, fullName, supName) VALUES ('" + email + "', '" + fullName + "', '"
            + supName + "');";
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

function storeCompanyName(databaseConnection, email, companyName) {
    console.log("Storing the company name in the user table");

    let queryCommand = "INSERT INTO schedularDatabase.usersTable companyName "
        + "VALUE '" + companyName + "' WHERE email = '" + email + "';";
    databaseConnection.query(queryCommand, function(error, sqlResult) {
        if (error) {
            console.log("ERROR: Unable to add company name to usersTable");
        }
        else {
            console.log("SUCCESS: Added company name to usersTable");
        }
    });
}

function storeCompanyNameType(databaseConnection, companyName, companyType) {
    console.log("Storing company info in Companies Served table");

    let queryCommand = "INSERT INTO schedularDatabase.companiesServed "
        + "(companyName, companyType) VALUES ('" + companyName + "', '" + companyType + "');";
    databaseConnection.query(queryCommand, function(error, sqlResult) {
        if (error) {
            console.log("ERROR: Unable to add to companiesServed table");
        }
        else {
            console.log("SUCCESS: Added company info to companiesServed table");
        }
    });
}

function storeWCInitInfo1(databaseConnection, email, fullName, companyName,
    numOfEmps, shiftHours, numOfLoc, stringTraining) {
    console.log("Storing the information from wc_initial1");

    let queryCommand = "INSERT INTO schedularDatabase.wcSupInfo (supEmail, supFullName, "
        + "companyName, numOfEmps, shiftHours, numOfLoc, trainingDays) VALUES ('" + email
        + "', '" + fullName + "', '" + companyName + "', '" + numOfEmps + ", '" + shiftHours
        + "', " + numOfLoc + ", '" + stringTraining + "');";
    databaseConnection.query(queryCommand, function(error, sqlResult) {
        if (error) {
            console.log("ERROR: Unable to add init1 to wcSupInfo");
        }
        else {
            console.log("SUCCESS: Added init1 to wcSupInfo");
        }
    });
}

// retrieving information
function getType(databaseConnection, queryCommand) {
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to retrieve company type");
            }
            else {
                let type = JSON.stringify(sqlResult[0].companyType);
                console.log("Returning: " + type);
                resolve(type);
            }
        });
    });
}

async function companyTypeFromName(databaseConnection, companyName) {
    console.log("Retrieving company type of " + companyName);
    
    let queryCommand = "SELECT companyType FROM schedularDatabase.companiesServed "
        + "WHERE companyName = '" + companyName + "';";

    let type = await getType(databaseConnection, queryCommand);
    console.log("Ultimately returning: " + type);

    return type;
}

function getNumE(databaseConnection, queryCommand) {
    return new Promise((resolve, reject) => {
        databaseConnection.query(queryCommand, function(error, sqlResult, table) {
            if (error) {
                console.log("ERROR: Unable to retrieve numberOfEmployees");
            }
            else {
                let num = sqlResult[0].numOfEmps;
                console.log("Returning: " + num);
                resolve(num);
            }
        });
    });
}

async function getNumOfEmps(databaseConnection, email, companyType) {
    console.log("Retrieving the number of employees");

    let numOfEmps = 0;
    let table = determineSupTable(companyType);

    if (table == "") {
        console.log("ERROR: Invalid table");
    }
    else {
        let queryCommand = "SELECT numOfEmps FROM schedularDatabase." + table 
            + " WHERE email = '" + email + "';";
        
        numOfEmps = await getNumE(databaseConnection, queryCommand);
    }

    console.log("Ultimately returning: " + numOfEmps);
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
                console.log("Returning: " + num);
                resolve(num);
            }
        });
    });
}

async function getNumOfLocs(databaseConnection, email, companyType) {
    console.log("Retrieving the number of locations");

    let numOfLocs = 0;
    let table = determineSupTable(companyType);

    if (table == "") {
        console.log("ERROR: Invalid table");
    }
    else {
        let queryCommand = "SELECT numOfLoc FROM schedularDatabase." + table
            + " WHERE email = '" + email + "';";

        numOfLocs = await getNumL(databaseConnection, queryCommand);
    }

    console.log("Ultimately returning: " + numOfLocs);
    return numOfLocs;
}

// For Testing Purposes
function printEmpAccount(databaseConnection, email, companyType) {
    console.log("Retrieving the Employee Information");

    let table = determineEmpTable(companyType);
    let queryCommand = "SELECT * FROM schedularDatabase." + table
        + " WHERE email = '" + email + "';";
    
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("ERROR: Unable to read from Employee table");
        }
        else {
            console.log("Employee Email: " + JSON.stringify(sqlResult[0].email));
            console.log("Employee Name: " + JSON.stringify(sqlResult[0].fullName));
            console.log("Supervisor Name: " + JSON.stringify(sqlResult[0].supName));
        }
    });
}

function printUserTable(databaseConnection) {
    console.log("Retrieving")
}

module.exports = {startDatabase, storeGeneralSignUpInfo, storeCompanyType, companyTypeFromName,
    storeCompanyName, storeCompanyNameType, buildEmpAccount, storeWCInitInfo1, getNumOfEmps,
    getNumOfLocs};