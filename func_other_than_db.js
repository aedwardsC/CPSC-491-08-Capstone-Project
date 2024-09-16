function stringToVector(givenString) {
    // convert the string from the database into a vector to be manipulated
}

function authenticateUser(response, databaseConnection, username, password, dbFunc) {
    // SELECT password FROM schedularDatabase WHERE email=username OR username=username;

    // if find nothing -> direct to error page

    // compare password provided with password from database
        // if passwords match return the username and their company type
        // else -> direct to error page 

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

    // if company type = retail -> redirect to retail initial setup

    // if company type = entertainment -> redirect to entertainment initial setup

    // if company type = food -> redirect to food initial setup

    // if company type = law enforcement -> redirect to law enforcement initial setup

}

module.exports = {authenticateUser, checkPswds, determineRole, splitInitialSetUp};