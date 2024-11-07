// For Testing Purposes
function printEmpTable(databaseConnection, companyType) {
    let table = determineEmpTable(companyType);
    let queryCommand = "SELECT * FROM schedularDatabase." + table + ";";
    
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read from Employee table");
        }
        else {
            console.log(table);
            console.log(""); // spacing for readability
            for (let index = 0; index < sqlResult.length; index++) {
                console.log("Employee Email: " + sqlResult[index].email);
                console.log("Employee Name: " + sqlResult[index].fullName);
                console.log("Supervisor Name: " + sqlResult[index].supName);
                console.log(""); // spacing for readability
            }
        }
    });
}

function printUserTable(databaseConnection) {
    let queryCommand = "SELECT * FROM schedularDatabase.usersTable;";
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read from user table");
        }
        else {
            console.log("usersTable");
            console.log(""); // spacing for readability
            for (let index = 0; index < sqlResult.length; index++) {
                console.log("User Email: " + sqlResult[index].email);
                console.log("User Username: " + sqlResult[index].username);
                console.log("User First Name: " + sqlResult[index].fname);
                console.log("User Last Name: " + sqlResult[index].lname);
                console.log("User Password: " + sqlResult[index].password);
                console.log("User Role: " + sqlResult[index].status);
                console.log("User Company Type: " + sqlResult[index].companyType);
                console.log("User Company Name: " + sqlResult[index].companyName);
                console.log(""); // spacing for readability   
            }
        }
    });
}

function printCompaniesServedTable(databaseConnection) {
    let queryCommand = "SELECT * FROM schedularDatabase.companiesServed;";
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read from companies served table");
        }
        else {
            console.log("companiesServed");
            console.log(""); // spacing for readability
            for (let index = 0; index < sqlResult.length; index++) {
                console.log("Company Name: " + sqlResult[index].companyName);
                console.log("Company Type: " + sqlResult[index].companyType);
                console.log(""); // spacing for readability
            }
        }
    });
}

function printSupWC(databaseConnection, queryCommand, table) {
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read from Supervisor table");
        }
        else {
            console.log(table);
            console.log(""); // spacing for readability
            for (let index = 0; index < sqlResult.length; index++) {
                console.log("Supervisor Email: " + sqlResult[index].supEmail);
                console.log("Supervisor Name: " + sqlResult[index].supFullName);
                console.log("Supervisor Company Name: " + sqlResult[index].companyName);
                console.log("Supervisor Number of Employees: " + sqlResult[index].numOfEmps);
                console.log("Supervisor Roster: " + sqlResult[index].roster); 
                console.log("Supervisor Shift Hours: " + sqlResult[index].shiftHours);
                console.log("Supervisor Multiple Locations: " + sqlResult[index].multLoc);
                console.log("Supervisor Number of Locations: " + sqlResult[index].numOfLoc);
                console.log("Supervisor Locations: " + sqlResult[index].locationNames);
                console.log("Supervisor Training Days: " + sqlResult[index].trainingDays); 
                console.log(""); // spacing for readability 
            }
        }
    });
}

function printSupR(databaseConnection, queryCommand, table) {
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read from Supervisor table");
        }
        else {
            console.log(table);
            console.log(""); // spacing for readability
            for (let index = 0; index < sqlResult.length; index++) {
                console.log("Supervisor Email: " + sqlResult[index].supEmail);
                console.log("Supervisor Name: " + sqlResult[index].supFullName);
                console.log("Supervisor Company Name: " + sqlResult[index].companyName);
                console.log("Supervisor Number of Employees: " + sqlResult[index].numOfEmps);
                console.log("Supervisor Roster: " + sqlResult[index].roster); 
                console.log("Supervisor Number of Shifts: " + sqlResult[index].numOfShifts);
                console.log("Supervisor Shift Weekdays: " + sqlResult[index].shiftDaysWeek);
                console.log("Supervisor Shift Weekends: " + sqlResult[index].shiftDaysWeekend);
                console.log("Supervisor Shift Hours: " + sqlResult[index].shiftHours);
                console.log("Supervisor Multiple Locations: " + sqlResult[index].multLoc);
                console.log("Supervisor Number of Locations: " + sqlResult[index].numOfLoc); 
                console.log("Supervisor Locations: " + sqlResult[index].locationNames);
                console.log(""); // spacing for readability 
            }
        }
    });
}

