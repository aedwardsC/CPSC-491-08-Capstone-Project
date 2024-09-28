// For Testing Purposes
function printEmpTable(databaseConnection, companyType) {
    //console.log("Retrieving the Employee Information");

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
                console.log("Employee Email: " + JSON.stringify(sqlResult[index].email));
                console.log("Employee Name: " + JSON.stringify(sqlResult[index].fullName));
                console.log("Supervisor Name: " + JSON.stringify(sqlResult[index].supName));
                console.log(""); // spacing for readability
            }
        }
    });
}

function printUserTable(databaseConnection) {
    //console.log("Retrieving the User Table information");

    let queryCommand = "SELECT * FROM schedularDatabase.usersTable;";
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read from user table");
        }
        else {
            console.log("usersTable");
            console.log(""); // spacing for readability
            for (let index = 0; index < sqlResult.length; index++) {
                console.log("User Email: " + JSON.stringify(sqlResult[index].email));
                console.log("User Username: " + JSON.stringify(sqlResult[index].username));
                console.log("User First Name: " + JSON.stringify(sqlResult[index].fname));
                console.log("User Last Name: " + JSON.stringify(sqlResult[index].lname));
                console.log("User Password: " + JSON.stringify(sqlResult[index].password));
                console.log("User Role: " + JSON.stringify(sqlResult[index].status));
                console.log("User Company Type: " + JSON.stringify(sqlResult[index].companyType));
                console.log("User Company Name: " + JSON.stringify(sqlResult[index].companyName));
                console.log(""); // spacing for readability   
            }
        }
    });
}

function printCompaniesServedTable(databaseConnection) {
    //console.log("Retrieving the Companies Served Table information");

    let queryCommand = "SELECT * FROM schedularDatabase.companiesServed;";
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read from companies served table");
        }
        else {
            console.log("companiesServed");
            console.log(""); // spacing for readability
            for (let index = 0; index < sqlResult.length; index++) {
                console.log("Company Name: " + JSON.stringify(sqlResult[index].companyName));
                console.log("Company Type: " + JSON.stringify(sqlResult[index].companyType));
                console.log(""); // spacing for readability
            }
        }
    });
}

function printSupTable(databaseConnection, companyType) {
    // console.log("Retrieving the Supervisor Table Information");

    let table = determineSupTable(companyType);
    let queryCommand = "SELECT * FROM schedularDatabase." + table + ";";
    
    databaseConnection.query(queryCommand, function(error, sqlResult, tableInfo) {
        if (error) {
            console.log("TEST ERROR: Unable to read from Supervisor table");
        }
        else {
            console.log(table);
            console.log(""); // spacing for readability
            for (let index = 0; index < sqlResult.length; index++) {
                console.log("Supervisor Email: " + JSON.stringify(sqlResult[index].supEmail));
                console.log("Supervisor Name: " + JSON.stringify(sqlResult[index].supFullName));
                console.log("Supervisor Company Name: " + JSON.stringify(sqlResult[index].companyName));
                console.log("Supervisor Number of Employees: " + sqlResult[index].numOfEmps);
                console.log("Supervisor Shift Hours: " + JSON.stringify(sqlResult[index].shiftHours));
                console.log("Supervisor Number of Locations: " + sqlResult[index].numOfLoc);
                console.log("Supervisor Training Days: " + JSON.stringify(sqlResult[index].trainingDays)); 
                console.log("Supervisor Roster: " + JSON.stringify(sqlResult[index].roster)); 
                console.log("Supervisor Locations: " + JSON.stringify(sqlResult[index].locationNames));
                console.log(""); // spacing for readability 
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

module.exports = {printEmpTable, printUserTable, printCompaniesServedTable,
    printSupTable};