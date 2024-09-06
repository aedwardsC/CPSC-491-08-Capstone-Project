function startDatabase(databaseConnection) {
    // connect to the database
    databaseConnection.connect(function(error) {
        if (error) {
            console.log("Unable to connect in start-up");
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
                queryCommand = "CREATE DATABASE SchedularDatabase;";
                databaseConnection.query(queryCommand, function(error, sqlResult) {
                    if (error) {
                        console.log("Error creating database");
                    }
                    else {
                        console.log("Created database");
                    }
                });

                // create the tables within the database
            }
        }
    });
}

module.exports = {startDatabase};