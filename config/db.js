const mysql = require('mysql'); //The mysql module that we need from npm install
const config = require('../config/config'); //The configfile that we set up for specific values
require('dotenv').config(); //The environement file that contains values as well

const connectionSettings = {
    host: process.env.DB_HOST || config.dbHost, //The host of the database, in case the env file doesn't work we use the config file
    user: process.env.DB_USER || config.dbUser, //The user of the database, in case the env file doesn't work we use the config file
    password: process.env.DB_PASS, //The password of said user, we don't want to push our passwords to the github repo so we only use an env file (but we do push the envfile since it's a private repo)
    database: process.env.DB_DATABASE || config.dbDatabase, //The name of the database, in case the env file doesn't work we use the config file
    port: 3306,
    debug: false
}
const reconnectTimeout = 2000; // The amount of time it takes before we try to reconnect again

let connection; //A !!mutable!! variable for the connection object

function handleDisconnect() {
    connection = mysql.createConnection(connectionSettings); //Create a connection using a method from the mysql object

    connection.connect(function (error) { //use the connect method from the connection
        if (error) { //In case there is an error
            console.error('Error connecting to database ' + connectionSettings.database + ' on ' + connectionSettings.host + ': ' + error.message); //Notify console
            connection.end(); //Stop it
            setTimeout(handleDisconnect, reconnectTimeout); //Try again after timeout
        } else {
            console.log('Connected to database ' + connectionSettings.database + ' on ' + connectionSettings.host + ', state = ' + connection.state); //Success!
        }
    });
    connection.on('error', function (error) { //When an error occurs
        if (error.code === 'ECONNRESET') { //Check if the error equals a common code
            console.error('Connection state = ' + connection.state + ' - reconnecting'); //Notify console
            connection.end(); //Stop it
            handleDisconnect(); //Try again
        } else {
            console.error('Connection ERROR - database ' + connectionSettings.database + ' on ' + connectionSettings.host + ': ' + error.message); //Notify console
            connection.end(); //Stop it again
            handleDisconnect(); //Try once more
        }
    });
}

handleDisconnect(); //Call to the function to start trying to connect

module.exports = connection; //Export the connection object to use in the rest of the project