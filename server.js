/* Declare dependencies */
const express = require('express');
const app = express();
const logger = require('morgan');
const bodyparser = require('body-parser');
const router = require('./router');

/* Middleware */
app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

/* All routes */
app.use(router);

/* Start server on a pre-defined port or 5000  */
app.listen(process.env.PORT || 5000, () => {
	if(process.env.PORT !== undefined){
		console.log('Server gestart op poort '+process.env.PORT);
	} else {
		console.log('Server gestart op poort 5000');
	}
});

/* Export for testing */
module.exports = app;
