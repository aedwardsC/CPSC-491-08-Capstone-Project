function stringToArray(givenString, givenArray) {
    // convert the string from the database into a vector to be manipulated
    let index = 0;
    while (index < givenString.length) {
        let temp = "";
        while (givenString[index] != "," && index < givenString.length) {
            temp = temp + givenString[index];
            index++;
        }
        givenArray.push(temp);
        index++;
    }
}

async function authenticateUser(databaseConnection, username, password, 
    databaseFunctions) {
    // get the company type, roll, first name, and last name from the database
    let user = await databaseFunctions.getUserPassword(databaseConnection, username);

    // if find nothing -> return false
    if (user == "") {
        console.log("The user doesn't exits");
        return false;
    }
    else {
        // if passwords match return true
        if (user[0].password === password) {
            console.log("The passwords match!");
            return true;
        }
        else { // else -> return false
            return false;
        }
    }
}

async function getUserInfo(databaseConnection, databaseFunction, uname) {
    let user = await databaseFunction.getUserInfo(databaseConnection, uname);
    let userInfo = new Array();
    userInfo.push(user[0].email);
    userInfo.push(user[0].companyType);
    userInfo.push(user[0].status);
    userInfo.push(user[0].fname); 
    userInfo.push(user[0].lname);
    console.log("Returning: " + userInfo);
    return userInfo;
}

function checkPswds(pswd1, pswd2) {
    // see if the password match
    if (pswd1 === pswd2) {
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
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/company_type.html");
    }
    else if (role == "employee") {
        response.sendFile(__dirname + "/Company_forms/Employee_specific/company_name.html");
    }
    else {
        console.log("ERROR: Invalid data type for role");
    }
}

function splitInitialSetUp(response, companyType) {
    // if company type = white collar -> direct to white collar initial setup
    if (companyType == "whiteCollar") {
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/wc_initial1.html");
    }
    else if (companyType == "retail") {
        // if company type = retail -> redirect to retail initial setup
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/r_initial1.html");
    }
    else if (companyType == "entertainment") {
        // if company type = entertainment 
        // -> redirect to entertainment initial setup
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/e_initial1.html");
    }
    else if (companyType == "food") {
        // if company type = food -> redirect to food initial setup
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/f_initial1.html");
    }
    else if (companyType == "lawEnforcement") {
        // if company type = law enforcement 
        // -> redirect to law enforcement initial setup
        response.sendFile(__dirname + "/Company_forms/Supervisor_specific/l_initial1.html");
    }
    else {
        console.log("ERROR: Invalid company type");
    }
}

function splitUsers(response, role, fullName) {
    // if role is an employee -> direct to the Disclaimer page
    if (role == "employee") {
        response.sendFile(__dirname + "/Company_forms/Employee_specific/disclaimer_page.html");
    }
    else if (role == "supervisor") { // else -> send to supervisor home page
        buildAndSendHome(response, fullName, role);
    }
    else {
        console.log("ERROR: Invalid user role");
    }
}

function createTrainingSchedule(trainingDays, monday, tuesday, wednesday, thursday, friday, 
    saturday, sunday) {
    if (monday == "Monday") {
        trainingDays.push(monday);
    }
    if (tuesday == "Tuesday") {
        trainingDays.push(tuesday);
    }
    if (wednesday == "Wednesday") {
        trainingDays.push(wednesday);
    }
    if (thursday == "Thursday") {
        trainingDays.push(thursday);
    }
    if (friday == "Friday") {
        trainingDays.push(friday);
    }
    if (saturday == "Saturday") {
        trainingDays.push(saturday);
    }
    if (sunday == "Sunday") {
        trainingDays.push(sunday);
    }
}

function createWeekDayShift(weekdayShifts, mon, tues, wed, thur, fri) {
        if (mon == "Monday") {
            weekdayShifts.push(mon);
        }
        if (tues == "Tuesday") {
            weekdayShifts.push(tues);
        }
        if (wed == "Wednesday") {
            weekdayShifts.push(wed);
        }
        if (thur == "Thursday") {
            weekdayShifts.push(thur);
        }
        if (fri == "Friday") {
            weekdayShifts.push(fri);
        }
}

function createWeekendShift(weekendShifts, sat, sun) {
    if (sat == "Saturday") {
        weekendShifts.push(sat);
    }
    if (sun == "Sunday") {
        weekendShifts.push(sun);
    }
}

