function stringToArray(givenString) {
    // convert the string from the database into a vector to be manipulated
}

function authenticateUser(response, databaseConnection, username, password, dbFunc) {
    // SELECT password FROM schedularDatabase WHERE email=username OR username=username;

    // if find nothing -> direct to error page

    // compare password provided with password from database
        // if passwords match return the username, their company type, and their status
        // and their full name
        // else -> direct to error page 
    
    return [username, "whiteCollar", "employee", "Amanda", "Walker"]; // FOR TESTING -> CHANGE LATER

}

function checkPswds(pswd1, pswd2) {
    // see if the password match
    if (pswd1 == pswd2) {
        console.log("The passwords match -> returning TRUE");
        return true;
    }
    else {
        console.log("The passwords don't match -> returning FALSE");
        return false;
    }
}

function determineRole(response, role) {
    // determine if supervisor
    if (role == "supervisor") {
        console.log("The user is a supervisor");
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/company_type.html");
    }
    else if (role == "employee") {
        console.log("The user is an employee");
        response.sendFile(__dirname + "/Company_forms/Employee_specific/company_name.html");
    }
    else {
        console.log("ERROR: Invalid data type for role");
    }
}

function splitInitialSetUp(response, companyType) {
    // if company type = white collar -> direct to white collar initial setup
    if (companyType == "whiteCollar") {
        console.log("Sending to White Collar Init");
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/wc_initial1.html");
    }
    else if (companyType == "retail") {
        // if company type = retail -> redirect to retail initial setup
        console.log("Sending to Retail Init");
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/r_initial1.html");
    }
    else if (companyType == "entertainment") {
        // if company type = entertainment 
        // -> redirect to entertainment initial setup
        console.log("Sending to Entertainment Init");
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/e_initial1.html");
    }
    else if (companyType == "food") {
        // if company type = food -> redirect to food initial setup
        console.log("Sending to Food Init");
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/f_initial1.html");
    }
    else if (companyType == "lawEnforcement") {
        // if company type = law enforcement 
        // -> redirect to law enforcement initial setup
        console.log("Sending to Law Enforcement Init");
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/l_initial1.html");
    }
    else {
        console.log("ERROR: Invalid company type");
    }
}

function splitUsers(response, role, fName) {
    // if role is an employee -> direct to the Disclaimer page
    if (role == "employee") {
        console.log("User is employee -> directing to disclaimer");
        response.sendFile(__dirname + "/Company_forms/Employee_specific/disclaimer_page.html");
    }
    else if (role == "supervisor") { // else -> send to supervisor home page
        console.log("User is supervisor -> directing to home page")
        let formVal = {name:fName};
        response.render(__dirname + "/Company_forms/Supervisor_specific/home_page.ejs",
            formVal);
    }
}

function createTrainingSchedule(trainingDays, monday, tuesday, wednesday, thursday, friday, 
    saturday, sunday) {
    if (monday == "Monday") {
        console.log("Adding Monday");
        trainingDays.push(monday);
    }
    if (tuesday == "Tuesday") {
        console.log("Adding Tuesday");
        trainingDays.push(tuesday);
    }
    if (wednesday == "Wednesday") {
        console.log("Adding Wednesday");
        trainingDays.push(wednesday);
    }
    if (thursday == "Thursday") {
        console.log("Adding Thursday");
        trainingDays.push(thursday);
    }
    if (friday == "Friday") {
        console.log("Adding Friday");
        trainingDays.push(friday);
    }
    if (saturday == "Saturday") {
        console.log("Adding Saturday");
        trainingDays.push(saturday);
    }
    if (sunday == "Sunday") {
        console.log("Adding Sunday");
        trainingDays.push(sunday);
    }
}

function getEmpNames(roster, request, numOfEmps) {
    let num = 1;
    while (num <= numOfEmps) {
        if (num == 1) {
            roster.push(request.body.empName1);
        }
        else if (num == 2) {
            roster.push(request.body.empName2);
        }
        else if (num == 3) {
            roster.push(request.body.empName3);
        }
        else if (num == 4) {
            roster.push(request.body.empName4);
        }
        else if (num == 5) {
            roster.push(request.body.empName5);
        }
        else if (num == 6) {
            roster.push(request.body.empName6);
        }
        else if (num == 7) {
            roster.push(request.body.empName7);
        }
        else if (num == 8) {
            roster.push(request.body.empName8);
        }
        else if (num == 9) {
            roster.push(request.body.empName9);
        }
        else if (num == 10) {
            roster.push(request.body.empName10);
        }
        else if (num == 11) {
            roster.push(request.body.empName11);
        }
        else if (num == 12) {
            roster.push(request.body.empName12);
        }
        else if (num == 13) {
            roster.push(request.body.empName13);
        }
        else if (num == 14) {
            roster.push(request.body.empName14);
        }
        else if (num == 15) {
            roster.push(request.body.empName15);
        }
        else if (num == 16) {
            roster.push(request.body.empName16);
        }
        else if (num == 17) {
            roster.push(request.body.empName17);
        }
        else if (num == 18) {
            roster.push(request.body.empName18);
        }
        else if (num == 19) {
            roster.push(request.body.empName19);
        }
        else if (num == 20) {
            roster.push(request.body.empName20);
        }
        else if (num == 21) {
            roster.push(request.body.empName21);
        }
        else if (num == 22) {
            roster.push(request.body.empName22);
        }
        else if (num == 23) {
            roster.push(request.body.empName23);
        }
        else if (num == 24) {
            roster.push(request.body.empName24);
        }
        else if (num == 25) {
            roster.push(request.body.empName25);
        }
        else if (num == 26) {
            roster.push(request.body.empName26);
        }
        else if (num == 27) {
            roster.push(request.body.empName27);
        }
        else if (num == 28) {
            roster.push(request.body.empName28);
        }
        else if (num == 29) {
            roster.push(request.body.empName29);
        }
        else if (num == 30) {
            roster.push(request.body.empName30);
        }
        num = num + 1;
    }
}

module.exports = {authenticateUser, checkPswds, determineRole, 
    splitInitialSetUp, splitUsers, createTrainingSchedule, getEmpNames};