function printSupEF(databaseConnection, queryCommand, table) {
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read from Supervisor table");
        }
        else {
            console.log(table);
            console.log(""); // spacing for readability
            for (let index = 0; index < sqlResult.length; index++) {
                console.log("Supervisor Email: " + sqlResult[index].supEmail);
                console.log("Supervisor Name: " + sqlResult[index].supFullName);
                console.log("Supervisor Company Name: " + sqlResult[index].companyName);
                console.log("Supervisor Number of Employees: " + sqlResult[index].numOfEmps);
                console.log("Supervisor Roster: " + sqlResult[index].roster); 
                console.log("Supervisor Number of Shifts: " + sqlResult[index].numOfShifts);
                console.log("Supervisor Shift Weekdays: " + sqlResult[index].shiftDaysWeek);
                console.log("Supervisor Shift Weekends: " + sqlResult[index].shiftDaysWeekend);
                console.log("Supervisor Shift Hours: " + sqlResult[index].shiftHours);
                console.log("Supervisor Multiple Locations: " + sqlResult[index].multLoc);
                console.log("Supervisor Number of Locations: " + sqlResult[index].numOfLoc); 
                console.log("Supervisor Locations: " + sqlResult[index].locationNames);
                console.log("Supervisor Allergies: " + sqlResult[index].allergies);
                console.log(""); // spacing for readability  
            }
        }
    });
}

function printSupL(databaseConnection, queryCommand, table) {
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read from Supervisor table");
        }
        else {
            console.log(table);
            console.log(""); // spacing for readability
            for (let index = 0; index < sqlResult.length; index++) {
                console.log("Supervisor Email: " + sqlResult[index].supEmail);
                console.log("Supervisor Name: " + sqlResult[index].supFullName);
                console.log("Supervisor Company Name: " + sqlResult[index].companyName);
                console.log("Supervisor Number of Employees: " + sqlResult[index].numOfEmps);
                console.log("Supervisor Roster: " + sqlResult[index].roster); 
                console.log("Supervisor Number of Shifts: " + sqlResult[index].numOfShifts);
                console.log("Supervisor Shift Hours: " + sqlResult[index].shiftHours);
                console.log("Supervisor Multiple Locations: " + sqlResult[index].multLoc);
                console.log("Supervisor Number of Locations: " + sqlResult[index].numOfLoc); 
                console.log("Supervisor Locations: " + sqlResult[index].locationNames);
                console.log("Supervisor Location Allergies: " + sqlResult[index].allergies);
                console.log(""); // spacing for readability  
            }
        }
    });
}

function printSupTable(databaseConnection, companyType) {
    let table = determineSupTable(companyType);
    let queryCommand = "SELECT * FROM schedularDatabase." + table + ";";

    if (table == "wcSupInfo") {
        printSupWC(databaseConnection, queryCommand, table);
    }
    else if (table == "rSupInfo") {
        printSupR(databaseConnection, queryCommand, table);
    }
    else if (table == "eSupInfo" || table == "fSupInfo") {
        printSupEF(databaseConnection, queryCommand, table);
    }
    else if (table == "lSupInfo") {
        printSupL(databaseConnection, queryCommand, table);
    }
    else {
        console.log("ERROR: Inavlide table name");
    }
}

function printFullSupWC(databaseConnection, queryCommand, table) {
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read from Supervisor table");
        }
        else {
            console.log(table);
            console.log(""); // spacing for readability
            console.log("Supervisor Email: " + sqlResult[0].supEmail);
            console.log("Supervisor Name: " + sqlResult[0].supFullName);
            console.log("Supervisor Company Name: " + sqlResult[0].companyName);
            console.log("Supervisor Number of Employees: " + sqlResult[0].numOfEmps);
            console.log("Supervisor Roster: " + sqlResult[0].roster); 
            console.log("Supervisor Shift Hours: " + sqlResult[0].shiftHours);
            console.log("Supervisor Multiple Locations: " + sqlResult[0].multLoc);
            console.log("Supervisor Number of Locations: " + sqlResult[0].numOfLoc);
            console.log("Supervisor Locations: " + sqlResult[0].locationNames);
            console.log("Supervisor Training Days: " + sqlResult[0].trainingDays); 
        }
    });
}