function getShiftTimes(shiftTimes, request, numOfShifts) {
    let num = 1;
    while (num <= numOfShifts) {
        if (num == 1) {
           let time = request.body.startShift1 + "-" + request.body.endShift1;
           shiftTimes.push(time);
        }
        else if (num == 2) {
            let time = request.body.startShift2 + "-" 
                + request.body.endShift2;
            shiftTimes.push(time);
        }
        else if (num == 3) {
            let time = request.body.startShift3 + "-" 
                + request.body.endShift3;
            shiftTimes.push(time);
        }
        else if (num == 4) {
            let time = request.body.startShift4 + "-" 
                + request.body.endShift4;
            shiftTimes.push(time);
        }
        else if (num == 5) {
            let time = request.body.startShift5 + "-" 
                + request.body.endShift5;
            shiftTimes.push(time);
        }
        else if (num == 6) {
            let time = request.body.startShift6 + "-" 
                + request.body.endShift6;
            shiftTimes.push(time);
        }
        else if (num == 7) {
            let time = request.body.startShift7 + "-" 
                + request.body.endShift7;
            shiftTimes.push(time);
        }
        else if (num == 8) {
            let time = request.body.startShift8 + "-" 
                + request.body.endShift8;
            shiftTimes.push(time);
        }
        else if (num == 9) {
            let time = request.body.startShift9 + "-" 
                + request.body.endShift9;
            shiftTimes.push(time);
        }
        else if (num == 10) {
            let time = request.body.startShift10 + "-" 
                + request.body.endShift10;
            shiftTimes.push(time);
        }
        num = num + 1;
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

function getLocNames(locations, request, numOfLocs) {
    let num = 1;
    while (num <= numOfLocs) {
        if (num == 1) {
            locations.push(request.body.locName1);
        }
        else if (num == 2) {
            locations.push(request.body.locName2);
        }
        else if (num == 3) {
            locations.push(request.body.locName3);
        }
        else if (num == 4) {
            locations.push(request.body.locName4);
        }
        else if (num == 5) {
            locations.push(request.body.locName5);
        }
        else if (num == 6) {
            locations.push(request.body.locName6);
        }
        else if (num == 7) {
            locations.push(request.body.locName7);
        }
        else if (num == 8) {
            locations.push(request.body.locName8);
        }
        else if (num == 9) {
            locations.push(request.body.locName9);
        }
        else if (num == 10) {
            locations.push(request.body.locName10);
        }
        num = num + 1;
    }
}

function getFName(fullName) {
    let fName = "";
    let index = 0;

    while (fullName[index] != " " && index < fullName.length) {
        fName = fName + fullName[index];
        index++;
    }

    console.log("First Name is: " + fName);
    return fName;
}

function getAllergies(allergiesArr, request, numOfLocs, locations) {
    let allergyIndex = 1;

    while(allergyIndex <= numOfLocs) {
        allergiesArr.push(locations[allergyIndex - 1]);

        if (allergyIndex == 1) {
            if (request.body.pollen1 == "Pollen") {
                allergiesArr.push(request.body.pollen1);
            }
            if (request.body.mold1 == "Mold") {
                allergiesArr.push(request.body.mold1);
            }
            if (request.body.mildew1 == "Mildew") {
                allergiesArr.push(request.body.mildew1);
            }
            if (request.body.latex1 == "Latex") {
                allergiesArr.push(request.body.latex1);
            }
            if (request.body.bees1 == "Bees") {
                allergiesArr.push(request.body.bees1);
            }
            if (request.body.wasps1 == "Wasps") {
                allergiesArr.push(request.body.wasps1);
            }
            if (request.body.hornets1 == "Hornets") {
                allergiesArr.push(request.body.hornets1);
            }
            if (request.body.yellow1 == "Yellow Jackets") {
                allergiesArr.push(request.body.yellow1);
            }
            if (request.body.fire1 == "Fire Ants") {
                allergiesArr.push(request.body.fire1);
            }
            if (request.body.roach1 == "Cockroaches") {
                allergiesArr.push(request.body.roach1);
            }
            if (request.body.dust1 == "Dust Mites") {
                allergiesArr.push(request.body.dust1);
            }
        }
        else if (allergyIndex == 2) {
            if (request.body.pollen2 == "Pollen") {
                allergiesArr.push(request.body.pollen2);
            }
            if (request.body.mold2 == "Mold") {
                allergiesArr.push(request.body.mold2);
            }
            if (request.body.mildew2 == "Mildew") {
                allergiesArr.push(request.body.mildew2);
            }
            if (request.body.latex2 == "Latex") {
                allergiesArr.push(request.body.latex2);
            }
            if (request.body.bees2 == "Bees") {
                allergiesArr.push(request.body.bees2);
            }
            if (request.body.wasps2 == "Wasps") {
                allergiesArr.push(request.body.wasps2);
            }
            if (request.body.hornets2 == "Hornets") {
                allergiesArr.push(request.body.hornets2);
            }
            if (request.body.yellow2 == "Yellow Jackets") {
                allergiesArr.push(request.body.yellow2);
            }
            if (request.body.fire2 == "Fire Ants") {
                allergiesArr.push(request.body.fire2);
            }
            if (request.body.roach2 == "Cockroaches") {
                allergiesArr.push(request.body.roach2);
            }
            if (request.body.dust2 == "Dust Mites") {
                allergiesArr.push(request.body.dust2);
            }
        }
        else if (allergyIndex == 3) {
            if (request.body.pollen3 == "Pollen") {
                allergiesArr.push(request.body.pollen3);
            }
            if (request.body.mold3 == "Mold") {
                allergiesArr.push(request.body.mold3);
            }
            if (request.body.mildew3 == "Mildew") {
                allergiesArr.push(request.body.mildew3);
            }
            if (request.body.latex3 == "Latex") {
                allergiesArr.push(request.body.latex3);
            }
            if (request.body.bees3 == "Bees") {
                allergiesArr.push(request.body.bees3);
            }
            if (request.body.wasps3 == "Wasps") {
                allergiesArr.push(request.body.wasps3);
            }
            if (request.body.hornets3 == "Hornets") {
                allergiesArr.push(request.body.hornets3);
            }
            if (request.body.yellow3 == "Yellow Jackets") {
                allergiesArr.push(request.body.yellow3);
            }
            if (request.body.fire3 == "Fire Ants") {
                allergiesArr.push(request.body.fire3);
            }
            if (request.body.roach3 == "Cockroaches") {
                allergiesArr.push(request.body.roach3);
            }
            if (request.body.dust3 == "Dust Mites") {
                allergiesArr.push(request.body.dust3);
            }
        }
        else if (allergyIndex == 4) {
            if (request.body.pollen4 == "Pollen") {
                allergiesArr.push(request.body.pollen4);
            }
            if (request.body.mold4 == "Mold") {
                allergiesArr.push(request.body.mold4);
            }
            if (request.body.mildew4 == "Mildew") {
                allergiesArr.push(request.body.mildew4);
            }
            if (request.body.latex4 == "Latex") {
                allergiesArr.push(request.body.latex4);
            }
            if (request.body.bees4 == "Bees") {
                allergiesArr.push(request.body.bees4);
            }
            if (request.body.wasps4 == "Wasps") {
                allergiesArr.push(request.body.wasps4);
            }
            if (request.body.hornets4 == "Hornets") {
                allergiesArr.push(request.body.hornets4);
            }
            if (request.body.yellow4 == "Yellow Jackets") {
                allergiesArr.push(request.body.yellow4);
            }
            if (request.body.fire4 == "Fire Ants") {
                allergiesArr.push(request.body.fire4);
            }
            if (request.body.roach4 == "Cockroaches") {
                allergiesArr.push(request.body.roach4);
            }
            if (request.body.dust4 == "Dust Mites") {
                allergiesArr.push(request.body.dust4);
            }
        }
        else if (allergyIndex == 5) {
            if (request.body.pollen5 == "Pollen") {
                allergiesArr.push(request.body.pollen5);
            }
            if (request.body.mold5 == "Mold") {
                allergiesArr.push(request.body.mold5);
            }
            if (request.body.mildew5 == "Mildew") {
                allergiesArr.push(request.body.mildew5);
            }
            if (request.body.latex5 == "Latex") {
                allergiesArr.push(request.body.latex5);
            }
            if (request.body.bees5 == "Bees") {
                allergiesArr.push(request.body.bees5);
            }
            if (request.body.wasps5 == "Wasps") {
                allergiesArr.push(request.body.wasps5);
            }
            if (request.body.hornets5 == "Hornets") {
                allergiesArr.push(request.body.hornets5);
            }
            if (request.body.yellow5 == "Yellow Jackets") {
                allergiesArr.push(request.body.yellow5);
            }
            if (request.body.fire5 == "Fire Ants") {
                allergiesArr.push(request.body.fire5);
            }
            if (request.body.roach5 == "Cockroaches") {
                allergiesArr.push(request.body.roach5);
            }
            if (request.body.dust5 == "Dust Mites") {
                allergiesArr.push(request.body.dust5);
            }
        }
        else if (allergyIndex == 6) {
            if (request.body.pollen6 == "Pollen") {
                allergiesArr.push(request.body.pollen6);
            }
            if (request.body.mold6 == "Mold") {
                allergiesArr.push(request.body.mold6);
            }
            if (request.body.mildew6 == "Mildew") {
                allergiesArr.push(request.body.mildew6);
            }
            if (request.body.latex6 == "Latex") {
                allergiesArr.push(request.body.latex6);
            }
            if (request.body.bees6 == "Bees") {
                allergiesArr.push(request.body.bees6);
            }
            if (request.body.wasps6 == "Wasps") {
                allergiesArr.push(request.body.wasps6);
            }
            if (request.body.hornets6 == "Hornets") {
                allergiesArr.push(request.body.hornets6);
            }
            if (request.body.yellow6 == "Yellow Jackets") {
                allergiesArr.push(request.body.yellow6);
            }
            if (request.body.fire6 == "Fire Ants") {
                allergiesArr.push(request.body.fire6);
            }
            if (request.body.roach6 == "Cockroaches") {
                allergiesArr.push(request.body.roach6);
            }
            if (request.body.dust6 == "Dust Mites") {
                allergiesArr.push(request.body.dust6);
            }
        }
        else if (allergyIndex == 7) {
            if (request.body.pollen7 == "Pollen") {
                allergiesArr.push(request.body.pollen7);
            }
            if (request.body.mold7 == "Mold") {
                allergiesArr.push(request.body.mold7);
            }
            if (request.body.mildew7 == "Mildew") {
                allergiesArr.push(request.body.mildew7);
            }
            if (request.body.latex7 == "Latex") {
                allergiesArr.push(request.body.latex7);
            }
            if (request.body.bees7 == "Bees") {
                allergiesArr.push(request.body.bees7);
            }
            if (request.body.wasps7 == "Wasps") {
                allergiesArr.push(request.body.wasps7);
            }
            if (request.body.hornets7 == "Hornets") {
                allergiesArr.push(request.body.hornets7);
            }
            if (request.body.yellow7 == "Yellow Jackets") {
                allergiesArr.push(request.body.yellow7);
            }
            if (request.body.fire7 == "Fire Ants") {
                allergiesArr.push(request.body.fire7);
            }
            if (request.body.roach7 == "Cockroaches") {
                allergiesArr.push(request.body.roach7);
            }
            if (request.body.dust7 == "Dust Mites") {
                allergiesArr.push(request.body.dust7);
            }
        }
        else if (allergyIndex == 8) {
            if (request.body.pollen8 == "Pollen") {
                allergiesArr.push(request.body.pollen8);
            }
            if (request.body.mold8 == "Mold") {
                allergiesArr.push(request.body.mold8);
            }
            if (request.body.mildew8 == "Mildew") {
                allergiesArr.push(request.body.mildew8);
            }
            if (request.body.latex8 == "Latex") {
                allergiesArr.push(request.body.latex8);
            }
            if (request.body.bees8 == "Bees") {
                allergiesArr.push(request.body.bees8);
            }
            if (request.body.wasps8 == "Wasps") {
                allergiesArr.push(request.body.wasps8);
            }
            if (request.body.hornets8 == "Hornets") {
                allergiesArr.push(request.body.hornets8);
            }
            if (request.body.yellow8 == "Yellow Jackets") {
                allergiesArr.push(request.body.yellow8);
            }
            if (request.body.fire8 == "Fire Ants") {
                allergiesArr.push(request.body.fire8);
            }
            if (request.body.roach8 == "Cockroaches") {
                allergiesArr.push(request.body.roach8);
            }
            if (request.body.dust8 == "Dust Mites") {
                allergiesArr.push(request.body.dust8);
            }
        }
        else if (allergyIndex == 9) {
            if (request.body.pollen9 == "Pollen") {
                allergiesArr.push(request.body.pollen9);
            }
            if (request.body.mold9 == "Mold") {
                allergiesArr.push(request.body.mold9);
            }
            if (request.body.mildew9 == "Mildew") {
                allergiesArr.push(request.body.mildew9);
            }
            if (request.body.latex9 == "Latex") {
                allergiesArr.push(request.body.latex9);
            }
            if (request.body.bees9 == "Bees") {
                allergiesArr.push(request.body.bees9);
            }
            if (request.body.wasps9 == "Wasps") {
                allergiesArr.push(request.body.wasps9);
            }
            if (request.body.hornets9 == "Hornets") {
                allergiesArr.push(request.body.hornets9);
            }
            if (request.body.yellow9 == "Yellow Jackets") {
                allergiesArr.push(request.body.yellow9);
            }
            if (request.body.fire9 == "Fire Ants") {
                allergiesArr.push(request.body.fire9);
            }
            if (request.body.roach9 == "Cockroaches") {
                allergiesArr.push(request.body.roach9);
            }
            if (request.body.dust9 == "Dust Mites") {
                allergiesArr.push(request.body.dust9);
            }
        }
        else if (allergyIndex == 10) {
            if (request.body.pollen10 == "Pollen") {
                allergiesArr.push(request.body.pollen10);
            }
            if (request.body.mold10 == "Mold") {
                allergiesArr.push(request.body.mold10);
            }
            if (request.body.mildew10 == "Mildew") {
                allergiesArr.push(request.body.mildew10);
            }
            if (request.body.latex10 == "Latex") {
                allergiesArr.push(request.body.latex10);
            }
            if (request.body.bees10 == "Bees") {
                allergiesArr.push(request.body.bees10);
            }
            if (request.body.wasps10 == "Wasps") {
                allergiesArr.push(request.body.wasps10);
            }
            if (request.body.hornets10 == "Hornets") {
                allergiesArr.push(request.body.hornets10);
            }
            if (request.body.yellow10 == "Yellow Jackets") {
                allergiesArr.push(request.body.yellow10);
            }
            if (request.body.fire10 == "Fire Ants") {
                allergiesArr.push(request.body.fire10);
            }
            if (request.body.roach10 == "Cockroaches") {
                allergiesArr.push(request.body.roach10);
            }
            if (request.body.dust10 == "Dust Mites") {
                allergiesArr.push(request.body.dust10);
            }
        }
        allergyIndex++;
    }
}

function getFoodAllergies(allergiesArr, request, numOfLocs, locations) {
    let allergyIndex = 1;

    while(allergyIndex <= numOfLocs) {
        allergiesArr.push(locations[allergyIndex - 1]);

        if (allergyIndex == 1) {
            if (request.body.milk1 == "Milk") {
                allergiesArr.push(request.body.milk1);
            }
            if (request.body.eggs1 == "Eggs") {
                allergiesArr.push(request.body.eggs1);
            }
            if (request.body.shell1 == "Crustaceon Shellfish") {
                allergiesArr.push(request.body.shell1);
            }
            if (request.body.tree1 == "Tree Nuts") {
                allergiesArr.push(request.body.tree1);
            }
            if (request.body.peanuts1 == "Peanuts") {
                allergiesArr.push(request.body.peanuts1);
            }
            if (request.body.wheat1 == "Wheat") {
                allergiesArr.push(request.body.wheat1);
            }
            if (request.body.soy1 == "Soybeans") {
                allergiesArr.push(request.body.soy1);
            }
            if (request.body.sesame1 == "Sesame") {
                allergiesArr.push(request.body.sesame1);
            }
        }
        else if (allergyIndex == 2) {
            if (request.body.milk2 == "Milk") {
                allergiesArr.push(request.body.milk2);
            }
            if (request.body.eggs2 == "Eggs") {
                allergiesArr.push(request.body.eggs2);
            }
            if (request.body.shell2 == "Crustaceon Shellfish") {
                allergiesArr.push(request.body.shell2);
            }
            if (request.body.tree2 == "Tree Nuts") {
                allergiesArr.push(request.body.tree2);
            }
            if (request.body.peanuts2 == "Peanuts") {
                allergiesArr.push(request.body.peanuts2);
            }
            if (request.body.wheat2 == "Wheat") {
                allergiesArr.push(request.body.wheat2);
            }
            if (request.body.soy2 == "Soybeans") {
                allergiesArr.push(request.body.soy2);
            }
            if (request.body.sesame2 == "Sesame") {
                allergiesArr.push(request.body.sesame2);
            }
        }
        else if (allergyIndex == 3) {
            if (request.body.milk3 == "Milk") {
                allergiesArr.push(request.body.milk3);
            }
            if (request.body.eggs3 == "Eggs") {
                allergiesArr.push(request.body.eggs3);
            }
            if (request.body.shell3 == "Crustaceon Shellfish") {
                allergiesArr.push(request.body.shell3);
            }
            if (request.body.tree3 == "Tree Nuts") {
                allergiesArr.push(request.body.tree3);
            }
            if (request.body.peanuts3 == "Peanuts") {
                allergiesArr.push(request.body.peanuts3);
            }
            if (request.body.wheat3 == "Wheat") {
                allergiesArr.push(request.body.wheat3);
            }
            if (request.body.soy3 == "Soybeans") {
                allergiesArr.push(request.body.soy3);
            }
            if (request.body.sesame3 == "Sesame") {
                allergiesArr.push(request.body.sesame3);
            }
        }
        else if (allergyIndex == 4) {
            if (request.body.milk4 == "Milk") {
                allergiesArr.push(request.body.milk4);
            }
            if (request.body.eggs4 == "Eggs") {
                allergiesArr.push(request.body.eggs4);
            }
            if (request.body.shell4 == "Crustaceon Shellfish") {
                allergiesArr.push(request.body.shell4);
            }
            if (request.body.tree4 == "Tree Nuts") {
                allergiesArr.push(request.body.tree4);
            }
            if (request.body.peanuts4 == "Peanuts") {
                allergiesArr.push(request.body.peanuts4);
            }
            if (request.body.wheat4 == "Wheat") {
                allergiesArr.push(request.body.wheat4);
            }
            if (request.body.soy4 == "Soybeans") {
                allergiesArr.push(request.body.soy4);
            }
            if (request.body.sesame4 == "Sesame") {
                allergiesArr.push(request.body.sesame4);
            }
        }
        else if (allergyIndex == 5) {
            if (request.body.milk5 == "Milk") {
                allergiesArr.push(request.body.milk5);
            }
            if (request.body.eggs5 == "Eggs") {
                allergiesArr.push(request.body.eggs5);
            }
            if (request.body.shell5 == "Crustaceon Shellfish") {
                allergiesArr.push(request.body.shell5);
            }
            if (request.body.tree5 == "Tree Nuts") {
                allergiesArr.push(request.body.tree5);
            }
            if (request.body.peanuts5 == "Peanuts") {
                allergiesArr.push(request.body.peanuts5);
            }
            if (request.body.wheat5 == "Wheat") {
                allergiesArr.push(request.body.wheat5);
            }
            if (request.body.soy5 == "Soybeans") {
                allergiesArr.push(request.body.soy5);
            }
            if (request.body.sesame5 == "Sesame") {
                allergiesArr.push(request.body.sesame5);
            }
        }
        else if (allergyIndex == 6) {
            if (request.body.milk6 == "Milk") {
                allergiesArr.push(request.body.milk6);
            }
            if (request.body.eggs6 == "Eggs") {
                allergiesArr.push(request.body.eggs6);
            }
            if (request.body.shell6 == "Crustaceon Shellfish") {
                allergiesArr.push(request.body.shell6);
            }
            if (request.body.tree6 == "Tree Nuts") {
                allergiesArr.push(request.body.tree6);
            }
            if (request.body.peanuts6 == "Peanuts") {
                allergiesArr.push(request.body.peanuts6);
            }
            if (request.body.wheat6 == "Wheat") {
                allergiesArr.push(request.body.wheat6);
            }
            if (request.body.soy6 == "Soybeans") {
                allergiesArr.push(request.body.soy6);
            }
            if (request.body.sesame6 == "Sesame") {
                allergiesArr.push(request.body.sesame6);
            }
        }
        else if (allergyIndex == 7) {
            if (request.body.milk7 == "Milk") {
                allergiesArr.push(request.body.milk7);
            }
            if (request.body.eggs7 == "Eggs") {
                allergiesArr.push(request.body.eggs7);
            }
            if (request.body.shell7 == "Crustaceon Shellfish") {
                allergiesArr.push(request.body.shell7);
            }
            if (request.body.tree7 == "Tree Nuts") {
                allergiesArr.push(request.body.tree7);
            }
            if (request.body.peanuts7 == "Peanuts") {
                allergiesArr.push(request.body.peanuts7);
            }
            if (request.body.wheat7 == "Wheat") {
                allergiesArr.push(request.body.wheat7);
            }
            if (request.body.soy7 == "Soybeans") {
                allergiesArr.push(request.body.soy7);
            }
            if (request.body.sesame7 == "Sesame") {
                allergiesArr.push(request.body.sesame7);
            }
        }
        else if (allergyIndex == 8) {
            if (request.body.milk8 == "Milk") {
                allergiesArr.push(request.body.milk8);
            }
            if (request.body.eggs8 == "Eggs") {
                allergiesArr.push(request.body.eggs8);
            }
            if (request.body.shell8 == "Crustaceon Shellfish") {
                allergiesArr.push(request.body.shell8);
            }
            if (request.body.tree8 == "Tree Nuts") {
                allergiesArr.push(request.body.tree8);
            }
            if (request.body.peanuts8 == "Peanuts") {
                allergiesArr.push(request.body.peanuts8);
            }
            if (request.body.wheat8 == "Wheat") {
                allergiesArr.push(request.body.wheat8);
            }
            if (request.body.soy8 == "Soybeans") {
                allergiesArr.push(request.body.soy8);
            }
            if (request.body.sesame8 == "Sesame") {
                allergiesArr.push(request.body.sesame8);
            }
        }
        else if (allergyIndex == 9) {
            if (request.body.milk9 == "Milk") {
                allergiesArr.push(request.body.milk9);
            }
            if (request.body.eggs9 == "Eggs") {
                allergiesArr.push(request.body.eggs9);
            }
            if (request.body.shell9 == "Crustaceon Shellfish") {
                allergiesArr.push(request.body.shell9);
            }
            if (request.body.tree9 == "Tree Nuts") {
                allergiesArr.push(request.body.tree9);
            }
            if (request.body.peanuts9 == "Peanuts") {
                allergiesArr.push(request.body.peanuts9);
            }
            if (request.body.wheat9 == "Wheat") {
                allergiesArr.push(request.body.wheat9);
            }
            if (request.body.soy9 == "Soybeans") {
                allergiesArr.push(request.body.soy9);
            }
            if (request.body.sesame9 == "Sesame") {
                allergiesArr.push(request.body.sesame9);
            }
        }
        else if (allergyIndex == 10) {
            if (request.body.milk10 == "Milk") {
                allergiesArr.push(request.body.milk10);
            }
            if (request.body.eggs10 == "Eggs") {
                allergiesArr.push(request.body.eggs10);
            }
            if (request.body.shell10 == "Crustaceon Shellfish") {
                allergiesArr.push(request.body.shell10);
            }
            if (request.body.tree10 == "Tree Nuts") {
                allergiesArr.push(request.body.tree10);
            }
            if (request.body.peanuts10 == "Peanuts") {
                allergiesArr.push(request.body.peanuts10);
            }
            if (request.body.wheat10 == "Wheat") {
                allergiesArr.push(request.body.wheat10);
            }
            if (request.body.soy10 == "Soybeans") {
                allergiesArr.push(request.body.soy10);
            }
            if (request.body.sesame10 == "Sesame") {
                allergiesArr.push(request.body.sesame10);
            }
        }
        allergyIndex++;
    }
}

function getLocationPref(locPref, locNum, request) {
    let num = 1;
    while (num <= locNum) {
        if (num == 1) {
            if (request.body.location1 != undefined) {
                console.log("Chosen: Location 1 - " + request.body.location1);
                locPref.push(request.body.location1);
            }
            else {
                console.log("Location 1 was not chosen");
            }
        }
        else if (num == 2) {
            if (request.body.location2 != undefined) {
                console.log("Chosen: Location 2 - " + request.body.location2);
                locPref.push(request.body.location2);
            }
            else {
                console.log("Location 2 was not chosen");
            }
        }
        else if (num == 3) {
            if (request.body.location3 != undefined) {
                console.log("Chosen: Location 3 - " + request.body.location3);
                locPref.push(request.body.location3);
            }
            else {
                console.log("Location 3 was not chosen");
            }
        }
        else if (num == 4) {
            if (request.body.location4 != undefined) {
                console.log("Chosen: Location 4 - " + request.body.location4);
                locPref.push(request.body.location4);
            }
            else {
                console.log("Location 4 was not chosen");
            }
        }
        else if (num == 5) {
            if (request.body.location5 != undefined) {
                console.log("Chosen: Location 5 - " + request.body.location5);
                locPref.push(request.body.location5);
            }
            else {
                console.log("Location 5 was not chosen");
            }
        }
        else if (num == 6) {
            if (request.body.location6 != undefined) {
                console.log("Chosen: Location 6 - " + request.body.location6);
                locPref.push(request.body.location6);
            }
            else {
                console.log("Location 6 was not chosen");
            }
        }
        else if (num == 7) {
            if (request.body.location7 != undefined) {
                console.log("Chosen: Location 7 - " + request.body.location7);
                locPref.push(request.body.location7);
            }
            else {
                console.log("Location 7 was not chosen");
            }
        }
        else if (num == 8) {
            if (request.body.location8 != undefined) {
                console.log("Chosen: Location 8 - " + request.body.location8);
                locPref.push(request.body.location8);
            }
            else {
                console.log("Location 8 was not chosen");
            }
        }
        else if (num == 9) {
            if (request.body.location9 != undefined) {
                console.log("Chosen: Location 9 - " + request.body.location9);
                locPref.push(request.body.location9);
            }
            else {
                console.log("Location 9 was not chosen");
            }
        }
        else if (num == 10) {
            if (request.body.location10 != undefined) {
                console.log("Chosen: Location 10 - " + request.body.location10);
                locPref.push(request.body.location10);
            }
            else {
                console.log("Location 10 was not chosen");
            }
        }
        num++;
    }
}

function getShiftTimePref(shiftPref, request, shiftNum) {
    let num = 1;
    while (num <= shiftNum) {
        if (num == 1) {
            if (request.body.shift1 != undefined) {
                console.log("Chosen: Shift 1 - " + request.body.shift1);
                shiftPref.push(request.body.shift1);
            }
            else {
                console.log("Shift 1 was not chosen");
            }
        }
        else if (num == 2) {
            if (request.body.shift2 != undefined) {
                console.log("Chosen: Shift 2 - " + request.body.shift2);
                shiftPref.push(request.body.shift2);
            }
            else {
                console.log("Shift 2 was not chosen");
            }
        }
        else if (num == 3) {
            if (request.body.shift3 != undefined) {
                console.log("Chosen: Shift 3 - " + request.body.shift3);
                shiftPref.push(request.body.shift3);
            }
            else {
                console.log("Shift 3 was not chosen");
            }
        }
        else if (num == 4) {
            if (request.body.shift4 != undefined) {
                console.log("Chosen: Shift 4 - " + request.body.shift4);
                shiftPref.push(request.body.shift4);
            }
            else {
                console.log("Shift 4 was not chosen");
            }
        }
        else if (num == 5) {
            if (request.body.shift5 != undefined) {
                console.log("Chosen: Shift 5 - " + request.body.shift5);
                shiftPref.push(request.body.shift5);
            }
            else {
                console.log("Shift 5 was not chosen");
            }
        }
        else if (num == 6) {
            if (request.body.shift6 != undefined) {
                console.log("Chosen: Shift 6 - " + request.body.shift6);
                shiftPref.push(request.body.shift6);
            }
            else {
                console.log("Shift 6 was not chosen");
            }
        }
        else if (num == 7) {
            if (request.body.shift7 != undefined) {
                console.log("Chosen: Shift 7 - " + request.body.shift7);
                shiftPref.push(request.body.shift7);
            }
            else {
                console.log("Shift 7 was not chosen");
            }
        }
        else if (num == 8) {
            if (request.body.shift8 != undefined) {
                console.log("Chosen: Shift 8 - " + request.body.shift8);
                shiftPref.push(request.body.shift8);
            }
            else {
                console.log("Shift 8 was not chosen");
            }
        }
        else if (num == 9) {
            if (request.body.shift9 != undefined) {
                console.log("Chosen: Shift 9 - " + request.body.shift9);
                shiftPref.push(request.body.shift9);
            }
            else {
                console.log("Shift 9 was not chosen");
            }
        }
        else if (num == 10) {
            if (request.body.shift10 != undefined) {
                console.log("Chosen: Shift 10 - " + request.body.shift10);
                shiftPref.push(request.body.shift10);
            }
            else {
                console.log("Shift 10 was not chosen");
            }
        }
        num++;
    }
}

function getWeekDayEnd(weekPref, request) {
    if (request.body.weekdays == "weekdays") {
        weekPref.push("Weekdays");
    }

    if (request.body.weekends == "weekends") {
        weekPref.push("Weekends");
    }
}

function getDayPref(dayPref, request, numOfDays) {
    let num = 1;
    while (num <= numOfDays) {
        if (num == 1) {
            if (request.body.day1 != undefined) {
                console.log("Chosen: " + request.body.day1);
                dayPref.push(request.body.day1);
            }
        }
        else if (num == 2) {
            if (request.body.day2 != undefined) {
                console.log("Chosen: " + request.body.day2);
                dayPref.push(request.body.day2);
            }
        }
        else if (num == 3) {
            if (request.body.day3 != undefined) {
                console.log("Chosen: " + request.body.day3);
                dayPref.push(request.body.day3);
            }
        }
        else if (num == 4) {
            if (request.body.day4 != undefined) {
                console.log("Chosen: " + request.body.day4);
                dayPref.push(request.body.day4);
            }
        }
        else if (num == 5) {
            if (request.body.day5 != undefined) {
                console.log("Chosen: " + request.body.day5);
                dayPref.push(request.body.day5);
            }
        }
        else if (num == 6) {
            if (request.body.day6 != undefined) {
                console.log("Chosen: " + request.body.day6);
                dayPref.push(request.body.day6);
            }
        }
        else if (num == 7) {
            if (request.body.day7 != undefined) {
                console.log("Chosen: " + request.body.day7);
                dayPref.push(request.body.day7);
            }
        }
        num++;
    }
}

async function getNumOfDays(databaseConnection, databaseFunctions, supervisor, companyType) {
    // get the weekdays
    let weekdays = await databaseFunctions.getWeekdays(databaseConnection, supervisor, 
        companyType);

    // get the weekends
    let weekends = await databaseFunctions.getWeekends(databaseConnection, supervisor,
        companyType);

    // parse the weekdays and weekends into an array
    let days = new Array();
    if (weekdays!= "") {
        stringToArray(weekdays, days);
    }
    if (weekends != "") {
        stringToArray(weekends, days);
    }

    // verify the data
    console.log("Days: " + days);
    console.log("Number of days: " + days.length);

    // return the number of days
    return days.length;
}

function getEmpAllergiesEF(allergies, request) {
    if (request.body.milk == "Milk") {
        allergies.push(request.body.milk);
    }
    if (request.body.eggs == "Eggs") {
        allergies.push(request.body.eggs);
    }
    if (request.body.shell == "Crustaceon Shellfish") {
        allergies.push(request.body.shell);
    }
    if (request.body.tree == "Tree Nuts") {
        allergies.push(request.body.tree);
    }
    if (request.body.peanuts == "Peanuts") {
        allergies.push(request.body.peanuts);
    }
    if (request.body.wheat == "Wheat") {
        allergies.push(request.body.wheat);
    }
    if (request.body.soy == "Soybeans") {
        allergies.push(request.body.soy);
    }
    if (request.body.sesame == "Sesame") {
        allergies.push(request.body.sesame);
    }
}

function getEmpAllergiesL(allergies, request) {
    if (request.body.pollen == "Pollen") {
        allergies.push(request.body.pollen);
    }
    if (request.body.mold == "Mold") {
        allergies.push(request.body.mold);
    }
    if (request.body.mildew == "Mildew") {
        allergies.push(request.body.mildew);
    }
    if (request.body.latex == "Latex") {
        allergies.push(request.body.latex);
    }
    if (request.body.bees == "Bees") {
        allergies.push(request.body.bees);
    }
    if (request.body.wasps == "Wasps") {
        allergies.push(request.body.wasps);
    }
    if (request.body.hornets == "Hornets") {
        allergies.push(request.body.hornets);
    }
    if (request.body.yellow == "Yellow Jackets") {
        allergies.push(request.body.yellow);
    }
    if (request.body.fire == "Fire Ants") {
        allergies.push(request.body.fire);
    }
    if (request.body.roach == "Cockroaches") {
        allergies.push(request.body.roach);
    }
    if (request.body.dust == "Dust Mites") {
        allergies.push(request.body.dust);
    }
}

async function checkUsername(databaseConnection, databaseFunctions, uname) {
    let users = await databaseFunctions.getUsernamesEmails(databaseConnection);

    for (let index = 0; index < users.length; index++) {
        if (users[index].username == uname) {
            return false;
        }
    }

    return true;
}

async function checkEmail(databaseConnection, databaseFunctions, email) {
    let users = await databaseFunctions.getUsernamesEmails(databaseConnection);

    for (let index = 0; index < users.length; index++) {
        if (users[index].email == email) {
            return false;
        }
    }

    return true;
}

function buildAndSendHome(response, fullName, role) {
    // get the first name for the personalization
    let fName = getFName(fullName);
    let formVal = {name:fName};

    // send to the appropriate home page
    if (role == "supervisor") {
        console.log("Sending to the Supervisor Home Page");
        response.render("sup_home_page.ejs", formVal);
    }
    else if (role == "employee") {
        console.log("Sending to the Employee Home Page");
        response.render("emp_home_page.ejs", formVal);
    }
    else {
        console.log("ERROR: Incorrect role type");
    }
}

function directQuestionnaire(response, companyType) {
    if (companyType == "whiteCollar") {
        response.sendFile(__dirname + "/Company_forms/Employee_specific/wc_questionnaire.html");
    }
    else if (companyType == "retail") {
        response.sendFile(__dirname + "/Company_forms/Employee_specific/r_questionnaire.html");
    }
    else if (companyType == "lawEnforcement") {
        response.sendFile(__dirname + "/Company_forms/Employee_specific/l_questionnaire.html");
    }
    else if (companyType == "food" || companyType == "entertainment") {
        response.sendFile(__dirname + "/Company_forms/Employee_specific/ef_questionnaire.html");
    }
    else {
        console.log("ERROR: Cannot direct to questionnaire. Invalid company type");
    }
}

module.exports = {authenticateUser, checkPswds, determineRole, 
    splitInitialSetUp, splitUsers, createTrainingSchedule, getEmpNames,
    getLocNames, createWeekDayShift, createWeekendShift, getShiftTimes, buildAndSendHome,
    getAllergies, getFoodAllergies, checkUsername, checkEmail, getUserInfo,
    directQuestionnaire, getLocationPref, getShiftTimePref, getWeekDayEnd, getDayPref,
    getNumOfDays, getEmpAllergiesEF, getEmpAllergiesL};