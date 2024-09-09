function startDatabase(databaseConnection) {
    // connect to the database
    databaseConnection.connect(function(error) {
        if (error) {
            console.log("ERROR: Unable to connect in start-up");
        }
        else {
            console.log("Connected to database for start-up");
        }

    })

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
                if (sqlResult[i].Database == "SchedularDatabase") {
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
                        console.log("Created database");
                    }
                });

                // create the tables within the database

                // table for all users
                queryCommand = "CREATE TABLE schedularDatabase.usersTable {email VARCHAR(255) PRIMARY KEYY, fname VARCHAR(255), lname VARCHAR(255), password VARCHAR(255), status VARCHAR(255), companyName VARCHAR(255), companyType VARCHAR(255));";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("ERROR: unable to create table usersTable");
                    }
                    else {
                        console.log("Created usersTable");
                    }
                });

                // table for supervisors specifically
                queryCommand = "CREATE TABLE schedularDatabase.supervisorTable {email VARCHAR(255) PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), companyType VARCHAR(255), roster VARCHAR(255)};";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("ERROR: unable to create table supervisorTable");
                    }
                    else {
                        console.log("Created supervisorTable");
                    }
                });
                
                // table for keeping track of the companies that use the database
                queryCommand = "CREATE TABLE schedularDatabase.companiesServed {companyName VARCHAR(255) PRIMARY KEY, companyType VARCHAR(255)};";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("ERROR: unable to create table companiesServed");
                    }
                    else {
                        console.log("Created tables companiesServiced");
                    }
                });

                // table for white collar employees
                queryCommand = "CREATE TABLE schedularDatabase.wcEmpInfo {email VARCHAR(255) PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), nickname VARCHAR(255), supName VARCHAR(255), timeOff VARCHAR(255), locationPref VARCHAR(255), shiftTimePref VARCHAR(255)};";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("ERROR: unable to create table wcEmpInfo");
                    }
                    else {
                        console.log("Created tables wcEmpInfo");
                    }
                });

                // table for retail employees
                queryCommand = "CREATE TABLE schedularDatabase.rEmpInfo {email VARCHAR(255) PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), nickname VARCHAR(255), supName VARCHAR(255), timeOff VARCHAR(255), locationPref VARCHAR(255), shiftTimePref VARCHAR(255), weekPref VARCHAR(255), dayPref VARCHAR(255)};";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("ERROR: unable to create table rEmpInfo");
                    }
                    else {
                        console.log("Created tables rEmpInfo");
                    }
                });
                
                // table for entertainment employees
                queryCommand = "CREATE TABLE schedularDatabase.eEmpInfo {email VARCHAR(255) PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), nickname VARCHAR(255), supName VARCHAR(255), timeOff VARCHAR(255), locationPref VARCHAR(255), shiftTimePref VARCHAR(255), weekPref VARCHAR(255), allergies VARCHAR(255)};";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("ERROR: unable to create table eEmpInfo");
                    }
                    else {
                        console.log("Created tables eEmpInfo");
                    }
                });
                
                // table for law enforcement employees
                queryCommand = "CREATE TABLE schedularDatabase.lEmpInfo {email VARCHAR(255) PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), nickname VARCHAR(255), supName VARCHAR(255), timeOff VARCHAR(255), locationPref VARCHAR(255), shiftTimePref VARCHAR(255), lastShift VARCHAR(255), allergies VARCHAR(255), yearsServed INT};";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("ERROR: unable to create table lEmpInfo");
                    }
                    else {
                        console.log("Created tables lEmpInfo");
                    }
                });
               
                // table for food employees
                queryCommand = "CREATE TABLE schedularDatabase.fEmpInfo {email VARCHAR(255) PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), nickname VARCHAR(255), supName VARCHAR(255), timeOff VARCHAR(255), locationPref VARCHAR(255), shiftTimePref VARCHAR(255), weekPref VARCHAR(255), allergies VARCHAR(255)};";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("ERROR: unable to create table fEmpInfo");
                    }
                    else {
                        console.log("Created tables fEmpInfo");
                    }
                });
                
                // table for white collar schedule details
                queryCommand = "CREATE TABLE schedularDatabase.wcSupInfo {supEmail VARCHAR(255) PRIMARY KEY, supFName VARCHAR(255), supLName VARCHAR(255), companyName VARCHAR(255), numOfEmps INT, roster VARCHAR(255), locationNames VARCHAR(255), shiftHours VARCHAR(255), trainingDays VARCHAR(255)};";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("ERROR: unable to create table wcCompInfo");
                    }
                    else {
                        console.log("Created tables wcCompInfo");
                    }
                });
               
                // table for reatil schedule details
                queryCommand = "CREATE TABLE schedularDatabase.rSupInfo {supEmail VARCHAR(255) PRIMARY KEY, supFName VARCHAR(255), supLName VARCHAR(255), companyName VARCHAR(255), numOfEmps INT, roster VARCHAR(255), locationNames VARCHAR(255), shiftHours VARCHAR(255), shiftDaysWeek VARCHAR(255), shiftDaysWeekend VARCHAR(255)};";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("ERROR: unable to create table rCompInfo");
                    }
                    else {
                        console.log("Created tables rCompInfo");
                    }
                });
               
                // table for entertainment schedule details
                queryCommand = "CREATE TABLE schedularDatabase.eSupInfo {supEmail VARCHAR(255) PRIMARY KEY, supFName VARCHAR(255), supLName VARCHAR(255), companyName VARCHAR(255), numOfEmps INT, roster VARCHAR(255), locationNames VARCHAR(255), shiftHours VARCHAR(255), shiftDaysWeek VARCHAR(255), shiftDaysWeekend VARCHAR(255), allergies VARCHAR(255)};";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("ERROR: unable to create table eCompInfo");
                    }
                    else {
                        console.log("Created tables eCompInfo");
                    }
                });
                
                // table for law enforcement schedule details
                queryCommand = "CREATE TABLE schedularDatabase.lSupInfo {supEmail VARCHAR(255) PRIMARY KEY, supFName VARCHAR(255), supLName VARCHAR(255), companyName VARCHAR(255), numOfEmps INT, roster VARCHAR(255), locationNames VARCHAR(255), shiftHours VARCHAR(255), allergies VARCHAR(255)};";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("ERROR: unable to create table lCompInfo");
                    }
                    else {
                        console.log("Created tables lCompInfo");
                    }
                });
               
                // table for food schedule details
                queryCommand = "CREATE TABLE schedularDatabase.fSupInfo {supEmail VARCHAR(255) PRIMARY KEY, supFName VARCHAR(255), supLName VARCHAR(255), companyName VARCHAR(255), numOfEmps INT, roster VARCHAR(255), locationNames VARCHAR(255), shiftHours VARCHAR(255), shiftDaysWeek VARCHAR(255), shiftDaysWeekend VARCHAR(255), allergies VARCHAR(255)};";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("ERROR: unable to create table fCompInfo");
                    }
                    else {
                        console.log("Created tables fCompInfo");
                    }
                });
               
            }
        }
    });
}

module.exports = {startDatabase};