function printFullSupR(databaseConnection, queryCommand, table) {
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read from Supervisor table");
        }
        else {
            console.log(table);
            console.log(""); // spacing for readability
            console.log("Supervisor Email: " + sqlResult[0].supEmail);
            console.log("Supervisor Name: " + sqlResult[0].supFullName);
            console.log("Supervisor Company Name: " + sqlResult[0].companyName);
            console.log("Supervisor Number of Employees: " + sqlResult[0].numOfEmps);
            console.log("Supervisor Roster: " + sqlResult[0].roster); 
            console.log("Supervisor Number of Shifts: " + sqlResult[0].numOfShifts);
            console.log("Supervisor Shift Weekdays: " + sqlResult[0].shiftDaysWeek);
            console.log("Supervisor Shift Weekends: " + sqlResult[0].shiftDaysWeekend);
            console.log("Supervisor Shift Hours: " + sqlResult[0].shiftHours);
            console.log("Supervisor Multiple Locations: " + sqlResult[0].multLoc);
            console.log("Supervisor Number of Locations: " + sqlResult[0].numOfLoc); 
            console.log("Supervisor Locations: " + sqlResult[0].locationNames);
        }
    });
}

function printFullSupEF(databaseConnection, queryCommand, table) {
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read from Supervisor table");
        }
        else {
            console.log(table);
            console.log(""); // spacing for readability
            console.log("Supervisor Email: " + sqlResult[0].supEmail);
            console.log("Supervisor Name: " + sqlResult[0].supFullName);
            console.log("Supervisor Company Name: " + sqlResult[0].companyName);
            console.log("Supervisor Number of Employees: " + sqlResult[0].numOfEmps);
            console.log("Supervisor Roster: " + sqlResult[0].roster); 
            console.log("Supervisor Number of Shifts: " + sqlResult[0].numOfShifts);
            console.log("Supervisor Shift Weekdays: " + sqlResult[0].shiftDaysWeek);
            console.log("Supervisor Shift Weekends: " + sqlResult[0].shiftDaysWeekend);
            console.log("Supervisor Shift Hours: " + sqlResult[0].shiftHours);
            console.log("Supervisor Multiple Locations: " + sqlResult[0].multLoc);
            console.log("Supervisor Number of Locations: " + sqlResult[0].numOfLoc); 
            console.log("Supervisor Locations: " + sqlResult[0].locationNames);
            console.log("Supervisor Allergies: " + sqlResult[0].allergies);
        }
    });  
}

function printFullSupL(databaseConnection, queryCommand, table) {
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read from Supervisor table");
        }
        else {
            console.log(table);
            console.log(""); // spacing for readability
            console.log("Supervisor Email: " + sqlResult[0].supEmail);
            console.log("Supervisor Name: " + sqlResult[0].supFullName);
            console.log("Supervisor Company Name: " + sqlResult[0].companyName);
            console.log("Supervisor Number of Employees: " + sqlResult[0].numOfEmps);
            console.log("Supervisor Roster: " + sqlResult[0].roster); 
            console.log("Supervisor Number of Shifts: " + sqlResult[0].numOfShifts);
            console.log("Supervisor Shift Hours: " + sqlResult[0].shiftHours);
            console.log("Supervisor Multiple Locations: " + sqlResult[0].multLoc);
            console.log("Supervisor Number of Locations: " + sqlResult[0].numOfLoc); 
            console.log("Supervisor Locations: " + sqlResult[0].locationNames);
            console.log("Supervisor Location Allergies: " + sqlResult[0].allergies);
                  
        }
    });
}

function printFullSupTable(databaseConnection, email, companyType) {
    // determine the table
    let table = determineSupTable(companyType);
    let queryCommand = 'SELECT * FROM schedularDatabase.' + table 
        + ' WHERE supEmail = "' + email + '";';
    
    if (table == "wcSupInfo") {
        printFullSupWC(databaseConnection, queryCommand, table);
    }
    else if (table == "rSupInfo") {
        printFullSupR(databaseConnection, queryCommand, table);
    }
    else if (table == "eSupInfo" || table == "fSupInfo") {
        printFullSupEF(databaseConnection, queryCommand, table);
    }
    else if (table == "lSupInfo") {
        printFullSupL(databaseConnection, queryCommand, table);
    }
    else {
        console.log("ERROR: Inavlide table name");
    }
}

