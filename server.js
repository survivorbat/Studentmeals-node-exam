/* Declare dependencies */
const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router');

/* Middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
//Parsing application/vnd.api+json as JSON.
app.use(bodyParser.json({type:'application/vnd.api+json'})); 
app.use(bodyParser.urlencoded({extended:true}));



/* The router file */
app.use(router);

/* Start server on a pre-defined port or 5000  */
app.listen(process.env.PORT || 5000, () => { //Sends nodes
	if(process.env.PORT !== undefined){
		console.log('Server gestart op poort '+process.env.PORT);
	} else {
		console.log('Server gestart op poort 5000');
	}
});

/* Export for testing */
module.exports = app;
