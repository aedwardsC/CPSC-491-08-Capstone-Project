let username = ""; // global variable for searching the database

function createTable(databaseConnection, tableName, tableElements) {
    let queryCommand = "CREATE TABLE schedularDatabase." + tableName + " (" + tableElements + ");";
    databaseConnection.query(queryCommand, function(error, sqlResult) {
        if (error) {
            console.log("ERROR: unable to create table " + tableName + "- " + error);
        }
        else {
            console.log("Created " + tableName);
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
            console.log("Connected to database for start-up");
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

module.exports = {startDatabase};