function printFullEmpWC(databaseConnection, queryCommand, table) {
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read full Employee table" + error);
        }
        else {
            console.log(table);
            console.log(""); // spacing for readability
            console.log("Employee Email: " + sqlResult[0].email);
            console.log("Employee Name: " + sqlResult[0].fullName);
            console.log("Employee Nickname: " + sqlResult[0].nickname);
            console.log("Employee Supervisor's Name: " + sqlResult[0].supName);
            console.log("Employee Time Off: " + sqlResult[0].timeOff);
            console.log("Employee Location Preference(s): " + sqlResult[0].locationPref); 
            console.log("Employee Shift Preference(s): " + sqlResult[0].shiftTimePref);
            console.log(""); // spacing for readability  
        }
    });   
}

function printFullEmpR(databaseConnection, queryCommand, table) {
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read full Employee table");
        }
        else {
            console.log(table);
            console.log(""); // spacing for readability
            console.log("Employee Email: " + sqlResult[0].email);
            console.log("Employee Name: " + sqlResult[0].fullName);
            console.log("Employee Nickname: " + sqlResult[0].nickname);
            console.log("Employee Supervisor's Name: " + sqlResult[0].supName);
            console.log("Employee Time Off: " + sqlResult[0].timeOff);
            console.log("Employee Location Preference(s): " + sqlResult[0].locationPref); 
            console.log("Employee Shift Time Preference(s): " + sqlResult[0].shiftTimePref);
            console.log("Employee Week Preference(s): " + sqlResult[0].weekPref);
            console.log("Employee Day Preference(s): " + sqlResult[0].dayPref);
            console.log(""); // spacing for readability  
        }
    });
}

function printFullEmpL(databaseConnection, queryCommand, table) {
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read full Employee table");
        }
        else {
            console.log(table);
            console.log(""); // spacing for readability
            console.log("Employee Email: " + sqlResult[0].email);
            console.log("Employee Name: " + sqlResult[0].fullName);
            console.log("Employee Nickname: " + sqlResult[0].nickname);
            console.log("Employee Supervisor's Name: " + sqlResult[0].supName);
            console.log("Employee Time Off: " + sqlResult[0].timeOff);
            console.log("Employee Location Preference(s): " + sqlResult[0].locationPref); 
            console.log("Employee Shift Time Preference(s): " + sqlResult[0].shiftTimePref);
            console.log("Employee Last Shift: " + sqlResult[0].lastShift);
            console.log("Employee Years Served: " + sqlResult[0].yearsServed);
            console.log("Employee Allergies: " + sqlResult[0].allergies);
            console.log(""); // spacing for readability  
        }
    });
}

function printFullEmpEF(databaseConnection, queryCommand, table) {
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read full Employee table");
        }
        else {
            console.log(table);
            console.log(""); // spacing for readability
            console.log("Employee Email: " + sqlResult[0].email);
            console.log("Employee Name: " + sqlResult[0].fullName);
            console.log("Employee Nickname: " + sqlResult[0].nickname);
            console.log("Employee Supervisor's Name: " + sqlResult[0].supName);
            console.log("Employee Time Off: " + sqlResult[0].timeOff);
            console.log("Employee Location Preference(s): " + sqlResult[0].locationPref); 
            console.log("Employee Shift Time Preference(s): " + sqlResult[0].shiftTimePref);
            console.log("Employee Week Preference(s): " + sqlResult[0].weekPref);
            console.log("Employee Day Preference(s): " + sqlResult[0].dayPref);
            console.log("Employee Allergies: " + sqlResult[0].allergies);
            console.log(""); // spacing for readability  
        }
    });
}

function printFullEmpTable(databaseConnection, username, companyType) {
    let table = determineEmpTable(companyType);

    console.log("In printFull - table = " + table);

    let queryCommand = 'SELECT * FROM schedularDatabase.' + table 
        + ' WHERE email = "' + username + '";';

    if (table == "wcEmpInfo") {
        printFullEmpWC(databaseConnection, queryCommand, table);
    }
    else if (table == "rEmpInfo") {
        printFullEmpR(databaseConnection, queryCommand, table);
    }
    else if (table == "eEmpInfo" || table == "fEmpInfo") {
        printFullEmpEF(databaseConnection, queryCommand, table);
    }
    else if (table == "lEmpInfo") {
        printFullEmpL(databaseConnection, queryCommand, table);
    }
    else {
        console.log("ERROR: Inavlide table name");
    }
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

module.exports = {printEmpTable, printUserTable, printCompaniesServedTable,
    printSupTable, printFullEmpTable, printFullSupTable};