let username = ""; // global variable for searching the database

function stringToVector(givenString) {
    // convert the string from the database into a vector to be manipulated
}

function authenticateUser(response, databaseConnection, username, password, dbFunc) {
    // SELECT password FROM schedularDatabase WHERE email=username OR username=username;

    // if find nothing -> direct to error page

    // compare password provided with password from database
        // if passwords match return the username
        // else -> direct to error page 

}

function checkPswds(response, pswd1, pswd2) {
    // see if the password match

    // if match return TRUE

    // else -> direct to mismatch page
}

module.exports = {authenticateUser, checkPswds};